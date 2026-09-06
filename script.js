/* =========================================
   SUMIT PORTFOLIO — JS
   Sections: theme, mobile nav, sidebar active
   indicator, hero compile sequence, skill bars,
   changelog accordion, custom cursor, contact
   form, email copy, back-to-top.
========================================= */

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================
   THEME TOGGLE (persisted)
========================================= */

const themeToggle = document.getElementById("themeToggle");
const themeLabel = themeToggle.querySelector(".theme-label");

function applyTheme(mode) {
  document.documentElement.dataset.theme = mode;
  themeLabel.textContent = mode;
}

let currentTheme = localStorage.getItem("theme") || "dark";
applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);
});


/* =========================================
   MOBILE SIDEBAR TOGGLE
========================================= */

const mobileToggle = document.getElementById("mobileToggle");
const sidebar = document.getElementById("sidebar");

mobileToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  mobileToggle.classList.toggle("open");
});

document.querySelectorAll(".side-nav a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    mobileToggle.classList.remove("open");
  });
});


/* =========================================
   SIDEBAR ACTIVE LINK + SLIDING INDICATOR
========================================= */

const navLinks = document.querySelectorAll(".side-nav a");
const indicator = document.querySelector(".side-indicator");
const sections = document.querySelectorAll("section[id]");

function moveIndicator(link) {
  if (!link) return;
  indicator.style.top = link.offsetTop + "px";
}

window.addEventListener("scroll", () => {
  let current = sections[0].id;

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });

  const active = document.querySelector(".side-nav a.active");
  moveIndicator(active);
});

window.addEventListener("load", () => {
  moveIndicator(document.querySelector(".side-nav a.active"));
});


/* =========================================
   HERO COMPILE SEQUENCE
   The one non-user-triggered animation on the
   page: headline words rise into place, then
   the status panel types itself out line by
   line, ending with a blinking cursor.
========================================= */

function wrapWords(el) {
  const text = el.textContent.trim();
  el.innerHTML = text
    .split(" ")
    .map(word => `<span class="reveal-word">${word}</span>`)
    .join(" ");
}

document.querySelectorAll(".hero-headline .line").forEach(line => {
  // Preserve the <em> tag inside the second line.
  if (line.querySelector("em")) {
    const parts = line.innerHTML.split(/(<em>.*?<\/em>)/);
    line.innerHTML = parts
      .map(part => {
        if (part.startsWith("<em>")) {
          const inner = part.replace(/<\/?em>/g, "");
          return `<em><span class="reveal-word">${inner}</span></em>`;
        }
        return part
          .split(" ")
          .filter(Boolean)
          .map(w => `<span class="reveal-word">${w}</span>`)
          .join(" ") + " ";
      })
      .join("");
  } else {
    wrapWords(line);
  }
});

function runCompileSequence() {

  const words = document.querySelectorAll(".reveal-word");

  words.forEach((word, i) => {
    word.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease";
    setTimeout(() => {
      word.style.transform = "translateY(0)";
      word.style.opacity = "1";
    }, 120 + i * 60);
  });

  const buildLines = document.querySelectorAll(".build-line");
  const totalWordDelay = 120 + words.length * 60;

  buildLines.forEach((line, i) => {
    const finalText = line.getAttribute("data-final");
    let charIndex = 0;

    setTimeout(() => {
      const typer = setInterval(() => {
        line.textContent = finalText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex >= finalText.length) clearInterval(typer);
      }, 18);
    }, totalWordDelay + i * 380);
  });
}

if (prefersReducedMotion) {

  document.querySelectorAll(".reveal-word").forEach(w => {
    w.style.transform = "translateY(0)";
    w.style.opacity = "1";
  });

  document.querySelectorAll(".build-line").forEach(line => {
    line.textContent = line.getAttribute("data-final");
  });

} else {

  runCompileSequence();

}


/* =========================================
   SKILL PROFICIENCY BARS
========================================= */

const fills = document.querySelectorAll(".proficiency-fill");

const fillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute("data-width");
      fillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

fills.forEach(fill => fillObserver.observe(fill));


/* =========================================
   CHANGELOG ACCORDION
========================================= */

document.querySelectorAll(".log-header").forEach(header => {

  header.addEventListener("click", () => {

    const entry = header.closest(".log-entry");
    const wasOpen = entry.classList.contains("open");

    document.querySelectorAll(".log-entry").forEach(e => e.classList.remove("open"));

    if (!wasOpen) entry.classList.add("open");

  });

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursorDot = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

if (cursorDot && cursorRing && !prefersReducedMotion) {

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ring = { x: mouse.x, y: mouse.y };

  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
  });

  function animateRing() {
    ring.x += (mouse.x - ring.x) * 0.2;
    ring.y += (mouse.y - ring.y) * 0.2;
    cursorRing.style.left = ring.x + "px";
    cursorRing.style.top = ring.y + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, input, textarea").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorRing.style.width = "44px";
      cursorRing.style.height = "44px";
    });
    el.addEventListener("mouseleave", () => {
      cursorRing.style.width = "28px";
      cursorRing.style.height = "28px";
    });
  });

}


/* =========================================
   MAGNETIC BUTTONS
========================================= */

document.querySelectorAll(".btn").forEach(btn => {

  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });

});


/* =========================================
   EMAIL COPY
========================================= */

const emailCopy = document.getElementById("emailCopy");

if (emailCopy) {

  emailCopy.addEventListener("click", async () => {

    const email = emailCopy.getAttribute("data-email");
    const hint = emailCopy.querySelector(".copy-hint");
    const original = hint.textContent;

    try {
      await navigator.clipboard.writeText(email);
      hint.textContent = "copied to clipboard";
      hint.style.opacity = "1";
    } catch (err) {
      hint.textContent = "couldn't copy — email me directly";
    }

    setTimeout(() => {
      hint.textContent = original;
    }, 2000);

  });

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

  contactForm.addEventListener("submit", e => {

    e.preventDefault();

    const button = contactForm.querySelector(".submit-btn");
    const btnText = button.querySelector(".btn-text");

    button.disabled = true;
    btnText.textContent = "Sending...";
    formStatus.textContent = "";

    setTimeout(() => {

      btnText.textContent = "Send message";
      button.disabled = false;
      formStatus.textContent = "✓ Message sent — I'll reply within a day.";

      contactForm.reset();

      setTimeout(() => { formStatus.textContent = ""; }, 4000);

    }, 1100);

  });

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});


/* =========================================
   FOOTER YEAR
========================================= */

document.getElementById("year").textContent = new Date().getFullYear();