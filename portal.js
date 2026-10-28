// AdBridge customer portal: choose app → place → dates → plan (price + availability from the backend) → request.
document.getElementById("css").textContent = BASE_CSS;
const $ = id => document.getElementById(id);
let catalog = null, requestUrl = "", last = null, quoteSeq = 0, locKey = "";
const S = { app: "", type: "district", st: "GJ", dk: "", start: todayDay(), months: 1, plan: null, startKind: "today" };

const app = () => (catalog || []).find(p => p.id === S.app);
const levelsOf = p => (p && p.levels && p.levels.length ? p.levels : ["district", "state", "all"]);
function area() { return { type: S.type, st: S.type === "all" ? "ALL" : S.st, dk: S.type === "district" ? S.dk : "" }; }
function placeText() {
  if (S.type === "all") return t("allIndia");
  if (S.type === "state") return stateLabel(S.st) + " · " + t("wholeState");
  return districtLabel(S.st, S.dk) + ", " + stateLabel(S.st);
}

// ---------- paint ----------
function paintTexts() {
  document.querySelectorAll("[data-t]").forEach(el => { el.innerHTML = t(el.dataset.t); });
  document.title = "AdBridge – " + t("book");
  [...$("lang").children].forEach(b => b.classList.toggle("on", b.dataset.l === LANG));
  $("locMsg").textContent = locKey ? (locKey === "foundYou" ? "✓ " : "") + t(locKey) : "";
  const p = app(), max = p ? p.pricing.maxShared : 3;
  $("help").innerHTML = [t("help1"), t("help2", max), t("help3"), t("help4")].map(x => `<li>${x}</li>`).join("");
}
function paintApps() {
  if (!catalog) return;
  $("appCard").style.display = catalog.length > 1 ? "" : "none";
  $("apps").innerHTML = catalog.map(p => {
    const desc = p.promoText && (p.promoText[LANG] || p.promoText.gu || p.promoText.en) || p.domain;
    return `<button class="appc${p.id === S.app ? " on" : ""}" data-app="${esc(p.id)}"><b>${esc(p.name)}</b><small>${esc(p.company)} · ${esc(desc)}</small></button>`;
  }).join("");
}
function paintPlace() {
  const levels = levelsOf(app());
  if (!levels.includes(S.type)) S.type = levels[0];
  const lbl = { district: t("oneDistrict"), state: t("wholeState"), all: t("allIndia") };
  $("aType").innerHTML = levels.map(l => `<button data-v="${l}" class="${S.type === l ? "on" : ""}">${esc(lbl[l])}</button>`).join("");
  $("stateBtn").style.display = S.type === "all" ? "none" : "";
  $("distBtn").style.display = S.type === "district" ? "" : "none";
  $("locRow").style.display = S.type === "all" ? "none" : "";
  $("stateVal").textContent = stateLabel(S.st);
  const ds = districtsOf(S.st);
  if (!ds.some(d => d.key === S.dk)) S.dk = ds.length ? ds[0].key : "";
  $("distVal").textContent = S.dk ? districtLabel(S.st, S.dk) : "—";
}
function paintDates() {
  const p = app() || { pricing: { discounts: {} } };
  const opts = [["today", todayDay(), t("today")], ["mon", nextMonday(), t("nextMonday")], ["first", nextFirst(), t("nextFirst")]];
  const isOther = !opts.some(o => o[0] === S.startKind);
  $("startChips").innerHTML = opts.map(o => `<button class="chip${S.startKind === o[0] ? " on" : ""}" data-k="${o[0]}" data-d="${o[1]}">${esc(o[2])}</button>`).join("") +
    `<button class="chip${isOther ? " on" : ""}" data-k="other">📅 ${isOther ? esc(niceDate(S.start)) : esc(t("otherDate"))}</button>`;
  $("monthChips").innerHTML = [1, 3, 6, 12].map(m => {
    const d = discountFor(p.pricing, m);
    return `<button class="chip${S.months === m ? " on" : ""}" data-m="${m}">${m === 1 ? t("m1") : t("mN", m)}${d ? `<small>${t("off", Math.round(d * 100))}</small>` : ""}</button>`;
  }).join("");
  const until = addMonths(S.start, S.months) - 1;
  $("period").textContent = t("period", niceDate(S.start), niceDate(until), until - S.start + 1);
}
function whyText(o) {
  const d = dayOf(o.date);
  if (o.code === "exTaken") return t("whyExTaken", d != null ? niceDate(d) : o.date);
  if (o.code === "busy") return t("whyExBusy", o.count, d != null ? niceDate(d) : o.date);
  if (o.code === "full") return t("whyShFull", o.count, d != null ? niceDate(d) : o.date);
  return o.why || t("notAvail");
}
function paintPlans() {
  const a = last;
  if (!a) { $("plans").innerHTML = `<p class="muted">${t("quoting")}</p>`; paintBar(); return; }
  const card = (o, title, sub) => {
    const isBest = a.best === o.plan, on = S.plan === o.plan && o.ok;
    if (!o.ok) return `<div class="plan off"><div class="plan-h"><b>${title}</b><span class="pill no">${t("notAvail")}</span></div><p class="muted">${esc(whyText(o))}</p></div>`;
    return `<button class="plan${on ? " on" : ""}" data-plan="${o.plan}" aria-pressed="${on}">
      <div class="plan-h"><span class="radio"></span><b>${title}</b>${isBest ? `<span class="pill yes">★ ${t("best")}</span>` : ""}</div>
      <div class="plan-p">${money(o.price)}</div><p class="muted">${sub}</p>
      <ul><li>${S.type === "district" ? t("showDays", o.days, a.totalDays) : t("showDaysAvg", o.days, a.totalDays)}</li>
        ${o.plan === "shared" && o.minDays < o.days ? `<li>${t("minDays", o.minDays)}</li>` : ""}
        ${o.plan === "exclusive" ? `<li>${t("noJoin")}</li>` : ""}
        ${o.perDay ? `<li>${t("perDay", money(o.perDay))}</li>` : ""}</ul></button>`;
  };
  let notes = a.rivals.length ? `<p class="note">${t("placeBusy", a.rivals.length)}</p>` : `<p class="note ok">${t("placeFree")}</p>`;
  if (S.type === "state") notes += `<p class="note">${t("stateNote")}</p>`;
  if (S.type === "all") notes += `<p class="note">${t("stateNoteAll")}</p>`;
  if (a.discount) notes += `<p class="note ok">${t("discountOn", S.months, Math.round(a.discount * 100))}</p>`;
  $("plans").innerHTML = notes + `<div class="plans">${card(a.exclusive, t("exclusive"), t("exclusiveSub"))}${card(a.shared, t("shared"), t("sharedSub"))}</div>` +
    (a.best ? "" : `<p class="note warn">${t("noneAvail", niceDate(dayOf(a.freeFrom) ?? S.start))}</p>`);
  paintBar();
}
function paintBar() {
  const o = last && S.plan && last[S.plan];
  $("barLbl").textContent = o && o.ok ? t("total") + " · " + t(S.plan) : t("pick");
  $("barPrice").textContent = o && o.ok ? money(o.price) : "—";
  $("bookBtn").disabled = !(o && o.ok);
}
function paint() { paintApps(); paintPlace(); paintDates(); paintPlans(); }

