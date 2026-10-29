// AdBridge customer portal: choose app → place → dates → plan (price + availability from the backend) → request.
// Prices and free places change while the page is open, so the page re-checks them (when it comes back to the
// screen, every 5 minutes, before the booking form opens) and the backend checks again when the request is sent.
document.getElementById("css").textContent = BASE_CSS;
const $ = id => document.getElementById(id);

// ---------- texts added for this page (merged into core.js I18N) ----------
Object.entries({
  gu: {
    book2: "બુક કરો", bookFirst: "પહેલાં વિકલ્પ પસંદ કરો", checking: "તપાસાય છે…",
    checkedNow: "ભાવ અને જગ્યા હમણાં જ તપાસ્યાં", checkedAgo: "ભાવ %d મિનિટ પહેલાં તપાસ્યા", recheck: "ફરી તપાસો",
    staleWarn: "ભાવ જૂના થઈ ગયા હશે", dateMoved: "તારીખ જૂની થઈ ગઈ હતી – આજથી કરી દીધી",
    changed: "આ દરમિયાન ભાવ કે જગ્યા બદલાઈ ગઈ. નવા ભાવ જોઈને ફરી બુક કરો.",
    downloads: "%s+ ડાઉનલોડ", daily: "%s રોજ વાપરે", playStore: "Play Store પર જુઓ",
    howTitle: "જાહેરાત કેવી રીતે ચાલે છે",
    how1t: "પસંદ કરો", how1: "એપ, જગ્યા, સમય અને વિકલ્પ – ભાવ તરત દેખાય.",
    how2t: "વિનંતી મોકલો", how2: "નામ અને મોબાઇલ નંબર. અત્યારે કોઈ ચુકવણી નહીં.",
    how3t: "ફોન અને ચુકવણી", how3: "અમે ફોન કરીને લખાણ અને ચુકવણી નક્કી કરીએ.",
    how4t: "જાહેરાત ચાલુ", how4: "ચુકવણી પછી 1 કલાકમાં તમારી જાહેરાત એપમાં.",
    plansTitle: "એકલી કે ભાગીદારી?", cHow: "કેવી રીતે દેખાય", cPrice: "ભાવ", cWhen: "ક્યારે મળે",
    exShow: "દરરોજ, એ જગ્યાએ ફક્ત તમારી જાહેરાત", shShow: "થોડી દુકાન વારાફરતી, એક દિવસ એક દુકાન",
    exPrice: "વધારે", shPrice: "ઓછો", exWhen: "જગ્યા ખાલી હોય ત્યારે", shWhen: "બધી જગ્યા ભરાય નહીં ત્યાં સુધી",
    placesTitle: "ક્યાં દેખાય?",
    pl1: "<b>જિલ્લો:</b> એ જિલ્લાના વપરાશકારોને દેખાય.",
    pl2: "<b>આખું રાજ્ય:</b> રાજ્યના એ જિલ્લાઓમાં, જ્યાં જિલ્લાની પોતાની જાહેરાત ન હોય.",
    pl3: "<b>આખું ભારત:</b> દેશમાં બધે, જ્યાં જિલ્લા કે રાજ્યની જાહેરાત ન હોય.",
    discNote: "3, 6 કે 12 મહિના માટે બુક કરો તો વધારે છૂટ. \"શ્રેષ્ઠ\" = ખાતરીથી દેખાતા દરેક દિવસનો સૌથી ઓછો ખર્ચ.",
    groupYou: "તમારી માહિતી", groupAd: "જાહેરાતની વિગત", groupCall: "ફોન ક્યારે કરીએ?",
    speak: "બોલીને લખો", listening: "સાંભળે છે… બોલો", micFail: "બોલીને લખવાનું ચાલ્યું નહીં – હાથે લખો",
  },
  hi: {
    book2: "बुक करें", bookFirst: "पहले विकल्प चुनें", checking: "जाँच हो रही है…",
    checkedNow: "कीमत और जगह अभी जाँची", checkedAgo: "कीमत %d मिनट पहले जाँची", recheck: "फिर से जाँचें",
    staleWarn: "कीमत पुरानी हो गई होगी", dateMoved: "तारीख पुरानी हो गई थी – आज से कर दी",
    changed: "इस बीच कीमत या जगह बदल गई। नई कीमत देखकर फिर से बुक करें।",
    downloads: "%s+ डाउनलोड", daily: "%s रोज़ इस्तेमाल", playStore: "Play Store पर देखें",
    howTitle: "विज्ञापन कैसे चलता है",
    how1t: "चुनें", how1: "ऐप, जगह, समय और विकल्प – कीमत तुरंत दिखती है।",
    how2t: "अनुरोध भेजें", how2: "नाम और मोबाइल नंबर। अभी कोई भुगतान नहीं।",
    how3t: "फ़ोन और भुगतान", how3: "हम फ़ोन करके लेख और भुगतान तय करते हैं।",
    how4t: "विज्ञापन चालू", how4: "भुगतान के बाद 1 घंटे में आपका विज्ञापन ऐप में।",
    plansTitle: "अकेला या साझेदारी?", cHow: "कैसे दिखता है", cPrice: "कीमत", cWhen: "कब मिलता है",
    exShow: "रोज़, उस जगह सिर्फ़ आपका विज्ञापन", shShow: "कुछ दुकानें बारी-बारी, एक दिन एक दुकान",
    exPrice: "ज़्यादा", shPrice: "कम", exWhen: "जब जगह खाली हो", shWhen: "जब तक सारी जगह न भरे",
    placesTitle: "कहाँ दिखता है?",
    pl1: "<b>ज़िला:</b> उस ज़िले के यूज़र्स को दिखता है।",
    pl2: "<b>पूरा राज्य:</b> राज्य के उन ज़िलों में, जहाँ ज़िले का अपना विज्ञापन न हो।",
    pl3: "<b>पूरा भारत:</b> देश में हर जगह, जहाँ ज़िले या राज्य का विज्ञापन न हो।",
    discNote: "3, 6 या 12 महीने के लिए बुक करें तो ज़्यादा छूट। \"सबसे अच्छा\" = पक्के दिखने वाले हर दिन का सबसे कम खर्च।",
    groupYou: "आपकी जानकारी", groupAd: "विज्ञापन की जानकारी", groupCall: "फ़ोन कब करें?",
    speak: "बोलकर लिखें", listening: "सुन रहा है… बोलिए", micFail: "बोलकर लिखना नहीं चला – हाथ से लिखें",
  },
  en: {
    book2: "Book now", bookFirst: "Choose a plan first", checking: "Checking…",
    checkedNow: "Price and availability just checked", checkedAgo: "Price checked %d min ago", recheck: "Check again",
    staleWarn: "Prices may be out of date", dateMoved: "The start date had passed – moved to today",
    changed: "The price or availability changed meanwhile. See the new price and book again.",
    downloads: "%s+ downloads", daily: "%s daily users", playStore: "View on Play Store",
    howTitle: "How it works",
    how1t: "Choose", how1: "App, place, period and plan – the price shows at once.",
    how2t: "Send a request", how2: "Name and mobile number. No payment now.",
    how3t: "Call and payment", how3: "We call you to fix the ad text and payment.",
    how4t: "Ad goes live", how4: "Within 1 hour of payment your ad is in the app.",
    plansTitle: "Exclusive or shared?", cHow: "How it shows", cPrice: "Price", cWhen: "Available",
    exShow: "Every day, only your ad in that place", shShow: "A few shops take turns, one shop a day",
    exPrice: "Higher", shPrice: "Lower", exWhen: "When the place is free", shWhen: "Until all places are taken",
    placesTitle: "Where does it show?",
    pl1: "<b>District:</b> shown to users in that district.",
    pl2: "<b>Whole state:</b> in the state's districts that have no district ad of their own.",
    pl3: "<b>All India:</b> everywhere that has no district or state ad.",
    discNote: "Book 3, 6 or 12 months for a bigger discount. \"Best\" = the lowest cost per day you are sure to be shown.",
    groupYou: "About you", groupAd: "About the ad", groupCall: "When should we call?",
    speak: "Speak to type", listening: "Listening… speak now", micFail: "Voice typing did not work – please type",
  },
}).forEach(([l, o]) => Object.assign(I18N[l], o));

