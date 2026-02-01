/* ===================================
   PRARAMBH 2026 - ROYAL GOAN ODYSSEY
   Complete Production-Ready JavaScript
   =================================== */

// =====================================
// NAVBAR FROSTED GLASS EFFECT
// =====================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add frosted glass effect after 50px scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =====================================
// HERO PARALLAX EFFECT
// =====================================
const homeText = document.querySelector('.home-text');
const homeVideo = document.querySelector('.home-video');

if (homeText) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        // Apply parallax offset to home text
        homeText.style.setProperty('--parallax-offset', `${scrolled * parallaxSpeed}px`);
        homeText.classList.add('parallax');
        
        // Slight zoom effect on video
        const scale = 1 + (scrolled * 0.0002);
        if (homeVideo && scrolled < window.innerHeight) {
            homeVideo.style.transform = `scale(${scale})`;
        }
    });
}

// =====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================
// INTERSECTION OBSERVER - SCROLL REVEAL
// =====================================
const revealSections = document.querySelectorAll('[data-reveal]');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Stagger animation for child elements
            const children = entry.target.querySelectorAll('.event-card, .team-member, .sponsor-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    requestAnimationFrame(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
            
            // Unobserve after revealing
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealSections.forEach(section => {
    revealOnScroll.observe(section);
});

// =====================================
// SPONSORS - INFINITE SCROLL ENHANCEMENT
// =====================================
const sponsorList = document.querySelector('.sponsor-list');

if (sponsorList) {
    // Clone sponsor items for seamless infinite scroll
    const sponsorItems = Array.from(sponsorList.children);
    
    // Clone each item and append to create continuous loop
    sponsorItems.forEach(item => {
        const clone = item.cloneNode(true);
        sponsorList.appendChild(clone);
    });
    
    // Pause animation on hover for individual items
    const allSponsors = document.querySelectorAll('.sponsor-item');
    
    allSponsors.forEach(sponsor => {
        sponsor.addEventListener('mouseenter', () => {
            sponsorList.style.animationPlayState = 'paused';
        });
        
        sponsor.addEventListener('mouseleave', () => {
            sponsorList.style.animationPlayState = 'running';
        });
    });
}

// =====================================
// PERFORMANCE OPTIMIZATIONS
// =====================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// =====================================
// PAGE LOAD ANIMATIONS
// =====================================
window.addEventListener('load', () => {
    // Fade in the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.institution, .event-intro, .event-logo, .event-title');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`;
    });
});

// =====================================
// CUSTOM CURSOR EFFECT (DESKTOP ONLY)
// =====================================
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #D4AF37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    // Smooth cursor follow
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Expand on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .event-card, .team-member, .sponsor-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#F4E5B5';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#D4AF37';
        });
    });
};

// Enable custom cursor on desktop only
if (window.innerWidth > 768) {
    createCustomCursor();
}

// =====================================
// MOBILE MENU TOGGLE
// =====================================
if (window.innerWidth <= 768) {
    const navbar = document.querySelector('.navbar');
    const navButtons = document.querySelector('.navbuttons');
    
    // Create hamburger menu
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        position: fixed;
        top: 1.5rem;
        right: 5%;
        z-index: 1001;
    `;
    
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.cssText = `
            width: 30px;
            height: 3px;
            background: #D4AF37;
            transition: all 0.3s ease;
        `;
    });
    
    navbar.appendChild(hamburger);
    
    hamburger.addEventListener('click', () => {
        navButtons.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
        
        if (navButtons.classList.contains('mobile-active')) {
            navButtons.style.cssText = `
                display: flex;
                flex-direction: column;
                position: fixed;
                top: 0;
                right: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 26, 51, 0.98);
                backdrop-filter: blur(20px);
                align-items: center;
                justify-content: center;
                gap: 2rem;
            `;
            
            // Animate hamburger to X
            spans[0].style.transform = 'rotate(45deg) translateY(9px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
        } else {
            navButtons.style.display = 'none';
            
            // Reset hamburger
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.navbuttons a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navButtons.classList.remove('mobile-active');
            navButtons.style.display = 'none';
            hamburger.classList.remove('active');
            
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// =====================================
// CONSOLE EASTER EGG
// =====================================
console.log('%c🌊 PRARAMBH 2026 - Royal Goan Odyssey 🌊', 'color: #D4AF37; font-size: 24px; font-weight: bold; font-family: Cinzel, serif;');
console.log('%cExperience the heritage. Embrace the culture.', 'color: #F4E5B5; font-size: 14px; font-family: Montserrat, sans-serif;');
console.log('%cDeveloped with ❤️ by Prarambh Tech Team', 'color: #003366; font-size: 12px; font-style: italic;');

// =====================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#events';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: #D4AF37;
    color: #003366;
    padding: 1rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    z-index: 10000;
    transition: top 0.3s ease;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '1rem';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// =====================================
// LAZY LOADING FOR IMAGES
// =====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images that should be lazy loaded
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// =====================================
// PRELOADER (OPTIONAL)
// =====================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// =====================================
// NEON GLITCH INTENSITY CONTROL
// =====================================
const prarambhTitle = document.querySelector('.event-title h1');
const yearSpan = document.querySelector('.year');

if (prarambhTitle && yearSpan) {
    // Intensify glitch on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (scrolled < window.innerHeight) {
            const intensity = 1 + (scrolled / window.innerHeight);
            prarambhTitle.style.animationDuration = `${3 / intensity}s`;
            yearSpan.style.animationDuration = `${3 / intensity}s`;
        }
    });
}

// =====================================
// END OF SCRIPT
// =====================================
console.log('%c✨ All systems loaded successfully!', 'color: #D4AF37; font-weight: bold;');
