const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
                
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
            });
        }
    });
});

const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    }
    else {
        backToTopButton.classList.remove('show');
        }
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
            
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelector('input[placeholder="Subject"]').value;
    const message = this.querySelector('textarea').value;
            
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    this.reset();
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    if (localStorage.getItem("theme") === "light" || 
        (window.matchMedia('(prefers-color-scheme: light)').matches && !localStorage.getItem("theme"))) {
        body.classList.add("light-theme");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme");

        if (body.classList.contains("light-theme")) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "light");
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "dark");
        }
    });

// google sheet integration

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://script.google.com/macros/s/AKfycbzJW8MAHJPk9B5FKRIQB6hzHCVvmkZCmXegr1a2eAE7BMixD4txHJYAsA3W-tuoRqF7TQ/exec", {
    method: "POST",
    body: new FormData(this),
})
    .then((response) => response.text())
    .then((data) => {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
})
    .catch((error) => {
        console.error("Error!", error.message);
    });
});