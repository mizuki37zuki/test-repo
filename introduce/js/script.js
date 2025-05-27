// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('header nav');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                // e.preventDefault(); // Keep default behavior to update URL hash
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
            // Close hamburger menu if open
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburgerMenu.classList.remove('open');
            }
        });
    });

    // Highlight active nav link on scroll
    function highlightNavLink() {
        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Add a small offset
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call

    // Hamburger menu toggle
    if (hamburgerMenu && nav) {
        hamburgerMenu.addEventListener('click', () => {
            nav.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
        });
    }

    // Contact form submission (basic placeholder)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real scenario, you would send this data to a server.
            // For now, just log it and show an alert.
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if(name && email && message) {
                console.log('Form Submitted:', { name, email, message });
                alert('メッセージありがとうございます！内容を確認し、追ってご連絡いたします。');
                contactForm.reset();
            } else {
                alert('すべての項目を入力してください。');
            }
        });
    }
});