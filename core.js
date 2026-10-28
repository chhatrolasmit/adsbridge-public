// AdBridge customer portal – shared helpers (language, dates, places, dialogs, pickers).
// The ad rules copy the app (data/Promo.kt): a yard shows its district's ad, else its state's ad;
// several ads for the same place take turns, one per day, in id order.

const REPO_PUBLIC = "chhatrolasmit/adsbridge-public";   // catalog.json + <company>/<app>/promo.json (published by the backend)
const RAW = "https://raw.githubusercontent.com/" + REPO_PUBLIC + "/main/";

// =====================================================================================
// Language
// =====================================================================================
const I18N = {
  gu: {
    allIndia: "આખું ભારત", app: "એપ", chooseApp: "એપ પસંદ કરો", step0: "કઈ એપમાં જાહેરાત?",
    stateNoteAll: "આખા ભારતની જાહેરાત એ જગ્યાએ દેખાય છે જ્યાં તે દિવસે જિલ્લા કે રાજ્યની પોતાની જાહેરાત ન હોય.",
    quoting: "ભાવ ગણાય છે…", email: "Email (વૈકલ્પિક)",
    title: "અમારી એપમાં જાહેરાત આપો", sub: "હજારો વપરાશકારો સુધી તમારો ધંધો પહોંચાડો",
    adLbl: "જાહેરાત", adName: "તમારી દુકાનનું નામ", adText: "તમારી ઑફર – એક લાઇનમાં",
    why1: "લોકો રોજ આ એપ ખોલે છે", why2: "મુખ્ય પેજ પર, scroll કરતાં પણ ઉપર ચોંટેલી", why3: "WhatsApp, ફોન અને રસ્તો બટન – ગ્રાહક સીધો તમારી પાસે",
    step1: "ક્યાં બતાવવી છે?", step2: "ક્યારથી અને કેટલો સમય?", step3: "વિકલ્પ પસંદ કરો",
    oneDistrict: "એક જિલ્લો", wholeState: "આખું રાજ્ય", state: "રાજ્ય", district: "જિલ્લો",
    chooseDistrict: "જિલ્લો પસંદ કરો", chooseState: "રાજ્ય પસંદ કરો", search: "શોધો…", noMatch: "કંઈ મળ્યું નહીં",
    findMe: "મારા સ્થાન પ્રમાણે", finding: "સ્થાન શોધાય છે…", foundYou: "તમારા સ્થાન પ્રમાણે પસંદ કર્યું", noLoc: "સ્થાન ન મળ્યું, હાથે પસંદ કરો",
    startDate: "શરૂ તારીખ", today: "આજથી", nextMonday: "આવતા સોમવારથી", nextFirst: "આવતા મહિનાની 1 તારીખથી", otherDate: "બીજી તારીખ",
    months: "કેટલા મહિના?", m1: "1 મહિનો", mN: "%d મહિના", off: "%d% છૂટ",
    period: "%s થી %s · %d દિવસ",
    exclusive: "એકલી જાહેરાત", shared: "ભાગીદારી",
    exclusiveSub: "આ જગ્યાએ ફક્ત તમારી જાહેરાત, દરરોજ", sharedSub: "બીજી દુકાન સાથે વારાફરતી દિવસે, ઓછો ભાવ",
    notAvail: "ઉપલબ્ધ નથી", best: "તમારા માટે શ્રેષ્ઠ",
    showDays: "દેખાશે: <b>%d</b> / %d દિવસ", showDaysAvg: "દેખાશે: <b>%d</b> / %d દિવસ (દરેક જિલ્લામાં સરેરાશ)",
    minDays: "બીજી દુકાન જોડાય તો પણ ઓછામાં ઓછા <b>%d</b> દિવસ", noJoin: "આ સમયમાં બીજી કોઈ જાહેરાત નહીં જોડાય", perDay: "દિવસ દીઠ ખર્ચ: <b>%s</b>",
    whyExTaken: "બીજી 'એકલી જાહેરાત' %s સુધી બુક છે", whyExBusy: "અહીં %d જાહેરાત ચાલુ છે · એકલી જાહેરાત %s થી મળશે",
    whyShFull: "ભાગીદારીની બધી %d જગ્યા ભરેલી છે · %s થી ખાલી",
    placeBusy: "આ સમયમાં અહીં <b>%d</b> જાહેરાત બુક છે", placeFree: "આ સમયમાં અહીં કોઈ જાહેરાત નથી – સારો સમય!",
    stateNote: "આખા રાજ્યની જાહેરાત એ જિલ્લાઓમાં દેખાય છે જ્યાં તે દિવસે જિલ્લાની પોતાની જાહેરાત ન હોય.",
    discountOn: "%d મહિના પર %d% છૂટ લાગુ", noneAvail: "આ સમય માટે જગ્યા નથી. %s પછીની તારીખ પસંદ કરો.",
    total: "કુલ", book: "બુક કરવા વિનંતી કરો", pick: "વિકલ્પ પસંદ કરો",
    understand: "વિકલ્પ સમજો",
    help1: "<b>એકલી જાહેરાત:</b> એ જગ્યાએ ફક્ત તમારી જ જાહેરાત, દરરોજ. જગ્યા ખાલી હોય ત્યારે જ મળે.",
    help2: "<b>ભાગીદારી:</b> વધુમાં વધુ %d દુકાન વારાફરતી દિવસે દેખાય. ભાવ ઓછો.",
    help3: "<b>જિલ્લો કે રાજ્ય:</b> જિલ્લાની જાહેરાત એ જિલ્લાના બધા યાર્ડ પર. રાજ્યની જાહેરાત આખા રાજ્યમાં, જ્યાં જિલ્લાની પોતાની જાહેરાત ન હોય ત્યાં.",
    help4: "<b>શ્રેષ્ઠ:</b> ખાતરીથી દેખાતા દરેક દિવસનો સૌથી ઓછો ખર્ચ.",
    foot: "અંતિમ ભાવ અને તારીખ ફોન પર નક્કી થાય છે. ચુકવણી પછી જ જાહેરાત ચાલુ થાય છે.",
    // booking dialog
    sPlace: "જગ્યા", sTime: "સમય", sPlan: "વિકલ્પ",
    bookTitle: "જાહેરાત માટે વિનંતી", summary: "તમારી પસંદગી",
    shop: "દુકાન / કંપનીનું નામ", owner: "તમારું નામ", mobile: "મોબાઇલ નંબર", waSame: "આ જ નંબર WhatsApp પર છે", wa: "WhatsApp નંબર",
    business: "તમારો ધંધો", b1: "ખેતી (બિયારણ, ખાતર, સાધન)", b2: "દુકાન / વેપાર", b3: "નાણાં / બેંક / વીમો", b4: "બીજું", b5: "શિક્ષણ / સેવા",
    adLine: "જાહેરાતમાં શું લખવું? (વૈકલ્પિક)", adLineHint: "દા.ત. દિવાળી ઑફર – 10% ઓછું", callTime: "ક્યારે ફોન કરીએ?",
    morning: "સવારે", afternoon: "બપોરે", evening: "સાંજે", notes: "બીજી વાત (વૈકલ્પિક)",
    promise: "અમે ફોન કરીને વિગત અને ચુકવણી નક્કી કરીશું. ચુકવણી પછી જ જાહેરાત ચાલુ થશે.",
    send: "વિનંતી મોકલો", sending: "મોકલાય છે…", cancel: "રદ કરો", close: "બંધ કરો",
    errShop: "દુકાનનું નામ લખો", errOwner: "તમારું નામ લખો", errPhone: "10 આંકડાનો મોબાઇલ નંબર લખો",
    sentTitle: "વિનંતી મળી ગઈ ✓", sentBody: "વિનંતી નંબર: <b>%s</b><br>અમે જલ્દી તમને ફોન કરીશું.", sendFail: "મોકલી ન શકાયું. ઇન્ટરનેટ ચેક કરી ફરી પ્રયત્ન કરો, અથવા સીધો સંપર્ક કરો.",
    contactDirect: "સીધો સંપર્ક કરો", loading: "ભાવ લોડ થાય છે…", loadFail: "માહિતી લોડ ન થઈ, ફરી પ્રયત્ન કરો.",
    wd: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"], mon: ["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટેમ્બર", "ઑક્ટોબર", "નવેમ્બર", "ડિસેમ્બર"],
  },
  hi: {
    allIndia: "पूरा भारत", app: "ऐप", chooseApp: "ऐप चुनें", step0: "किस ऐप में विज्ञापन?",
    stateNoteAll: "पूरे भारत का विज्ञापन वहाँ दिखता है जहाँ उस दिन ज़िले या राज्य का अपना विज्ञापन न हो।",
    quoting: "कीमत निकाली जा रही है…", email: "Email (वैकल्पिक)",
    title: "हमारे ऐप में विज्ञापन दें", sub: "हज़ारों उपयोगकर्ताओं तक अपना व्यापार पहुँचाएँ",
    adLbl: "विज्ञापन", adName: "आपकी दुकान का नाम", adText: "आपका ऑफ़र – एक लाइन में",
    why1: "लोग रोज़ ये ऐप खोलते हैं", why2: "मुख्य पेज पर, स्क्रॉल करने पर भी ऊपर", why3: "WhatsApp, कॉल और रास्ता बटन – ग्राहक सीधा आप तक",
    step1: "कहाँ दिखाना है?", step2: "कब से और कितने समय?", step3: "विकल्प चुनें",
    oneDistrict: "एक ज़िला", wholeState: "पूरा राज्य", state: "राज्य", district: "ज़िला",
    chooseDistrict: "ज़िला चुनें", chooseState: "राज्य चुनें", search: "खोजें…", noMatch: "कुछ नहीं मिला",
    findMe: "मेरी जगह के अनुसार", finding: "जगह खोजी जा रही है…", foundYou: "आपकी जगह के अनुसार चुना", noLoc: "जगह नहीं मिली, खुद चुनें",
    startDate: "शुरू तारीख", today: "आज से", nextMonday: "अगले सोमवार से", nextFirst: "अगले महीने की 1 तारीख से", otherDate: "दूसरी तारीख",
    months: "कितने महीने?", m1: "1 महीना", mN: "%d महीने", off: "%d% छूट",
    period: "%s से %s · %d दिन",
    exclusive: "अकेला विज्ञापन", shared: "साझेदारी",
    exclusiveSub: "इस जगह सिर्फ़ आपका विज्ञापन, रोज़", sharedSub: "दूसरी दुकान के साथ बारी-बारी दिन, कम कीमत",
    notAvail: "उपलब्ध नहीं", best: "आपके लिए सबसे अच्छा",
    showDays: "दिखेगा: <b>%d</b> / %d दिन", showDaysAvg: "दिखेगा: <b>%d</b> / %d दिन (हर ज़िले में औसत)",
    minDays: "दूसरी दुकान जुड़े तो भी कम से कम <b>%d</b> दिन", noJoin: "इस समय में कोई और विज्ञापन नहीं जुड़ेगा", perDay: "प्रति दिन खर्च: <b>%s</b>",
    whyExTaken: "दूसरा 'अकेला विज्ञापन' %s तक बुक है", whyExBusy: "यहाँ %d विज्ञापन चालू हैं · अकेला विज्ञापन %s से मिलेगा",
    whyShFull: "साझेदारी की सभी %d जगह भरी हैं · %s से खाली",
    placeBusy: "इस समय यहाँ <b>%d</b> विज्ञापन बुक हैं", placeFree: "इस समय यहाँ कोई विज्ञापन नहीं – अच्छा मौका!",
    stateNote: "पूरे राज्य का विज्ञापन उन ज़िलों में दिखता है जहाँ उस दिन ज़िले का अपना विज्ञापन न हो।",
    discountOn: "%d महीने पर %d% छूट लागू", noneAvail: "इस समय के लिए जगह नहीं। %s के बाद की तारीख चुनें।",
    total: "कुल", book: "बुकिंग का अनुरोध करें", pick: "विकल्प चुनें",
    understand: "विकल्प समझें",
    help1: "<b>अकेला विज्ञापन:</b> इस जगह सिर्फ़ आपका विज्ञापन, रोज़। जगह खाली हो तभी मिलता है।",
    help2: "<b>साझेदारी:</b> ज़्यादा से ज़्यादा %d दुकानें बारी-बारी दिन दिखती हैं। कीमत कम।",
    help3: "<b>ज़िला या राज्य:</b> ज़िले का विज्ञापन उस ज़िले की सभी मंडियों पर। राज्य का विज्ञापन पूरे राज्य में, जहाँ ज़िले का अपना विज्ञापन न हो।",
    help4: "<b>सबसे अच्छा:</b> पक्के दिखने वाले हर दिन का सबसे कम खर्च।",
    foot: "अंतिम कीमत और तारीख फ़ोन पर तय होती है। भुगतान के बाद ही विज्ञापन शुरू होता है।",
    sPlace: "जगह", sTime: "समय", sPlan: "विकल्प",
    bookTitle: "विज्ञापन के लिए अनुरोध", summary: "आपकी पसंद",
    shop: "दुकान / कंपनी का नाम", owner: "आपका नाम", mobile: "मोबाइल नंबर", waSame: "यही नंबर WhatsApp पर है", wa: "WhatsApp नंबर",
    business: "आपका व्यापार", b1: "खेती (बीज, खाद, उपकरण)", b2: "दुकान / व्यापार", b3: "वित्त / बैंक / बीमा", b4: "दूसरा", b5: "शिक्षा / सेवा",
    adLine: "विज्ञापन में क्या लिखें? (वैकल्पिक)", adLineHint: "जैसे दिवाली ऑफ़र – 10% कम", callTime: "कब फ़ोन करें?",
    morning: "सुबह", afternoon: "दोपहर", evening: "शाम", notes: "और कोई बात (वैकल्पिक)",
    promise: "हम फ़ोन करके जानकारी और भुगतान तय करेंगे। भुगतान के बाद ही विज्ञापन शुरू होगा।",
    send: "अनुरोध भेजें", sending: "भेजा जा रहा है…", cancel: "रद्द करें", close: "बंद करें",
    errShop: "दुकान का नाम लिखें", errOwner: "अपना नाम लिखें", errPhone: "10 अंकों का मोबाइल नंबर लिखें",
    sentTitle: "अनुरोध मिल गया ✓", sentBody: "अनुरोध नंबर: <b>%s</b><br>हम जल्दी आपको फ़ोन करेंगे।", sendFail: "भेजा नहीं जा सका। इंटरनेट जाँचकर फिर कोशिश करें, या सीधे संपर्क करें।",
    contactDirect: "सीधे संपर्क करें", loading: "कीमतें लोड हो रही हैं…", loadFail: "जानकारी लोड नहीं हुई, फिर कोशिश करें।",
    wd: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"], mon: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
  },
  en: {
    allIndia: "All India", app: "App", chooseApp: "Choose an app", step0: "Which app?",
    stateNoteAll: "An all-India ad shows wherever there is no district or state ad of its own that day.",
    quoting: "Working out the price…", email: "Email (optional)",
    title: "Advertise in our apps", sub: "Reach thousands of users with your business",
    adLbl: "Ad", adName: "Your shop name", adText: "Your offer – in one line",
    why1: "People open these apps every day", why2: "On the main page, stays on top while scrolling", why3: "WhatsApp, call and directions buttons – customers reach you directly",
    step1: "Where to show it?", step2: "From when, for how long?", step3: "Choose a plan",
    oneDistrict: "One district", wholeState: "Whole state", state: "State", district: "District",
    chooseDistrict: "Choose district", chooseState: "Choose state", search: "Search…", noMatch: "Nothing found",
    findMe: "Use my location", finding: "Finding your location…", foundYou: "Chosen from your location", noLoc: "Location not found, please choose",
    startDate: "Start date", today: "From today", nextMonday: "From next Monday", nextFirst: "From the 1st of next month", otherDate: "Other date",
    months: "How many months?", m1: "1 month", mN: "%d months", off: "%d% off",
    period: "%s to %s · %d days",
    exclusive: "Exclusive", shared: "Shared",
    exclusiveSub: "Only your ad in this place, every day", sharedSub: "Takes turns with other shops, lower price",
    notAvail: "Not available", best: "Best for you",
    showDays: "Shown: <b>%d</b> / %d days", showDaysAvg: "Shown: <b>%d</b> / %d days (average per district)",
    minDays: "At least <b>%d</b> days even if others join", noJoin: "No other ad can join in this period", perDay: "Cost per day: <b>%s</b>",
    whyExTaken: "Another exclusive ad is booked until %s", whyExBusy: "%d ads running here · exclusive from %s",
    whyShFull: "All %d shared places are taken · free from %s",
    placeBusy: "<b>%d</b> ads are booked here in this period", placeFree: "No ads here in this period – good time!",
    stateNote: "A state ad shows in districts that have no district ad of their own that day.",
    discountOn: "%d months: %d% off", noneAvail: "No space in this period. Choose a date after %s.",
    total: "Total", book: "Request booking", pick: "Choose a plan",
    understand: "About the plans",
    help1: "<b>Exclusive:</b> only your ad in that place, every day. Only when the place is free.",
    help2: "<b>Shared:</b> up to %d shops take turns, one per day. Lower price.",
    help3: "<b>District or state:</b> a district ad shows on every yard of that district. A state ad shows across the state where there is no district ad.",
    help4: "<b>Best:</b> the lowest cost for each day you are sure to be shown.",
    foot: "Final price and dates are confirmed on a call. The ad starts only after payment.",
    sPlace: "Place", sTime: "Period", sPlan: "Plan",
    bookTitle: "Ad booking request", summary: "Your choice",
    shop: "Shop / company name", owner: "Your name", mobile: "Mobile number", waSame: "Same number is on WhatsApp", wa: "WhatsApp number",
    business: "Your business", b1: "Farming (seeds, fertiliser, tools)", b2: "Shop / trade", b3: "Finance / bank / insurance", b4: "Other", b5: "Education / services",
    adLine: "What should the ad say? (optional)", adLineHint: "e.g. Diwali offer – 10% off", callTime: "When should we call?",
    morning: "Morning", afternoon: "Afternoon", evening: "Evening", notes: "Anything else (optional)",
    promise: "We will call you to confirm details and payment. The ad starts only after payment.",
    send: "Send request", sending: "Sending…", cancel: "Cancel", close: "Close",
    errShop: "Enter the shop name", errOwner: "Enter your name", errPhone: "Enter a 10-digit mobile number",
    sentTitle: "Request received ✓", sentBody: "Request number: <b>%s</b><br>We will call you soon.", sendFail: "Could not send. Check your internet and try again, or contact us directly.",
    contactDirect: "Contact us directly", loading: "Loading prices…", loadFail: "Could not load, please try again.",
    wd: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], mon: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
};
let LANG = (() => { try { return localStorage.getItem("vv_lang") || "gu"; } catch (e) { return "gu"; } })();
if (!I18N[LANG]) LANG = "gu";
function setLang(l) { LANG = I18N[l] ? l : "gu"; try { localStorage.setItem("vv_lang", LANG); } catch (e) {} document.documentElement.lang = LANG; }
function t(key, ...args) {
  let s = (I18N[LANG] && I18N[LANG][key]) ?? I18N.gu[key] ?? key;
  if (typeof s !== "string") return s;
  let i = 0;
  return s.replace(/%[sd]/g, () => (args[i++] ?? ""));
}

