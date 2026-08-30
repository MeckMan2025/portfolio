// Fade in elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    document.querySelectorAll('.project-card, .about-card, .contact-card, .ai-card, .ai-philosophy').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Live visit count for the APHUG tool (public GoatCounter counter, CORS-enabled).
fetch('https://n1c0l3zcr3at10nz.goatcounter.com/counter/TOTAL.json')
  .then(r => r.json())
  .then(d => {
    var c = document.getElementById('gc-count');
    var u = document.getElementById('gc-unique');
    if (c) c.textContent = Number(d.count).toLocaleString();
    if (u) u.textContent = Number(d.count_unique).toLocaleString();
  })
  .catch(function(){});
