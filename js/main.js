// South Course Landscaping - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Add fade-in class to sections and cards FIRST
    document.querySelectorAll('.section').forEach((section, index) => {
        if (!section.classList.contains('hero')) {
            section.classList.add('fade-in');
            section.style.transitionDelay = `${index * 0.1}s`;
        }
    });
    document.querySelectorAll('.card, .area-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Smooth Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Header Background on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(26, 58, 46, 0.98)';
        } else {
            header.style.background = 'rgba(26, 58, 46, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active Navigation Link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinksItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === '/' && currentPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Enhancement
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic form validation
            const requiredFields = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Add loading states for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Sending...';
                this.disabled = true;
                
                // Re-enable after 3 seconds (in case of mailto)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 3000);
            }
        });
    });
    
    // Enhance card hover effects
    document.querySelectorAll('.card, .area-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
});

// fade-in setup moved to DOMContentLoaded