let catalog = null, requestUrl = "", last = null, quoteSeq = 0, locKey = "", checking = false;
const S = { app: "", type: "district", st: "GJ", dk: "", start: todayDay(), months: 1, plan: null, startKind: "today" };
const STALE_MS = 10 * 60_000, AUTO_MS = 5 * 60_000;

const app = () => (catalog || []).find(p => p.id === S.app);
const levelsOf = p => (p && p.levels && p.levels.length ? p.levels : ["district", "state", "all"]);
function placeText() {
  if (S.type === "all") return t("allIndia");
  if (S.type === "state") return stateLabel(S.st) + " · " + t("wholeState");
  return districtLabel(S.st, S.dk) + ", " + stateLabel(S.st);
}
const until = () => addMonths(S.start, S.months) - 1;
const isStale = () => !last || Date.now() - last.at > STALE_MS;
const monthsText = m => (m === 1 ? t("m1") : t("mN", m));
const playUrlOf = p => p.playUrl || (p.package ? "https://play.google.com/store/apps/details?id=" + encodeURIComponent(p.package) : "");
const num = n => Math.round(n).toLocaleString("en-IN");
const ICON_DL = '<svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>';
const ICON_USERS = '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>';
const ICON_MIC = '<svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>';
const ICON_CHAT = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>';
const ICON_CALL = '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>';
const ICON_MAP = '<svg viewBox="0 0 24 24"><path d="M21.71 11.29l-9-9a.996.996 0 0 0-1.41 0l-9 9a.996.996 0 0 0 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9a.996.996 0 0 0 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/></svg>';

