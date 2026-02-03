/* ===================================
   PRARAMBH 2026 - CLICK-TRIGGERED UX
   JavaScript for Toggle Mechanism
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================
    // NAVBAR SCROLL EFFECT
    // =====================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // =====================================
    // PARALLAX EFFECT (Desktop only)
    // =====================================
    const homeText = document.querySelector('.home-text');
    
    if (homeText && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxOffset = scrolled * 0.5;
            homeText.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
        });
    }
    
    // =====================================
    // EVENT CARDS - CLICK-TRIGGERED TOGGLE
    // =====================================
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        // Add close button to each card
        const closeBtn = document.createElement('button');
        closeBtn.className = 'event-close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close details');
        
        const eventBack = card.querySelector('.event-back');
        if (eventBack) {
            eventBack.insertBefore(closeBtn, eventBack.firstChild);
        }
        
        // Toggle on card click
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking close button or links
            if (e.target.closest('.event-close-btn') || e.target.tagName === 'A') {
                return;
            }
            
            // Close all other cards first
            eventCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active-details');
                }
            });
            
            // Toggle this card
            card.classList.toggle('active-details');
        });
        
        // Close button functionality
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            card.classList.remove('active-details');
        });
    });
    
    // =====================================
    // TEAM MEMBERS - CLICK-TRIGGERED TOGGLE
    // =====================================
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function(e) {
            // Close all other team members first
            teamMembers.forEach(otherMember => {
                if (otherMember !== member) {
                    otherMember.classList.remove('active-details');
                }
            });
            
            // Toggle this member
            member.classList.toggle('active-details');
        });
    });
    
    // =====================================
    // CLOSE ON OUTSIDE CLICK
    // =====================================
    document.addEventListener('click', function(e) {
        // Close event cards when clicking outside
        if (!e.target.closest('.event-card')) {
            eventCards.forEach(card => {
                card.classList.remove('active-details');
            });
        }
        
        // Close team members when clicking outside
        if (!e.target.closest('.team-member')) {
            teamMembers.forEach(member => {
                member.classList.remove('active-details');
            });
        }
    });
    
    // =====================================
    // CLOSE ON ESCAPE KEY
    // =====================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all active event cards
            eventCards.forEach(card => {
                card.classList.remove('active-details');
            });
            
            // Close all active team members
            teamMembers.forEach(member => {
                member.classList.remove('active-details');
            });
        }
    });
    
    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    if (revealElements.length > 0) {
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
    }
    
    // =====================================
    // SMOOTH SCROLL FOR NAVIGATION
    // =====================================
    const navLinks = document.querySelectorAll('.navbuttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =====================================
    // DUPLICATE SPONSOR ITEMS FOR INFINITE SCROLL
    // =====================================
    const sponsorList = document.querySelector('.sponsor-list');
    
    if (sponsorList) {
        const sponsorItems = Array.from(sponsorList.children);
        sponsorItems.forEach(item => {
            const clone = item.cloneNode(true);
            sponsorList.appendChild(clone);
        });
    }
    
    // =====================================
    // ACCESSIBILITY: Focus management
    // =====================================
    
    // Trap focus within active event card
    eventCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (!card.classList.contains('active-details')) return;
            
            if (e.key === 'Tab') {
                const focusableElements = card.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    });
    
    // =====================================
    // PERFORMANCE: Disable animations on reduced motion
    // =====================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-luxury', 'none');
        document.documentElement.style.setProperty('--transition-smooth', 'none');
    }
    
    // =====================================
    // MOBILE: Touch feedback
    // =====================================
    if ('ontouchstart' in window) {
        eventCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                card.style.opacity = '0.9';
            });
            
            card.addEventListener('touchend', function() {
                card.style.opacity = '1';
            });
        });
        
        teamMembers.forEach(member => {
            member.addEventListener('touchstart', function() {
                member.style.opacity = '0.9';
            });
            
            member.addEventListener('touchend', function() {
                member.style.opacity = '1';
            });
        });
    }
    
    console.log('🎭 Prarambh 2026 - Royal Goan Odyssey initialized successfully!');
});