// =====================================================================================
// Dates (epoch days, like the app)
// =====================================================================================
const DAY_MS = 86400000;
function dayOf(iso) { if (!iso) return null; const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso).trim()); if (!m) return null; return Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / DAY_MS); }
function isoOf(day) { return new Date(day * DAY_MS).toISOString().slice(0, 10); }
function todayDay() { const n = new Date(); return Math.floor(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) / DAY_MS); }
function addMonths(day, months) { const d = new Date(day * DAY_MS); return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, d.getUTCDate()) / DAY_MS); }
function niceDate(day) { const d = new Date(day * DAY_MS); return d.getUTCDate() + " " + t("mon")[d.getUTCMonth()].slice(0, LANG === "en" ? 3 : 20) + " " + d.getUTCFullYear(); }
function weekday(day) { return new Date(day * DAY_MS).getUTCDay(); }
function nextMonday() { const d = todayDay(); return d + ((8 - weekday(d)) % 7 || 7); }
function nextFirst() { const d = new Date(todayDay() * DAY_MS); return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1) / DAY_MS); }
function money(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
function floorMod(a, n) { return ((a % n) + n) % n; }

// =====================================================================================
// Places
// =====================================================================================
/** Same key as the app (Promo.districtKey). */
function districtKey(name) {
  const n = (name || "").toLowerCase();
  const gj = GJ_DISTRICTS.find(d => d.aliases.some(a => n.includes(a)));
  return ((gj ? gj.aliases[0] : n.split("(")[0]).replace(/[^a-z]/g, ""));
}
function titleCase(s) { return s.replace(/\b\w/g, c => c.toUpperCase()); }
/** Districts of a state: {key, label, json, lat?, lng?}, sorted by label. */
function districtsOf(st) {
  if (st === "GJ") return GJ_DISTRICTS.map(d => ({
    key: d.aliases[0].replace(/[^a-z]/g, ""), json: titleCase(d.aliases[0]),
    label: LANG === "gu" ? d.gu : LANG === "hi" ? d.hi : titleCase(d.aliases[0]),
    sub: LANG === "en" ? d.gu : titleCase(d.aliases[0]), lat: d.lat, lng: d.lng,
  })).sort((a, b) => a.label.localeCompare(b.label, LANG));
  return (OTHER_DISTRICTS[st] || []).map(n => ({ key: districtKey(n), json: n, label: n, sub: "" }));
}
function stateLabel(key) { const s = STATES.find(x => x.key === key); return s ? (s[LANG] || s.gu) : key; }
function districtLabel(st, key) { const d = districtsOf(st).find(x => x.key === key); return d ? d.label : key; }
function placeLabel(area) { return area.type === "district" ? districtLabel(area.st, area.dk) + ", " + stateLabel(area.st) : stateLabel(area.st) + " · " + t("wholeState"); }

function km(a, b, c, d) { const r = Math.PI / 180, x = (d - b) * r * Math.cos((a + c) / 2 * r), y = (c - a) * r; return Math.sqrt(x * x + y * y) * 6371; }
/** Nearest state (from the app's yard positions) and, in Gujarat, nearest district. */
function placeFromPosition(lat, lng) {
  let best = null, bd = 1e9;
  for (const [st, pts] of Object.entries(STATE_POINTS)) for (const [a, b] of pts) { const k = km(lat, lng, a, b); if (k < bd) { bd = k; best = st; } }
  if (!best || bd > 150) return null;
  let dk = "";
  if (best === "GJ") { let dd = 1e9; for (const d of districtsOf("GJ")) { const k = km(lat, lng, d.lat, d.lng); if (k < dd) { dd = k; dk = d.key; } } }
  return { st: best, dk };
}
function locate() {
  return new Promise(res => {
    if (!navigator.geolocation) return res(null);
    navigator.geolocation.getCurrentPosition(p => res(placeFromPosition(p.coords.latitude, p.coords.longitude)), () => res(null), { timeout: 10000, maximumAge: 3600000 });
  });
}

// =====================================================================================
// promo.json → ads the app would show
// =====================================================================================
function sponsorsOf(promo) {
  return (promo && promo.sponsors || []).filter(s =>
    !(s.yards && s.yards.length) && !(s.crops && s.crops.length) &&
    ((s.text && (s.text.gu || s.text.en)) || (s.name && (typeof s.name === "string" ? s.name : (s.name.gu || s.name.en))))
  ).map(s => ({
    id: s.id || "",
    districts: (s.districts || []).map(districtKey).filter(Boolean),
    states: (s.states || []).map(x => String(x).trim().toUpperCase()).filter(Boolean),
    from: dayOf(s.from) ?? -1e9, until: dayOf(s.until) ?? 1e9,
    plan: s.plan === "exclusive" ? "exclusive" : "shared",
    raw: s,
  }));
}
function titleOf(raw) {
  const n = raw.name; const v = typeof n === "string" ? n : (n && (n.gu || n.en)) || "";
  return v || ((raw.text && (raw.text.gu || raw.text.en)) || "").split(/ – | - |,/)[0];
}
function placeOf(s) {
  const st = s.states[0] || "GJ";
  if (s.districts.length) return s.districts.map(k => districtLabel(st, k)).join(", ") + " · " + stateLabel(st);
  return s.states.map(stateLabel).join(", ") + " · " + t("wholeState");
}

/** The app's choice for one district (key dk, state st) on one day. */
function pickFor(list, dk, st, day) {
  const live = list.filter(s => day >= s.from && day <= s.until);
  const inState = s => !s.states.length || s.states.includes(st);
  let pick = live.filter(s => s.districts.length && dk && s.districts.includes(dk) && inState(s));
  if (!pick.length) pick = live.filter(s => !s.districts.length && st && s.states.includes(st));
  if (!pick.length) return null;
  pick.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return pick[floorMod(day, pick.length)];
}
function rivals(list, area, from, until) {
  return list.filter(s => s.until >= from && s.from <= until && (
    area.type === "district"
      ? s.districts.includes(area.dk) && (!s.states.length || s.states.includes(area.st))
      : !s.districts.length && s.states.includes(area.st)
  ));
}
function discountFor(pricing, months) {
  let d = 0;
  for (const [m, v] of Object.entries(pricing.discounts || {})) if (months >= +m) d = Math.max(d, +v);
  return d;
}

/** Availability, shown days and price of both plans for one place + period. */
function analyse(list, pricing, area, from, until, months, excludeId) {
  const others = list.filter(s => s.id !== excludeId);
  const r = rivals(others, area, from, until);
  const exclusiveTaken = r.filter(s => s.plan === "exclusive");
  const sharedTaken = r.filter(s => s.plan !== "exclusive");
  const maxShared = Math.max(1, pricing.maxShared || 3);
  let busiest = 0;
  for (let d = from; d <= until; d++) busiest = Math.max(busiest, r.filter(s => d >= s.from && d <= s.until).length);
  const freeFrom = r.length ? Math.max(...r.map(s => s.until)) + 1 : from;
  const totalDays = until - from + 1;
  const keys = area.type === "district" ? [area.dk] : (districtsOf(area.st).map(d => d.key).filter(Boolean));
  if (!keys.length) keys.push("");
  function shownDays(plan) {
    const me = { id: "zz-new", districts: area.type === "district" ? [area.dk] : [], states: [area.st], from, until, plan };
    const all = others.concat([me]);
    let sum = 0;
    for (const dk of keys) for (let d = from; d <= until; d++) if (pickFor(all, dk, area.st, d) === me) sum++;
    return Math.round(sum / keys.length);
  }
  const level = area.type === "district" ? pricing.district : (pricing.state[area.st] || pricing.state.default);
  const disc = discountFor(pricing, months);
  const price = plan => level[plan] * months * (1 - disc);

  const ex = { plan: "exclusive", ok: r.length === 0, price: price("exclusive"), days: 0, why: "" };
  if (!ex.ok) ex.why = exclusiveTaken.length ? t("whyExTaken", niceDate(Math.max(...exclusiveTaken.map(s => s.until)))) : t("whyExBusy", r.length, niceDate(freeFrom));
  else ex.days = shownDays("exclusive");
  const sh = { plan: "shared", ok: exclusiveTaken.length === 0 && busiest < maxShared, price: price("shared"), days: 0, why: "" };
  if (exclusiveTaken.length) sh.why = t("whyExTaken", niceDate(Math.max(...exclusiveTaken.map(s => s.until))));
  else if (busiest >= maxShared) sh.why = t("whyShFull", maxShared, niceDate(freeFrom));
  else sh.days = shownDays("shared");
  // Shared: more shops may join later, so count the days it gets when all shared places are full.
  ex.minDays = ex.days;
  sh.minDays = sh.ok ? Math.min(sh.days, Math.round(sh.days * (sharedTaken.length + 1) / maxShared)) : 0;
  [ex, sh].forEach(o => { o.perDay = o.ok && o.minDays ? o.price / o.minDays : Infinity; });
  const best = [ex, sh].filter(o => o.ok && o.minDays).sort((a, b) => a.perDay - b.perDay)[0] || null;
  return { rivals: r, exclusive: ex, shared: sh, best, totalDays, discount: disc, freeFrom, maxShared };
}

// =====================================================================================
// Loading
// =====================================================================================
async function loadPublic(name) {
  const r = await fetch(RAW + name + "?t=" + Date.now(), { cache: "no-store" });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(name + ": " + r.status);
  return r.json();
}
const DEFAULT_PRICING = {
  currency: "INR",
  district: { exclusive: 2000, shared: 800 },
  state: { default: { exclusive: 20000, shared: 8000 } },
  maxShared: 3,
  discounts: { "3": 0.10, "6": 0.15, "12": 0.25 },
  requestUrl: "",
};
async function loadPricing() { const p = await loadPublic("pricing.json").catch(() => null); return Object.assign({}, DEFAULT_PRICING, p || {}); }

// =====================================================================================
// UI helpers: escape, modal, picker, date picker, toast
// =====================================================================================
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

/** A dialog (bottom sheet on phones). Returns {el, close}. */
function openModal(inner, opts = {}) {
  const wrap = document.createElement("div");
  wrap.className = "modal";
  wrap.innerHTML = `<div class="sheet${opts.wide ? " wide" : ""}" role="dialog" aria-modal="true">${inner}</div>`;
  document.body.appendChild(wrap);
  document.body.classList.add("noscroll");
  const prev = document.activeElement;
  function close() { wrap.remove(); if (!document.querySelector(".modal")) document.body.classList.remove("noscroll"); document.removeEventListener("keydown", key); prev && prev.focus && prev.focus(); opts.onClose && opts.onClose(); }
  function key(e) { if (e.key === "Escape") close(); }
  document.addEventListener("keydown", key);
  wrap.addEventListener("click", e => { if (e.target === wrap) close(); });
  wrap.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", close));
  requestAnimationFrame(() => wrap.classList.add("in"));
  return { el: wrap, close };
}

/** Searchable list in a dialog. items: [{value, label, sub}] */
function openPicker({ title, items, value, onPick }) {
  const m = openModal(`
    <div class="sheet-h"><b>${esc(title)}</b><button class="x" data-close aria-label="${esc(t("close"))}">✕</button></div>
    ${items.length > 8 ? `<div class="searchbox"><span>🔍</span><input type="search" placeholder="${esc(t("search"))}" autocomplete="off"></div>` : ""}
    <div class="plist" role="listbox"></div>`);
  const listEl = m.el.querySelector(".plist"), q = m.el.querySelector("input");
  function draw() {
    const s = (q ? q.value : "").trim().toLowerCase();
    const shown = items.filter(i => !s || i.label.toLowerCase().includes(s) || (i.sub || "").toLowerCase().includes(s));
    listEl.innerHTML = shown.length ? shown.map(i => `<button class="pitem${i.value === value ? " on" : ""}" data-v="${esc(i.value)}" role="option" aria-selected="${i.value === value}">
        <span><b>${esc(i.label)}</b>${i.sub ? `<small>${esc(i.sub)}</small>` : ""}</span>${i.value === value ? "<i>✓</i>" : ""}</button>`).join("")
      : `<p class="muted center">${esc(t("noMatch"))}</p>`;
  }
  draw();
  q && q.addEventListener("input", draw);
  q && setTimeout(() => q.focus(), 50);
  listEl.addEventListener("click", e => { const b = e.target.closest(".pitem"); if (!b) return; m.close(); onPick(b.dataset.v); });
  const on = listEl.querySelector(".on"); on && on.scrollIntoView({ block: "center" });
}

/** Month calendar in a dialog. */
function openDatePicker({ value, min, max, onPick, title }) {
  let view = new Date((value ?? min) * DAY_MS); view = { y: view.getUTCFullYear(), m: view.getUTCMonth() };
  const m = openModal(`<div class="sheet-h"><b>${esc(title || t("startDate"))}</b><button class="x" data-close aria-label="${esc(t("close"))}">✕</button></div><div class="cal"></div>`);
  const cal = m.el.querySelector(".cal");
  function draw() {
    const first = Math.floor(Date.UTC(view.y, view.m, 1) / DAY_MS), days = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
    const lead = weekday(first);
    const prevOk = Math.floor(Date.UTC(view.y, view.m, 0) / DAY_MS) >= min, nextOk = Math.floor(Date.UTC(view.y, view.m + 1, 1) / DAY_MS) <= max;
    let cells = "";
    for (let i = 0; i < lead; i++) cells += "<span></span>";
    for (let d = 0; d < days; d++) {
      const day = first + d, dis = day < min || day > max;
      cells += `<button class="cd${day === value ? " on" : ""}${day === todayDay() ? " today" : ""}" data-d="${day}"${dis ? " disabled" : ""}>${d + 1}</button>`;
    }
    cal.innerHTML = `<div class="cal-h"><button class="nav" data-n="-1"${prevOk ? "" : " disabled"} aria-label="prev">‹</button><b>${t("mon")[view.m]} ${view.y}</b><button class="nav" data-n="1"${nextOk ? "" : " disabled"} aria-label="next">›</button></div>
      <div class="cal-g">${t("wd").map(w => `<small>${esc(w)}</small>`).join("")}${cells}</div>`;
  }
  draw();
  cal.addEventListener("click", e => {
    const n = e.target.closest(".nav"); if (n && !n.disabled) { view.m += +n.dataset.n; if (view.m < 0) { view.m = 11; view.y--; } if (view.m > 11) { view.m = 0; view.y++; } draw(); return; }
    const c = e.target.closest(".cd"); if (c && !c.disabled) { m.close(); onPick(+c.dataset.d); }
  });
}

function toast(text, kind) {
  let box = document.querySelector(".toasts"); if (!box) { box = document.createElement("div"); box.className = "toasts"; document.body.appendChild(box); }
  const el = document.createElement("div"); el.className = "toast " + (kind || ""); el.textContent = text; box.appendChild(el);
  setTimeout(() => el.classList.add("out"), kind === "err" ? 6000 : 3500); setTimeout(() => el.remove(), kind === "err" ? 6500 : 4000);
}

/** The two plan cards (selectable). */
function plansHtml(a, area, chosen) {
  const card = (o, title, sub) => {
    const isBest = a.best === o, on = chosen === o.plan && o.ok;
    if (!o.ok) return `<div class="plan off"><div class="plan-h"><b>${title}</b><span class="pill no">${t("notAvail")}</span></div><p class="muted">${esc(o.why)}</p></div>`;
    return `<button class="plan${on ? " on" : ""}" data-plan="${o.plan}" aria-pressed="${on}">
      <div class="plan-h"><span class="radio"></span><b>${title}</b>${isBest ? `<span class="pill yes">★ ${t("best")}</span>` : ""}</div>
      <div class="plan-p">${money(o.price)}</div>
      <p class="muted">${sub}</p>
      <ul>
        <li>${area.type === "state" ? t("showDaysAvg", o.days, a.totalDays) : t("showDays", o.days, a.totalDays)}</li>
        ${o.plan === "shared" && o.minDays < o.days ? `<li>${t("minDays", o.minDays)}</li>` : ""}
        ${o.plan === "exclusive" ? `<li>${t("noJoin")}</li>` : ""}
        <li>${t("perDay", money(o.perDay))}</li>
      </ul></button>`;
  };
  let notes = a.rivals.length ? `<p class="note">${t("placeBusy", a.rivals.length)}</p>` : `<p class="note ok">${t("placeFree")}</p>`;
  if (area.type === "state") notes += `<p class="note">${t("stateNote")}</p>`;
  return notes + `<div class="plans">${card(a.exclusive, t("exclusive"), t("exclusiveSub"))}${card(a.shared, t("shared"), t("sharedSub"))}</div>` +
    (a.best ? "" : `<p class="note warn">${t("noneAvail", niceDate(a.freeFrom))}</p>`);
}

const BASE_CSS = `
:root{--brand:#1F7A4D;--brand2:#2a9a62;--brandSoft:#e8f4ee;--ink:#17201b;--muted:#5f6b64;--line:#e3e8e5;--bg:#f3f5f4;--card:#fff;--gold:#FFF8E1;--gold2:#FFF1C9;--goldEdge:#F3DE9A;--goldInk:#8A6D00;--warn:#9a5b00;--bad:#b42318;--r:16px;--shadow:0 1px 2px rgba(16,24,20,.06),0 4px 16px rgba(16,24,20,.05)}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 "Noto Sans Gujarati","Noto Sans Devanagari",system-ui,-apple-system,"Segoe UI",sans-serif}
body.noscroll{overflow:hidden}
button{font:inherit;color:inherit}a{color:var(--brand)}
.wrap{max-width:880px;margin:0 auto;padding:0 16px}
.muted{color:var(--muted);font-size:13px;margin:4px 0}.center{text-align:center}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:16px;margin:14px 0;box-shadow:var(--shadow)}
.card h2{font-size:17px;margin:0 0 10px;display:flex;align-items:center;gap:8px}.card h2 .n{width:26px;height:26px;border-radius:50%;background:var(--brand);color:#fff;font-size:13px;display:inline-flex;align-items:center;justify-content:center;flex:none}
label.f{display:block;font-weight:600;font-size:13px;margin:12px 0 5px}
input,select,textarea{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:12px;font:inherit;background:#fff;color:var(--ink);min-height:46px}
input:focus,select:focus,textarea:focus,button:focus-visible{outline:2px solid var(--brand2);outline-offset:1px}
textarea{min-height:70px;resize:vertical}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.seg{display:flex;background:#eef1ef;border-radius:12px;padding:4px;gap:4px}.seg button{flex:1;border:0;background:transparent;border-radius:9px;padding:10px 8px;cursor:pointer;font-weight:600;color:var(--muted);min-height:42px}
.seg button.on{background:#fff;color:var(--brand);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.chips{display:flex;flex-wrap:wrap;gap:8px}.chip{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 14px;cursor:pointer;min-height:42px;display:inline-flex;align-items:center;gap:6px;font-weight:500}
.chip.on{border-color:var(--brand);background:var(--brandSoft);color:var(--brand);font-weight:700}.chip small{font-size:11px;color:var(--brand);background:#fff;border-radius:999px;padding:1px 6px;border:1px solid var(--brandSoft)}
.selbtn{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;border:1px solid var(--line);background:#fff;border-radius:12px;padding:10px 12px;min-height:50px;cursor:pointer;text-align:left}
.selbtn span{display:flex;flex-direction:column;min-width:0}.selbtn small{color:var(--muted);font-size:11px;font-weight:600}.selbtn b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.selbtn::after{content:"▾";color:var(--muted)}
.linkbtn{border:0;background:none;color:var(--brand);font-weight:600;cursor:pointer;padding:6px 0;display:inline-flex;gap:6px;align-items:center}
.btn{border:0;border-radius:12px;padding:12px 18px;font-weight:700;cursor:pointer;min-height:48px;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn.main{background:var(--brand);color:#fff}.btn.main:hover{background:#196640}.btn.ghost{background:#fff;border:1px solid var(--line)}.btn.danger{background:#fff;border:1px solid #f3c7c3;color:var(--bad)}
.btn:disabled{opacity:.5;cursor:not-allowed}.btn.block{width:100%}
.note{background:#fff7e6;border-radius:10px;padding:9px 12px;font-size:14px;margin:8px 0}.note.ok{background:#eaf6ef}.note.warn{background:#fdecea;color:var(--bad)}
.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin-top:10px}
.plan{display:block;width:100%;text-align:left;border:1.5px solid var(--line);border-radius:14px;padding:14px;background:#fff;cursor:pointer;transition:border-color .15s,box-shadow .15s}
.plan:hover{border-color:#bcd8c8}.plan.on{border-color:var(--brand);box-shadow:0 0 0 3px var(--brandSoft)}.plan.off{background:#fafbfa;cursor:default}
.plan-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.plan-h b{flex:1}.plan-p{font-size:26px;font-weight:800;color:var(--brand);margin:6px 0 0}
.plan ul{margin:8px 0 0;padding-left:18px;font-size:14px}.plan li{margin:2px 0}
.radio{width:18px;height:18px;border-radius:50%;border:2px solid #b8c4bd;flex:none}.plan.on .radio{border:5px solid var(--brand)}
.pill{font-size:11px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}.pill.yes{background:var(--brand);color:#fff}.pill.no{background:#fde8e7;color:var(--bad)}
.ad{display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--gold),var(--gold2));border:1px solid var(--goldEdge);border-radius:16px;padding:10px 10px 10px 12px;max-width:400px}
.ad .t{flex:1;min-width:0}.ad .lbl{display:inline-block;background:#FFE9A8;color:var(--goldInk);font-size:9px;font-weight:700;border-radius:6px;padding:1px 6px}
.ad b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#3D3200}.ad span.d{font-size:11px;color:#5a4a00;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ad i{width:34px;height:34px;border-radius:50%;background:#fff;border:1px solid var(--goldEdge);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:15px;flex:none}
/* modal / bottom sheet */
.modal{position:fixed;inset:0;background:rgba(10,20,15,.45);display:flex;align-items:flex-end;justify-content:center;z-index:50;opacity:0;transition:opacity .15s}
.modal.in{opacity:1}.sheet{background:#fff;width:100%;max-width:520px;max-height:92vh;overflow:auto;border-radius:20px 20px 0 0;padding:0 16px 16px;transform:translateY(20px);transition:transform .18s;scroll-padding-top:70px}
.sheet.wide{max-width:640px}.modal.in .sheet{transform:none}
@media (min-width:640px){.modal{align-items:center}.sheet{border-radius:20px;max-height:86vh}}
.sheet-h{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;position:sticky;top:0;background:#fff;padding:14px 0 8px;z-index:2}.sheet-h b{font-size:17px}
.x{border:0;background:#f0f2f1;width:36px;height:36px;border-radius:50%;cursor:pointer;flex:none}
.searchbox{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:12px;padding:0 12px;margin-bottom:8px;position:sticky;top:60px;background:#fff;z-index:1}.searchbox input{border:0;padding:10px 0;outline:none}
.plist{display:flex;flex-direction:column}.pitem{display:flex;justify-content:space-between;align-items:center;gap:8px;border:0;background:#fff;text-align:left;padding:12px 10px;border-radius:10px;cursor:pointer;min-height:50px}
.pitem:hover{background:#f4f7f5}.pitem.on{background:var(--brandSoft)}.pitem span{display:flex;flex-direction:column}.pitem small{color:var(--muted);font-size:12px}.pitem i{color:var(--brand);font-style:normal;font-weight:800}
.cal-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.cal-h b{font-size:16px}.nav{border:1px solid var(--line);background:#fff;width:40px;height:40px;border-radius:10px;font-size:20px;cursor:pointer}.nav:disabled{opacity:.3}
.cal-g{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}.cal-g small{font-size:11px;color:var(--muted);padding:4px 0}
.cd{border:0;background:#f6f8f7;border-radius:10px;aspect-ratio:1;min-height:40px;cursor:pointer;font-weight:600}.cd:hover:not(:disabled){background:var(--brandSoft)}.cd.today{box-shadow:inset 0 0 0 1.5px var(--brand2)}
.cd.on{background:var(--brand);color:#fff}.cd:disabled{background:transparent;color:#c3cbc6;cursor:default}
.toasts{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);display:flex;flex-direction:column;gap:8px;z-index:60;width:min(92vw,420px)}
.toast{background:#17201b;color:#fff;padding:12px 16px;border-radius:12px;box-shadow:var(--shadow);transition:opacity .3s}.toast.ok{background:var(--brand)}.toast.err{background:var(--bad)}.toast.out{opacity:0}
.st{font-size:11px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}
.st.live,.st.approved{background:#eaf6ef;color:var(--brand)}.st.soon,.st.new{background:#eef2ff;color:#3538cd}.st.end{background:#f2f4f7;color:#667085}
.st.called{background:#fff4e5;color:var(--warn)}.st.paid{background:#e6f6ff;color:#0b6aa2}.st.rejected{background:#fde8e7;color:var(--bad)}
`;