/** App icon: the image from the catalog, else the first letter. */
function iconHtml(p, cls = "ic") {
  const letter = esc(((p && p.name) || "?").trim().charAt(0).toUpperCase());
  return p && /^https:\/\//.test(p.icon || "")
    ? `<span class="${cls}"><img src="${esc(p.icon)}" alt="" loading="lazy" onerror="this.parentNode.textContent='${letter}'"></span>`
    : `<span class="${cls}">${letter}</span>`;
}
/** The ad banner as the apps show it. */
function adHtml(name, text) {
  const title = (name || "").trim() || t("adName");
  return `<div class="ad"><span class="av">${esc(title.charAt(0).toUpperCase())}</span><div class="t"><div class="h"><span class="lbl">${esc(t("adLbl"))}</span>` +
    `<b>${esc(title)}</b></div><span class="d">${esc((text || "").trim() || t("adText"))}</span></div>` +
    `<i class="wa">${ICON_CHAT}</i><i class="call">${ICON_CALL}</i><i class="map">${ICON_MAP}</i></div>`;
}

// ---------- paint ----------
function paintTexts() {
  document.querySelectorAll("[data-t]").forEach(el => { el.innerHTML = t(el.dataset.t); });
  document.title = "AdBridge – " + t("book");
  [...$("lang").children].forEach(b => b.classList.toggle("on", b.dataset.l === LANG));
  $("locMsg").textContent = locKey ? (locKey === "foundYou" ? "✓ " : "") + t(locKey) : "";
  $("adSample").innerHTML = adHtml("", "");
  $("how").innerHTML = [1, 2, 3, 4].map(i => `<div><span class="n">${i}</span><b>${t("how" + i + "t")}</b><p>${t("how" + i)}</p></div>`).join("");
  $("cmp").innerHTML = `<tr><th></th><th>${t("exclusive")}</th><th>${t("shared")}</th></tr>` +
    [["cHow", "exShow", "shShow"], ["cPrice", "exPrice", "shPrice"], ["cWhen", "exWhen", "shWhen"]]
      .map(r => `<tr><td>${t(r[0])}</td><td>${t(r[1])}</td><td>${t(r[2])}</td></tr>`).join("");
  $("placesHelp").innerHTML = ["pl1", "pl2", "pl3"].map(k => `<li>${t(k)}</li>`).join("");
}
function paintApps() {
  if (!catalog) return;
  $("appCard").style.display = catalog.length > 1 ? "" : "none";
  $("apps").innerHTML = catalog.map(p => {
    const desc = (p.promoText && (p.promoText[LANG] || p.promoText.gu || p.promoText.en)) || p.domain || "";
    const stats = [p.downloads > 0 ? `<span>${ICON_DL}${esc(t("downloads", num(p.downloads)))}</span>` : "",
      p.dailyUsers > 0 ? `<span>${ICON_USERS}${esc(t("daily", num(p.dailyUsers)))}</span>` : ""].join("");
    const store = playUrlOf(p);
    return `<div class="appc${p.id === S.app ? " on" : ""}" role="button" tabindex="0" data-app="${esc(p.id)}" aria-pressed="${p.id === S.app}">` +
      (store ? `<a href="${esc(store)}" target="_blank" rel="noopener" title="${esc(t("playStore"))}">${iconHtml(p)}</a>` : iconHtml(p)) +
      `<span class="tx"><b>${esc(p.name)}</b><span class="co">${esc(p.company)}${desc ? " · " + esc(desc) : ""}</span>` +
      (stats ? `<span class="stats">${stats}</span>` : "") +
      (store ? `<a class="store" href="${esc(store)}" target="_blank" rel="noopener">${esc(t("playStore"))} ↗</a>` : "") +
      `</span><span class="radio"></span></div>`;
  }).join("");
  const shift = catalog.length > 1 ? 0 : 1; // steps renumber when the app step is hidden
  document.querySelectorAll("[data-n]").forEach(el => { el.textContent = +el.dataset.n - shift; });
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
    return `<button class="chip${S.months === m ? " on" : ""}" data-m="${m}">${monthsText(m)}${d ? `<small>${t("off", Math.round(d * 100))}</small>` : ""}</button>`;
  }).join("");
  $("period").textContent = t("period", niceDate(S.start), niceDate(until()), until() - S.start + 1);
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
  if (!a) { $("plans").innerHTML = `<p class="muted">${t("quoting")}</p>`; paintSummary(); return; }
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
  paintSummary();
}
/** "Checked 3 min ago · Check again" (orange once older than 10 minutes). */
function freshHtml() {
  if (checking) return `<span class="dot"></span>${t("checking")}`;
  if (!last) return "";
  const min = Math.floor((Date.now() - last.at) / 60_000);
  return `<span class="dot"></span>${isStale() ? t("staleWarn") : min < 1 ? t("checkedNow") : t("checkedAgo", min)} · <button data-recheck>${t("recheck")}</button>`;
}
function paintFresh() {
  ["fresh1", "fresh2"].forEach(id => { const el = $(id); if (!el) return; el.innerHTML = freshHtml(); el.classList.toggle("old", !!last && isStale() && !checking); });
}
/** Desktop summary card + mobile bottom bar. */
function paintSummary() {
  const o = last && S.plan && last[S.plan], ok = !!(o && o.ok), p = app();
  const row = (k, v) => `<div class="srow"><span>${esc(k)}</span><b>${esc(v)}</b></div>`;
  $("sumCard").innerHTML = `<h3>${t("summary")}</h3>` +
    (p ? row(t("app"), p.name) : "") + row(t("sPlace"), placeText()) +
    row(t("sTime"), niceDate(S.start) + " – " + niceDate(until())) + row(t("sPlan"), ok ? t(S.plan) : "—") +
    `<div class="total"><span>${t("total")}</span><b>${ok ? money(o.price) : "—"}</b></div>` +
    `<button class="btn main bookbtn" data-book ${ok ? "" : "disabled"}>${ok ? t("book2") + " →" : t("bookFirst")}</button>` +
    `<div class="fresh" id="fresh2"></div><p class="hintline">${t("promise")}</p>`;
  $("barLbl").textContent = ok ? [t(S.plan), placeText(), monthsText(S.months)].join(" · ") : t("pick");
  $("barPrice").textContent = ok ? money(o.price) : "—";
  $("bookBtn").disabled = !ok;
  $("bookBtn").textContent = ok ? t("book2") + " →" : t("bookFirst");
  paintFresh();
}
function paint() { paintApps(); paintPlace(); paintDates(); paintPlans(); }

