/* ============================================================
   KINGDOM FINANCE SERIES 2026 — script.js
   ============================================================ */

/* ---------- CONFIG ---------- */
const CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbw6C8O0Blp3IZiv_5P140SZoHUD3n9u_ly4XptTIrGisEzNZPEJtunxE4_3JlTEl5iZBg/exec"
};

const SESSION_DATES = [
  "2026-07-05T16:00:00+01:00",
  "2026-07-12T16:00:00+01:00",
  "2026-07-19T16:00:00+01:00",
  "2026-07-26T16:00:00+01:00"
];

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initParticles();
  initNav();
  initCountdown();
  initScrollReveal();
  initTestimonialCarousel();
  initFAQ();
  initBackToTop();
  initRegistrationForm();
});

/* ---------- LOADER ---------- */
function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  if (!loader || !fill) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("loaded");
        document.body.style.overflow = "auto";
      }, 250);
    }
    fill.style.width = progress + "%";
  }, 220);
  document.body.style.overflow = "hidden";
  setTimeout(() => { document.body.style.overflow = "auto"; }, 2600);
}

/* ---------- PARTICLE CANVAS ---------- */
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const COLORS = ["#FFD400", "#FF2E92", "#8A3FFC", "#FFFFFF"];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const count = window.innerWidth < 700 ? 36 : 70;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------- NAVIGATION ---------- */
function initNav() {
  const header = document.getElementById("siteHeader");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!header || !hamburger || !navLinks) return;
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  const sections = document.querySelectorAll("main section, .hero");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        links.forEach(l => l.classList.remove("active-link"));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add("active-link");
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ---------- COUNTDOWN ---------- */
function initCountdown() {
  const dEl = document.getElementById("cdDays");
  const hEl = document.getElementById("cdHours");
  const mEl = document.getElementById("cdMins");
  const sEl = document.getElementById("cdSecs");
  if (!dEl) return;

  function getNextSession() {
    const now = new Date();
    const upcoming = SESSION_DATES.map(d => new Date(d)).filter(d => d > now);
    return upcoming.length ? upcoming[0] : new Date(SESSION_DATES[SESSION_DATES.length - 1]);
  }

  function tick() {
    const target = getNextSession();
    const diff = Math.max(0, target - new Date());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    dEl.textContent = String(days).padStart(2, "0");
    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(mins).padStart(2, "0");
    sEl.textContent = String(secs).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal, .why-card, .timeline-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(i => observer.observe(i));
}

/* ---------- TESTIMONIAL CAROUSEL ---------- */
function initTestimonialCarousel() {
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  if (!track) return;
  const cards = track.children;
  let index = 0;

  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  }

  function goTo(i) {
    index = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    Array.from(dotsWrap.children).forEach((d, di) => d.classList.toggle("active", di === i));
  }

  setInterval(() => {
    index = (index + 1) % cards.length;
    goTo(index);
  }, 6000);
}

/* ---------- FAQ ACCORDION ---------- */
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ---------- BACK TO TOP ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- REGISTRATION FORM ---------- */
function initRegistrationForm() {
  const form = document.getElementById("registrationForm");
  if (!form) return;
  const submitBtn = document.getElementById("submitBtn");

  const validators = {
    fullName: v => v.trim().length >= 3 ? "" : "Please enter your full name.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email address.",
    phone: v => /^[0-9+\s-]{7,15}$/.test(v) ? "" : "Please enter a valid phone number.",
    address: v => v.trim().length >= 5 ? "" : "Please enter your house address.",
    hearAbout: v => v ? "" : "Please select an option.",
    expectations: v => v.trim().length >= 5 ? "" : "Please tell us your expectations."
  };

  function showError(field, message) {
    const group = document.getElementById(field)?.closest(".form-group");
    const errEl = document.getElementById("err-" + field);
    if (errEl) errEl.textContent = message;
    if (group) group.classList.toggle("error", !!message);
  }

  function validateRadio(name) {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    const errEl = document.getElementById("err-" + name);
    if (!checked) {
      if (errEl) errEl.textContent = "Please select an option.";
      return false;
    }
    if (errEl) errEl.textContent = "";
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach(field => {
      const el = document.getElementById(field);
      const msg = validators[field](el.value);
      showError(field, msg);
      if (msg) valid = false;
    });

    if (!validateRadio("recommendEvent")) valid = false;
    if (!validateRadio("recommendChurch")) valid = false;

    if (!valid) {
      const firstError = form.querySelector(".error, .error-msg:not(:empty)");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    const payload = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      hearAbout: document.getElementById("hearAbout").value,
      recommendEvent: form.querySelector('input[name="recommendEvent"]:checked').value,
      recommendChurch: form.querySelector('input[name="recommendChurch"]:checked').value,
      expectations: document.getElementById("expectations").value.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      await submitToGoogleSheets(payload);
      sessionStorage.setItem("kfs2026_registration", JSON.stringify(payload));
      window.location.href = "thank-you.html";
    } catch (err) {
      console.error(err);
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      alert("Something went wrong while submitting your registration. Please check your connection and try again, or contact us on 0802 828 2715.");
    }
  });
}

/* Submit to Google Apps Script (Google Sheets backend) */
async function submitToGoogleSheets(payload) {
  if (CONFIG.GOOGLE_SCRIPT_URL.indexOf("PASTE_") !== -1) {
    console.warn("Google Apps Script URL not configured — skipping sheet submission.");
    return Promise.resolve();
  }
  return fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
}

