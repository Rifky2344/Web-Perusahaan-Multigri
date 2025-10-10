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

    // --- WhatsApp Button Animation ---
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        // Efek bounce saat hover
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'whatsappPulse 2s infinite';
        });

        // Analytics tracking (opsional)
        whatsappBtn.addEventListener('click', function() {
            // Bisa ditambahkan Google Analytics tracking di sini
            console.log('WhatsApp button clicked');
        });
    }

    // --- Fungsionalitas Kirim Email dengan EmailJS ---
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("tmhohe5EAqWR6WlKM");
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS library not loaded');
    }

    // Function untuk mengirim email
    function sendEmail(event) {
        event.preventDefault();
        console.log('Form submitted');
        
        // Validasi form
        const form = event.target;
        const formData = new FormData(form);
        
        // Cek apakah semua field required terisi
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
            return;
        }
        
        // Loading state
        const submitBtn = form.querySelector('.btn-warning');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Template parameters untuk EmailJS
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            phone: formData.get('phone') || 'Tidak disediakan',
            topic: formData.get('topic'),
            message: formData.get('message'),
            to_name: 'Multigri Pillar Utama',
            reply_to: formData.get('from_email')
        };
        
        console.log('Sending email with params:', templateParams);
        
        // Send email using EmailJS
        emailjs.send('service_9xej466', 'template_xyz123', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Success message
                showNotification('Pesan berhasil dikirim! Terima kasih atas kepercayaan Anda. Kami akan segera menghubungi Anda kembali.', 'success');
                
                // Reset form
                form.reset();
                
                // Remove validation classes
                form.querySelectorAll('.is-invalid').forEach(field => {
                    field.classList.remove('is-invalid');
                });
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Error message
                showNotification('Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung melalui WhatsApp/telepon.', 'error');
                
            }).finally(function() {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }

    // Function untuk menampilkan notifikasi
    function showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 7 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 7000);
    }

    // Attach event listener ke form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
        console.log('Contact form event listener attached');
    } else {
        console.log('Contact form not found');
    }
});