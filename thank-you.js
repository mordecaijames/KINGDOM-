/* ============================================================
   THANK-YOU PAGE — thank-you.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  loadRegistrationData();
  initParticles(); // reuses function defined in script.js
  initTyCountdown();
  initShare();
  initCalendar();
  initGuideDownload();
});

const SESSION_DATES_TY = [
  "2026-07-05T16:00:00+01:00",
  "2026-07-12T16:00:00+01:00",
  "2026-07-19T16:00:00+01:00",
  "2026-07-26T16:00:00+01:00"
];

function loadRegistrationData() {
  try {
    const raw = sessionStorage.getItem("kfs2026_registration");
    if (raw) {
      const data = JSON.parse(raw);
      const firstName = (data.fullName || "").split(" ")[0];
      if (firstName) {
        document.getElementById("tyName").textContent = ", " + firstName;
      }
    }
  } catch (e) { /* no-op */ }
}

function initTyCountdown() {
  const dEl = document.getElementById("cdDays");
  if (!dEl) return;
  function getNextSession() {
    const now = new Date();
    const upcoming = SESSION_DATES_TY.map(d => new Date(d)).filter(d => d > now);
    return upcoming.length ? upcoming[0] : new Date(SESSION_DATES_TY[SESSION_DATES_TY.length - 1]);
  }
  function tick() {
    const target = getNextSession();
    const diff = Math.max(0, target - new Date());
    document.getElementById("cdDays").textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    document.getElementById("cdHours").textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, "0");
    document.getElementById("cdMins").textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, "0");
    document.getElementById("cdSecs").textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

function initShare() {
  const btn = document.getElementById("shareBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const shareData = {
      title: "Kingdom Finance Series 2026",
      text: "I just registered for Kingdom Finance Series 2026 — Empowering Believers To Build Wealth God's Way. Join me!",
      url: window.location.origin + "/index.html"
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.text + " " + shareData.url);
        btn.textContent = "Link Copied!";
        setTimeout(() => { btn.textContent = "Share Event"; }, 2200);
      } catch (e) {
        alert(shareData.text + " " + shareData.url);
      }
    }
  });
}

function initCalendar() {
  const btn = document.getElementById("calendarBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const start = "20260705T150000Z"; // 4PM WAT = 15:00 UTC
    const end = "20260705T170000Z";
    const title = encodeURIComponent("Kingdom Finance Series 2026");
    const details = encodeURIComponent("Empowering Believers To Build Wealth God's Way. Sessions on 5th, 12th, 19th & 26th July 2026 at 4PM WAT. Contact: 08028282715");
    const location = encodeURIComponent("Lifegate People's Assembly, Opp. 2A Gwari Avenue, Barnawa, Kaduna State");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&recur=RRULE:FREQ=WEEKLY;COUNT=4`;
    window.open(url, "_blank");
  });
}

function initGuideDownload() {
  const btn = document.getElementById("guideBtn");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.textContent = "Preparing Guide...";
    setTimeout(() => {
      btn.textContent = "Download Event Guide";
      alert("Your Event Guide PDF is being prepared by our team and will also be emailed to you before the first session. For an immediate copy, contact us on 0802 828 2715.");
    }, 900);
  });
}