// ---------- backend ----------
async function post(body) {
  const r = await fetch(requestUrl, { method: "POST", body: JSON.stringify(body) }); // text/plain: no CORS pre-check
  return r.json();
}
/** Price + availability from the backend (the only source of truth); the newest answer wins. */
async function requote() {
  paint();
  if (!S.app || !requestUrl) return;
  if (S.type === "district" && !S.dk) return;
  const seq = ++quoteSeq; last = null; paintPlans();
  const dist = (districtsOf(S.st).find(d => d.key === S.dk) || {}).json || "";
  try {
    const q = await post({ action: "quote", productId: S.app, level: S.type, state: S.type === "all" ? "ALL" : S.st, district: S.type === "district" ? dist : "", start: isoOf(S.start), months: S.months });
    if (seq !== quoteSeq) return;
    if (!q.ok) throw new Error(q.error);
    last = q;
    if (!S.plan || !q[S.plan] || !q[S.plan].ok) S.plan = q.best;
    paintPlans();
  } catch (e) {
    if (seq !== quoteSeq) return;
    $("plans").innerHTML = `<p class="note warn">${t("loadFail")}</p>`; paintBar();
  }
}

// ---------- booking ----------
function contactHref(msg) {
  const c = (app() && app().contact) || {};
  const wa = String(c.whatsapp || "").replace(/\D/g, "");
  if (wa.length >= 10) return "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);
  if (c.email) return "mailto:" + c.email + "?subject=" + encodeURIComponent("Ad booking") + "&body=" + encodeURIComponent(msg);
  if (c.link && /^https:\/\//.test(c.link)) return c.link;
  return "";
}
function openBooking() {
  const o = last[S.plan], until = addMonths(S.start, S.months) - 1, p = app();
  const m = openModal(`
    <div class="sheet-h"><b>${t("bookTitle")}</b><button class="x" data-close aria-label="${esc(t("close"))}">✕</button></div>
    <div class="sum">
      <div><span>${esc(t("app"))}</span><b>${esc(p.name)}</b></div>
      <div><span>${esc(t("sPlace"))}</span><b>${esc(placeText())}</b></div>
      <div><span>${esc(t("sTime"))}</span><b>${esc(niceDate(S.start))} – ${esc(niceDate(until))}</b></div>
      <div><span>${esc(t("sPlan"))}</span><b>${esc(t(S.plan))}</b></div>
      <div><span>${esc(t("total"))}</span><b style="color:var(--brand)">${money(o.price)}</b></div>
    </div>
    <form id="bf" novalidate>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="fld" data-k="shop"><label class="f">${t("shop")} *</label><input name="shop" maxlength="80" autocomplete="organization"><div class="err">${t("errShop")}</div></div>
      <div class="grid">
        <div class="fld" data-k="owner"><label class="f">${t("owner")} *</label><input name="owner" maxlength="60" autocomplete="name"><div class="err">${t("errOwner")}</div></div>
        <div class="fld" data-k="phone"><label class="f">${t("mobile")} *</label><input name="phone" type="tel" inputmode="numeric" maxlength="14" autocomplete="tel" placeholder="98765 43210"><div class="err">${t("errPhone")}</div></div>
      </div>
      <label class="check"><input type="checkbox" name="waSame" checked> ${t("waSame")}</label>
      <div class="fld" data-k="wa" id="waBox" style="display:none"><label class="f">${t("wa")}</label><input name="wa" type="tel" inputmode="numeric" maxlength="14"><div class="err">${t("errPhone")}</div></div>
      <label class="f">${t("email")}</label><input name="email" type="email" maxlength="120" autocomplete="email">
      <label class="f">${t("business")}</label>
      <select name="business"><option value="farming">${t("b1")}</option><option value="shop">${t("b2")}</option><option value="finance">${t("b3")}</option><option value="services">${t("b5")}</option><option value="other">${t("b4")}</option></select>
      <label class="f">${t("adLine")}</label><input name="adText" maxlength="90" placeholder="${esc(t("adLineHint"))}">
      <label class="f">${t("callTime")}</label>
      <div class="seg" id="callSeg"><button type="button" data-v="morning" class="on">${t("morning")}</button><button type="button" data-v="afternoon">${t("afternoon")}</button><button type="button" data-v="evening">${t("evening")}</button></div>
      <label class="f">${t("notes")}</label><textarea name="notes" maxlength="400"></textarea>
      <p class="note">${t("promise")}</p>
      <button class="btn main block" type="submit" id="sendBtn">${t("send")}</button>
    </form>`, { wide: true });
  const f = m.el.querySelector("#bf"); let callTime = "morning";
  f.waSame.addEventListener("change", () => { m.el.querySelector("#waBox").style.display = f.waSame.checked ? "none" : ""; });
  m.el.querySelector("#callSeg").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; callTime = b.dataset.v; [...b.parentNode.children].forEach(x => x.classList.toggle("on", x === b)); });
  const digits = v => { let d = String(v || "").replace(/\D/g, ""); if (d.length === 12 && d.startsWith("91")) d = d.slice(2); if (d.length === 11 && d.startsWith("0")) d = d.slice(1); return d; };
  f.addEventListener("submit", async e => {
    e.preventDefault();
    const shop = f.shop.value.trim(), owner = f.owner.value.trim(), phone = digits(f.phone.value), wa = f.waSame.checked ? phone : digits(f.wa.value);
    const bad = { shop: !shop, owner: !owner, phone: !/^[6-9]\d{9}$/.test(phone), wa: !f.waSame.checked && wa && !/^[6-9]\d{9}$/.test(wa) };
    m.el.querySelectorAll(".fld").forEach(x => x.classList.toggle("bad", !!bad[x.dataset.k]));
    if (Object.values(bad).some(Boolean)) { const el = m.el.querySelector(".bad input"); el.focus({ preventScroll: true }); el.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
    const dist = (districtsOf(S.st).find(d => d.key === S.dk) || {}).json || "";
    const req = {
      action: "submit", website: f.website.value, lang: LANG, productId: S.app, shop, owner, phone: "91" + phone, whatsapp: wa ? "91" + wa : "",
      email: f.email.value.trim(), business: f.business.value, adText: f.adText.value.trim(), callTime, notes: f.notes.value.trim(),
      level: S.type, state: S.type === "all" ? "ALL" : S.st, district: S.type === "district" ? dist : "", place: placeText(),
      start: isoOf(S.start), months: S.months, plan: S.plan,
    };
    const btn = m.el.querySelector("#sendBtn"); btn.disabled = true; btn.textContent = t("sending");
    let id = null;
    try { const j = await post(req); if (j && j.ok) id = j.id; } catch (err) { id = null; }
    if (id) {
      m.el.querySelector(".sheet").innerHTML = `<div class="done"><div class="big">✅</div><h2 style="justify-content:center">${t("sentTitle")}</h2><p>${t("sentBody", esc(id))}</p><button class="btn main" data-close>${t("close")}</button></div>`;
      m.el.querySelector("[data-close]").onclick = m.close;
    } else {
      const msg = `${t("bookTitle")} – ${p.name}\n${t("shop")}: ${shop}\n${t("owner")}: ${owner}\n${t("mobile")}: ${phone}\n${placeText()}\n${niceDate(S.start)} – ${niceDate(until)}\n${t(S.plan)}: ${money(o.price)}`;
      const href = contactHref(msg);
      btn.disabled = false; btn.textContent = t("send");
      toast(t("sendFail"), "err");
      if (href && !m.el.querySelector("#direct")) btn.insertAdjacentHTML("afterend", `<a id="direct" class="btn ghost block" style="margin-top:8px;text-decoration:none" href="${esc(href)}" target="_blank" rel="noopener">${t("contactDirect")}</a>`);
    }
  });
  setTimeout(() => f.shop.focus(), 80);
}