// ---------- backend ----------
async function post(body) {
  const r = await fetch(requestUrl, { method: "POST", body: JSON.stringify(body) }); // text/plain: no CORS pre-check
  return r.json();
}
/** A start date in the past (page left open overnight) moves to today. */
function fixDates() {
  if (S.start < todayDay()) { S.start = todayDay(); S.startKind = "today"; toast(t("dateMoved")); return true; }
  if (S.startKind === "today") S.start = todayDay();
  return false;
}
/** Price + availability from the backend (the only source of truth); the newest answer wins. */
async function requote() {
  fixDates();
  if (!S.app || !requestUrl || (S.type === "district" && !S.dk)) { paint(); return false; }
  const seq = ++quoteSeq; last = null; checking = true;
  paint();
  const dist = (districtsOf(S.st).find(d => d.key === S.dk) || {}).json || "";
  try {
    const q = await post({ action: "quote", lang: LANG, productId: S.app, level: S.type, state: S.type === "all" ? "ALL" : S.st, district: S.type === "district" ? dist : "", start: isoOf(S.start), months: S.months });
    if (seq !== quoteSeq) return false;
    if (!q.ok) throw new Error(q.error);
    q.at = Date.now(); last = q; checking = false;
    if (!S.plan || !q[S.plan] || !q[S.plan].ok) S.plan = q.best;
    paintPlans();
    return true;
  } catch (e) {
    if (seq !== quoteSeq) return false;
    checking = false;
    $("plans").innerHTML = `<p class="note warn">${t("loadFail")}</p>`; paintSummary();
    return false;
  }
}
/** Fresh app list (stats, prices) from the backend; the GitHub copy is only the first, fast answer. */
async function refreshCatalog() {
  if (!requestUrl) return;
  try {
    const c = await post({ action: "catalog" });
    if (c && c.ok && Array.isArray(c.products) && c.products.length) { catalog = c.products; if (!app()) S.app = catalog[0].id; paintApps(); }
  } catch (e) { /* keep the GitHub copy */ }
}
async function refreshAll() { await refreshCatalog(); await requote(); }

