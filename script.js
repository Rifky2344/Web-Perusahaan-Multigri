document.addEventListener('DOMContentLoaded', function () {
    // --- Fungsionalitas Hamburger Menu ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Menutup menu saat link di dalam menu diklik (berguna untuk navigasi di halaman yang sama)
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Fungsionalitas Tombol "Back to Top" ---
    const backToTopButton = document.getElementById("backToTopBtn");

    if (backToTopButton) {
        // Tampilkan tombol saat user scroll ke bawah sejauh 300px
        window.onscroll = function () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        };

        // Scroll ke atas saat tombol diklik
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Fungsionalitas Smooth Scrolling untuk Anchor Links ---
    // Catatan: Ini sebagai fallback jika `scroll-behavior: smooth` di CSS tidak didukung browser lama.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Cek jika link tidak hanya '#'
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();

                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Scroll Reveal Animations (for .reveal*) ---
    const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom');
    if (revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        revealEls.forEach(el => io.observe(el));
    }
});