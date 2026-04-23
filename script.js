/* Reveal */
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Progress Bar */
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    document.getElementById("progress-bar").style.width =
        (scrollTop / scrollHeight) * 100 + "%";
});

/* Active Nav */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-center a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 150) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* Typing */
const texts = ["AI Engineer","Machine Learning Developer","IoT Innovator"];
let i = 0, j = 0;
const typingEl = document.getElementById("typing");

function typeEffect() {
    if (i === texts.length) i = 0;
    typingEl.textContent = texts[i].slice(0, ++j);
    if (j === texts[i].length) {
        setTimeout(() => { j = 0; i++; }, 1500);
    }
    setTimeout(typeEffect, 100);
}
typeEffect();

/* Skill Animation */
window.addEventListener("scroll", () => {
    document.querySelectorAll(".bar span").forEach(bar => {
        bar.style.width = bar.dataset.width;
    });
});

/* 3D Photo Tilt */
const heroImg = document.querySelector(".hero-left img");

heroImg.addEventListener("mousemove", e => {
    const rect = heroImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 20;
    const rotateY = ((x / rect.width) - 0.5) * -20;

    heroImg.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

heroImg.addEventListener("mouseleave", () => {
    heroImg.style.transform = "rotateX(0) rotateY(0)";
});

/* Cursor Glow */
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});

/* Light/Dark Toggle */
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggle.textContent =
        document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});
/* ================= FORM VALIDATION ================= */

const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    inputs.forEach(input => {

        if (input.value.trim() === "") {
            input.classList.add("error");
            input.classList.remove("valid");
            valid = false;
        } else {
            input.classList.remove("error");
            input.classList.add("valid");
        }

    });

    if (valid) {
        form.reset();
        inputs.forEach(input => input.classList.remove("valid"));
        alert("Message Sent Successfully 🚀");
    }
});
/* ================= PARTICLE BACKGROUND ================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3;
        this.speedX = (Math.random() - 0.5);
        this.speedY = (Math.random() - 0.5);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "#00f2ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

/* ================= ADD HOLOGRAM SCAN LINE ================= */

const heroLeft = document.querySelector(".hero-left");
const scan = document.createElement("span");
scan.classList.add("scan-line");
heroLeft.appendChild(scan);