// ---------- events ----------
$("lang").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; setLang(b.dataset.l); paintTexts(); paint(); });
$("apps").addEventListener("click", e => { const b = e.target.closest(".appc"); if (!b) return; S.app = b.dataset.app; S.plan = null; history.replaceState(null, "", "#" + S.app); requote(); });
$("aType").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; S.type = b.dataset.v; requote(); });
$("stateBtn").onclick = () => openPicker({ title: t("chooseState"), value: S.st, items: STATES.map(s => ({ value: s.key, label: s[LANG] || s.gu, sub: LANG === "en" ? s.gu : s.en })), onPick: v => { S.st = v; S.dk = ""; requote(); } });
$("distBtn").onclick = () => openPicker({ title: t("chooseDistrict"), value: S.dk, items: districtsOf(S.st).map(d => ({ value: d.key, label: d.label, sub: d.sub })), onPick: v => { S.dk = v; requote(); } });
$("startChips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  if (b.dataset.k === "other") return openDatePicker({ value: S.start, min: todayDay(), max: addMonths(todayDay(), 6), onPick: d => { S.start = d; S.startKind = "other"; requote(); } });
  S.start = +b.dataset.d; S.startKind = b.dataset.k; requote();
});
$("monthChips").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; S.months = +b.dataset.m; requote(); });
$("plans").addEventListener("click", e => { const b = e.target.closest(".plan[data-plan]"); if (!b) return; S.plan = b.dataset.plan; paintPlans(); });
$("bookBtn").onclick = () => { if (last && S.plan && last[S.plan].ok) openBooking(); };
async function useLocation(silent) {
  locKey = "finding"; paintTexts();
  const p = await locate();
  if (p) { S.st = p.st; if (p.dk) S.dk = p.dk; else S.dk = ""; locKey = "foundYou"; requote(); } else locKey = silent ? "" : "noLoc";
  paintTexts();
}
$("findMe").onclick = () => useLocation(false);

(async function () {
  setLang(LANG); paintTexts(); paint();
  try {
    const c = await loadPublic("catalog.json");
    catalog = (c && c.products) || []; requestUrl = (c && c.requestUrl) || "";
    const want = decodeURIComponent(location.hash.slice(1));
    S.app = (catalog.find(p => p.id === want) || catalog[0] || {}).id || "";
    paintTexts(); requote();
  } catch (e) { $("apps").innerHTML = `<p class="note warn">${t("loadFail")}</p>`; }
  try {
    const perm = navigator.permissions && await navigator.permissions.query({ name: "geolocation" });
    if (!perm || perm.state !== "denied") useLocation(true);
  } catch (e) { useLocation(true); }
})();