// ---------- booking ----------
function contactHref(msg) {
  const c = (app() && app().contact) || {};
  const wa = String(c.whatsapp || "").replace(/\D/g, "");
  if (wa.length >= 10) return "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);
  if (c.email) return "mailto:" + c.email + "?subject=" + encodeURIComponent("Ad booking") + "&body=" + encodeURIComponent(msg);
  if (c.link && /^https:\/\//.test(c.link)) return c.link;
  return "";
}
/** Book: re-check first when the price is older than 10 minutes, then open the form if the plan is still free. */
async function startBooking() {
  if (isStale() || S.start < todayDay()) {
    const plan = S.plan, before = last && plan && last[plan] ? last[plan].price : null;
    if (!(await requote())) return;
    if (!last[plan] || !last[plan].ok || last[plan].price !== before) {
      S.plan = last[plan] && last[plan].ok ? plan : last.best; paintPlans(); return toast(t("changed"));
    }
  }
  if (last && S.plan && last[S.plan].ok) openBooking();
}

const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
/** 🎤 next to a text box (only where the browser can listen: Chrome on Android / desktop). */
function micHtml(name) { return Speech ? `<button type="button" class="mic" data-mic="${name}" title="${esc(t("speak"))}" aria-label="${esc(t("speak"))}">${ICON_MIC}</button>` : ""; }
function listen(btn, field) {
  const rec = new Speech();
  rec.lang = LANG === "hi" ? "hi-IN" : LANG === "en" ? "en-IN" : "gu-IN";
  rec.interimResults = false; rec.maxAlternatives = 1;
  btn.classList.add("on"); btn.title = t("listening");
  rec.onresult = e => {
    const said = ((e.results[0] && e.results[0][0] && e.results[0][0].transcript) || "").trim();
    if (said) { field.value = (field.value.trim() ? field.value.trim() + " " : "") + said; field.dispatchEvent(new Event("input", { bubbles: true })); }
  };
  rec.onerror = () => toast(t("micFail"), "err");
  rec.onend = () => { btn.classList.remove("on"); btn.title = t("speak"); };
  try { rec.start(); } catch (e) { btn.classList.remove("on"); toast(t("micFail"), "err"); }
}

function openBooking() {
  const o = last[S.plan], u = until(), p = app();
  const m = openModal(`
    <div class="sheet-h"><b>${t("bookTitle")}</b><button class="x" data-close aria-label="${esc(t("close"))}">✕</button></div>
    <div class="sum2">${iconHtml(p)}<div class="tx"><b>${esc(p.name)} · ${esc(t(S.plan))}</b>${esc(placeText())}<br>${esc(niceDate(S.start))} – ${esc(niceDate(u))}</div>
      <div class="pr">${money(o.price)}</div></div>
    <form id="bf" novalidate>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="grp"><h4>${t("groupYou")}</h4>
        <div class="fld" data-k="shop"><label class="f">${t("shop")} *</label><div class="inp"><input name="shop" maxlength="80" autocomplete="organization">${micHtml("shop")}</div><div class="err">${t("errShop")}</div></div>
        <div class="two">
          <div class="fld" data-k="owner"><label class="f">${t("owner")} *</label><div class="inp"><input name="owner" maxlength="60" autocomplete="name">${micHtml("owner")}</div><div class="err">${t("errOwner")}</div></div>
          <div class="fld" data-k="phone"><label class="f">${t("mobile")} *</label><input name="phone" type="tel" inputmode="numeric" maxlength="14" autocomplete="tel"><div class="err">${t("errPhone")}</div></div>
        </div>
        <label class="check"><input type="checkbox" name="waSame" checked> ${t("waSame")}</label>
        <div class="fld" data-k="wa" id="waBox" style="display:none"><label class="f">${t("wa")}</label><input name="wa" type="tel" inputmode="numeric" maxlength="14"><div class="err">${t("errPhone")}</div></div>
        <label class="f">${t("email")}</label><input name="email" type="email" maxlength="120" autocomplete="email">
      </div>
      <div class="grp"><h4>${t("groupAd")}</h4>
        <label class="f">${t("business")}</label>
        <select name="business"><option value="farming">${t("b1")}</option><option value="shop">${t("b2")}</option><option value="finance">${t("b3")}</option><option value="services">${t("b5")}</option><option value="other">${t("b4")}</option></select>
        <label class="f">${t("adLine")}</label><div class="inp"><input name="adText" maxlength="90">${micHtml("adText")}</div><div class="cnt" id="adCnt">0/90</div>
        <div class="prev"><small class="muted" style="display:block;margin-bottom:6px">${t("adPreview")}</small><div id="adLive"></div></div>
      </div>
      <div class="grp"><h4>${t("groupCall")}</h4>
        <div class="seg" id="callSeg" style="margin-top:10px"><button type="button" data-v="morning" class="on">${t("morning")}</button><button type="button" data-v="afternoon">${t("afternoon")}</button><button type="button" data-v="evening">${t("evening")}</button></div>
        <label class="f">${t("notes")}</label><div class="inp"><textarea name="notes" maxlength="400"></textarea>${micHtml("notes")}</div>
      </div>
      <div class="sendbar"><p class="hintline" style="margin:0 0 10px">${t("promise")}</p><button class="btn main block bookbtn" type="submit" id="sendBtn">${t("send")}</button></div>
    </form>`, { wide: true });
  const f = m.el.querySelector("#bf"); let callTime = "morning";
  const live = () => {
    m.el.querySelector("#adLive").innerHTML = adHtml(f.shop.value, f.adText.value);
    m.el.querySelector("#adCnt").textContent = f.adText.value.length + "/90";
  };
  live();
  f.addEventListener("input", live);
  f.waSame.addEventListener("change", () => { m.el.querySelector("#waBox").style.display = f.waSame.checked ? "none" : ""; });
  m.el.querySelector("#callSeg").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; callTime = b.dataset.v; [...b.parentNode.children].forEach(x => x.classList.toggle("on", x === b)); });
  m.el.querySelectorAll("[data-mic]").forEach(b => b.addEventListener("click", () => listen(b, f[b.dataset.mic])));
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
      start: isoOf(S.start), months: S.months, plan: S.plan, price: o.price,
    };
    const btn = m.el.querySelector("#sendBtn"); btn.disabled = true; btn.textContent = t("sending");
    let j = null;
    try { j = await post(req); } catch (err) { j = null; }
    if (j && j.ok) {
      m.el.querySelector(".sheet").innerHTML = `<div class="done"><div class="big">✓</div><h2>${t("sentTitle")}</h2><p>${t("sentBody", esc(j.id))}</p><button class="btn main block" data-close>${t("close")}</button></div>`;
      m.el.querySelector("[data-close]").onclick = m.close;
    } else if (j && ["stale", "taken", "price"].includes(j.error)) {
      // The price / place changed while the page was open: show the new answer
      m.close(); toast(t("changed")); await requote();
    } else {
      const msg = `${t("bookTitle")} – ${p.name}\n${t("shop")}: ${shop}\n${t("owner")}: ${owner}\n${t("mobile")}: ${phone}\n${placeText()}\n${niceDate(S.start)} – ${niceDate(u)}\n${t(S.plan)}: ${money(o.price)}`;
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
function pickApp(el) { S.app = el.dataset.app; S.plan = null; history.replaceState(null, "", "#" + S.app); requote(); }
$("apps").addEventListener("click", e => { if (e.target.closest("a")) return; const b = e.target.closest(".appc"); if (b) pickApp(b); });
$("apps").addEventListener("keydown", e => { const b = e.target.closest(".appc"); if (b && e.target === b && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pickApp(b); } });
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
document.addEventListener("click", e => {
  if (e.target.closest("[data-recheck]")) refreshAll();
  if (e.target.closest("[data-book]")) startBooking();
});
$("bookBtn").onclick = startBooking;
async function useLocation(silent) {
  locKey = "finding"; paintTexts();
  const p = await locate();
  if (p) { S.st = p.st; S.dk = p.dk || ""; locKey = "foundYou"; requote(); } else locKey = silent ? "" : "noLoc";
  paintTexts();
}
$("findMe").onclick = () => useLocation(false);

// Keep the numbers fresh: back on the screen after 2+ minutes, every 5 minutes while visible, and the "x min ago" line.
document.addEventListener("visibilitychange", () => { if (!document.hidden && (!last || Date.now() - last.at > 2 * 60_000)) refreshAll(); });
setInterval(() => { if (!document.hidden && last && Date.now() - last.at > AUTO_MS && !document.querySelector(".modal")) requote(); }, 60_000);
setInterval(paintFresh, 30_000);

(async function () {
  setLang(LANG); paintTexts(); paint();
  try {
    const c = await loadPublic("catalog.json");
    catalog = (c && c.products) || []; requestUrl = (c && c.requestUrl) || "";
    const want = decodeURIComponent(location.hash.slice(1));
    S.app = (catalog.find(p => p.id === want) || catalog[0] || {}).id || "";
    paintTexts(); requote(); refreshCatalog();
  } catch (e) { $("apps").innerHTML = `<p class="note warn">${t("loadFail")}</p>`; }
  try {
    const perm = navigator.permissions && await navigator.permissions.query({ name: "geolocation" });
    if (!perm || perm.state !== "denied") useLocation(true);
  } catch (e) { useLocation(true); }
})();
