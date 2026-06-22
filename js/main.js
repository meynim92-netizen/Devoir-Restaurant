document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        nav.querySelector('.nav-list').classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.querySelector('.nav-list').classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Menu tabs filtering
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonials slider
    const track = document.querySelector('.testimonials-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    let slidesToShow = 3;
    
    // Create dots
    const totalSlides = Math.ceil(testimonials.length / slidesToShow);
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.testimonial-dots span');
    
    function updateSlider() {
        const slideWidth = testimonials[0].clientWidth + 30;
        track.style.transform = `translateX(-${currentSlide * slideWidth} * ${slidesToShow})`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance slider
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Reservation form
    const reservationForm = document.getElementById('reservationForm');
    
    // Set min date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        if (!name || !email || !phone || !date || !time || !guests) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        
        // Show success message
        alert(`Merci ${name} ! Votre réservation a été envoyée.\n\nDétails:\n- Date: ${date}\n- Heure: ${time}\n- Personnes: ${guests}\n\nNous vous contacterons bientôt pour confirmer.`);
        
        reservationForm.reset();
    });

    // Add to cart buttons
    const addButtons = document.querySelectorAll('.btn-add');
    
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const dishName = menuItem.querySelector('h3').textContent;
            const price = menuItem.querySelector('.menu-price').textContent;
            
            // Animation
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'var(--success)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i>';
                this.style.background = '';
            }, 2000);
            
            console.log(`Ajouté: ${dishName} - ${price}`);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.clientHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                alert('Merci de vous être abonné à notre newsletter !');
                emailInput.value = '';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to elements
    document.querySelectorAll('.menu-item, .specialite-card, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Preload images
    const imageUrls = [
        'https://images.unsplash.com/photo-1504674202336-e1df85dd3949?w=1920',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=600'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    console.log('Savane Dorée - Restaurant Africain');
    console.log('Site chargé avec succès !');
});
