/* ==========================================================================
   VIVASH VEL C.S. — GSAP LUXURY CINEMATIC ANIMATION ENGINE v5.5
   - Powered by GSAP 3.12 & ScrollTrigger
   - Orchestrated Hero Entry with clearProps safety
   - Full-Screen Mobile Drawer & Animated Hamburger Engine
   - Physics Magnetic Buttons & Smooth Touch Swipe Slider
   - Cross-Platform Video Autoplay & Smooth Audio Unlock
   ========================================================================== */

// Register GSAP plugins
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------
   ENTRY POINT
   ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initVideoSystem();
    initGsapHeroEntry();
    initGsapScrollEffects();
    initGsapMagnetic();
    initHeroRolesRotator();
    initProjectsCollectionSlider();
    initScrollspyAndNav();
    initContactForm();
    initModalEvents();
});

/* ------------------------------------------------------------------
   1. Scroll Progress Bar & Nav Scroll States
   ------------------------------------------------------------------ */
function initScrollProgressBar() {
    const prog = document.getElementById('scroll-progress');
    const nav  = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        if (prog && docH > 0) {
            prog.style.width = Math.min(100, (scrollY / docH) * 100) + '%';
        }
        if (nav) {
            nav.classList.toggle('scrolled', scrollY > 20);
        }
    }, { passive: true });
}

/* ------------------------------------------------------------------
   2. GSAP Hero Entrance Sequence (With full clearProps safety)
   ------------------------------------------------------------------ */
function initGsapHeroEntry() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.05,
        onComplete: () => {
            // Restore all default CSS styles to ensure 100% responsiveness & no stuck styles
            gsap.set('#main-nav, .hero-video-stage, .hero-badge-container, .hero-headline, .hero-roles-cycler, .hero-manifesto, .hero-cta-group, .hero-cta-group .btn, #hero-work-btn, #hero-resume-btn, .hero-metrics-strip, #video-sound-btn', {
                clearProps: 'transform,opacity,visibility,scale'
            });
        }
    });

    // Top Navigation bar entrance
    tl.from('.floating-nav', {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, 0);

    // Hero background video / image scale-in
    tl.from('.hero-video-stage', {
        scale: 1.04,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
    }, 0.05);

    // Hero Badge
    tl.from('.hero-badge-container', {
        y: 15,
        opacity: 0,
        duration: 0.4
    }, 0.1);

    // Headline: VIVASH VEL C.S.
    tl.from('.hero-headline .name-first, .hero-headline .name-middle, .hero-headline .name-last', {
        y: 25,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power4.out'
    }, 0.15);

    // Roles Rotator
    tl.from('.hero-roles-cycler', {
        y: 15,
        opacity: 0,
        duration: 0.4
    }, 0.25);

    // Manifesto description
    tl.from('.hero-manifesto', {
        y: 15,
        opacity: 0,
        duration: 0.4
    }, 0.3);

    // CTA Button Group
    tl.from('.hero-cta-group .btn', {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'back.out(1.2)'
    }, 0.35);

    // Metrics Bar
    tl.from('.hero-metrics-strip .metric-block, .hero-metrics-strip .metric-sep', {
        y: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4
    }, 0.45);

    // Sound toggle button
    tl.from('#video-sound-btn', {
        scale: 0.85,
        opacity: 0,
        duration: 0.45,
        ease: 'back.out(1.4)'
    }, 0.5);
}

/* ------------------------------------------------------------------
   3. GSAP ScrollTrigger Effects & Parallax
   ------------------------------------------------------------------ */
function initGsapScrollEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // Section Headers Reveal
    gsap.utils.toArray('.section-header-cinematic').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all'
        });
    });

    // Experience Timeline Entries
    gsap.utils.toArray('.timeline-entry').forEach(entry => {
        gsap.from(entry, {
            scrollTrigger: {
                trigger: entry,
                start: 'top 88%',
                toggleActions: 'play none none none',
                once: true
            },
            x: -25,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all'
        });
    });

    // Cards (Profile, Pillars, Certifications, Education, Contact)
    gsap.utils.toArray('.glass-panel, .spatial-glass-card, .pillar-card, .cert-glass-card, .channel-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'all'
        });
    });

    // Refresh ScrollTrigger after full page assets load
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
}

/* ------------------------------------------------------------------
   4. Physics-Driven Magnetic Elements (Desktop Only)
   ------------------------------------------------------------------ */
function initGsapMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches || typeof gsap === 'undefined') return;

    document.querySelectorAll('.magnetic-btn, .nav-cta-btn').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3.out' });

        btn.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = (e.clientX - (left + width / 2)) * 0.3;
            const y = (e.clientY - (top + height / 2)) * 0.3;
            xTo(x);
            yTo(y);
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' });
        });
    });
}

/* ------------------------------------------------------------------
   5. Video & Audio System (Smooth Mobile & Desktop Playback + Seamless Audio)
   ------------------------------------------------------------------ */
function initVideoSystem() {
    const video    = document.getElementById('hero-bg-video');
    const bgImg    = document.getElementById('hero-bg-img');
    const soundBtn = document.getElementById('video-sound-btn');
    const iconOff  = document.getElementById('sound-icon-off');
    const iconOn   = document.getElementById('sound-icon-on');
    const label    = document.getElementById('sound-label');

    if (!video) return;

    video.loop   = false;
    video.volume = 1.0;

    let soundUnlocked = false;

    const enableSound = () => {
        video.muted = false;
        video.volume = 1.0;
        if (iconOff) iconOff.style.display = 'none';
        if (iconOn)  iconOn.style.display  = 'inline-flex';
        if (label)   label.textContent     = 'SOUND ON';
        if (soundBtn) soundBtn.classList.add('is-on');
        sessionStorage.setItem('vivash_sound_state', 'on');
    };

    const disableSound = () => {
        video.muted = true;
        if (iconOff) iconOff.style.display = 'inline-flex';
        if (iconOn)  iconOn.style.display  = 'none';
        if (label)   label.textContent     = 'SOUND OFF';
        if (soundBtn) soundBtn.classList.remove('is-on');
        sessionStorage.setItem('vivash_sound_state', 'off');
    };

    // Transition smoothly to executive portrait image (vash_suit.jpeg)
    const transitionToPortrait = () => {
        sessionStorage.setItem('vivash_video_done', '1');
        if (bgImg) {
            bgImg.style.opacity = '1';
        }
        video.style.transition = 'opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        video.style.opacity    = '0';
        setTimeout(() => {
            if (video.style.opacity === '0') {
                video.style.display = 'none';
            }
        }, 1600);
    };

    // 1. Guaranteed smooth autoplay: Start muted to prevent mobile browser pipeline rejection
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            if (sessionStorage.getItem('vivash_sound_state') === 'on' && sessionStorage.getItem('vivash_explicit_mute') !== '1') {
                enableSound();
                soundUnlocked = true;
            } else {
                disableSound();
            }
        }).catch(() => {
            video.muted = true;
            video.play().catch(() => {
                transitionToPortrait();
            });
            disableSound();
        });
    }

    // 2. Anti-Stall & Freeze Protection Watchdog
    video.addEventListener('waiting', () => {
        if (!video.ended && video.paused) {
            video.play().catch(() => {});
        }
    });

    video.addEventListener('stalled', () => {
        if (!video.ended && video.paused) {
            video.play().catch(() => {});
        }
    });

    video.addEventListener('error', () => {
        transitionToPortrait();
    });

    // 3. Auto-unmute on first user interaction anywhere on the viewport
    const unlockAudioOnInteraction = (e) => {
        if (soundUnlocked) return;
        if (sessionStorage.getItem('vivash_explicit_mute') === '1') return;

        if (e && e.target && (soundBtn && (soundBtn === e.target || soundBtn.contains(e.target)))) {
            return;
        }

        video.muted = false;
        video.volume = 1.0;
        enableSound();
        soundUnlocked = true;

        ['click', 'touchstart', 'touchend', 'keydown'].forEach(evt => {
            window.removeEventListener(evt, unlockAudioOnInteraction);
        });
    };

    ['click', 'touchstart', 'touchend', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAudioOnInteraction, { once: true, passive: true });
    });

    // 4. Sound toggle button click
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            soundUnlocked = true;

            if (video.muted || video.ended || video.style.display === 'none') {
                sessionStorage.removeItem('vivash_explicit_mute');
                enableSound();
                
                if (video.ended || video.style.display === 'none' || video.style.opacity === '0') {
                    if (bgImg) bgImg.style.opacity = '0';
                    video.style.display = 'block';
                    video.style.transition = 'opacity 0.6s ease';
                    video.style.opacity = '1';
                    video.currentTime = 0;
                }
                video.play().catch(() => {});
            } else {
                sessionStorage.setItem('vivash_explicit_mute', '1');
                disableSound();
            }
        });
    }

    // 5. Video ended -> Smooth crossfade to executive portrait image
    video.addEventListener('ended', () => {
        transitionToPortrait();
    });
}

/* ------------------------------------------------------------------
   6. Hero Roles Rotator
   ------------------------------------------------------------------ */
function initHeroRolesRotator() {
    const roles = document.querySelectorAll('.role-rotator .role-item');
    if (roles.length > 0) {
        let i = 0;
        setInterval(() => {
            roles[i].classList.remove('active');
            i = (i + 1) % roles.length;
            roles[i].classList.add('active');
        }, 3000);
    }
}

/* ------------------------------------------------------------------
   7. Scrollspy & Mobile Navigation Drawer (Luxury Polish)
   ------------------------------------------------------------------ */
function initScrollspyAndNav() {
    const navLinks        = document.querySelectorAll('.nav-item');
    const sections        = document.querySelectorAll('section[id]');
    const mobileToggle    = document.getElementById('mobile-toggle');
    const navLinksWrapper = document.getElementById('nav-links');
    const mainNav         = document.getElementById('main-nav');

    // Scrollspy Observer
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => obs.observe(s));

    // Mobile Menu Toggle Function
    const closeMobileMenu = () => {
        if (!navLinksWrapper) return;
        navLinksWrapper.classList.remove('mobile-open');
        if (mobileToggle) {
            mobileToggle.classList.remove('is-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('nav-locked');
    };

    const openMobileMenu = () => {
        if (!navLinksWrapper) return;
        navLinksWrapper.classList.add('mobile-open');
        if (mobileToggle) {
            mobileToggle.classList.add('is-active');
            mobileToggle.setAttribute('aria-expanded', 'true');
        }
        document.body.classList.add('nav-locked');
    };

    if (mobileToggle && navLinksWrapper) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinksWrapper.classList.contains('mobile-open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close on nav link click
        navLinks.forEach(l => l.addEventListener('click', () => {
            closeMobileMenu();
        }));

        // Close when clicking outside of nav
        document.addEventListener('click', (e) => {
            if (navLinksWrapper.classList.contains('mobile-open')) {
                if (mainNav && !mainNav.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinksWrapper.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        });

        // Auto-close when resizing above tablet breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 868 && navLinksWrapper.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        });
    }
}

/* ------------------------------------------------------------------
   8. Contact Form (Direct Delivery via FormSubmit API + Mailto Fallback)
   ------------------------------------------------------------------ */
function initContactForm() {
    const form     = document.getElementById('cinematic-contact-form');
    const feedback = document.getElementById('form-feedback');
    const submit   = document.getElementById('submit-btn');
    if (!form || !feedback || !submit) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name        = document.getElementById('user-name')?.value.trim();
        const email       = document.getElementById('user-email')?.value.trim();
        const org         = document.getElementById('user-org')?.value.trim() || 'Not specified';
        const credentials = document.getElementById('user-credentials')?.value.trim() || 'Not provided';
        const subject     = document.getElementById('user-subject')?.value.trim();
        const message     = document.getElementById('user-message')?.value.trim();

        if (!name || !email || !subject || !message) {
            feedback.className   = 'form-feedback-message error';
            feedback.textContent = 'Please fill in all required fields marked with *';
            feedback.style.display = 'block';
            return;
        }

        submit.disabled = true;
        submit.innerHTML = '<span class="btn-text">TRANSMITTING SECURELY...</span>';

        const payload = {
            name: name,
            email: email,
            organization: org,
            credentials_url: credentials,
            subject: `[Portfolio Inquiry] ${subject}`,
            message: message,
            _replyto: email,
            _subject: `Portfolio Message from ${name}: ${subject}`,
            _template: 'table'
        };

        try {
            const response = await fetch('https://formsubmit.co/ajax/vivashvel2019@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                feedback.className = 'form-feedback-message success';
                feedback.innerHTML = `✓ <strong>Secure Transmission Confirmed</strong>. Thank you, <strong>${name}</strong>. Your message and credentials have been routed directly to Vivash. Confirmation logged — response expected within 24 hours.`;
                feedback.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Direct endpoint response error');
            }
        } catch (err) {
            feedback.className = 'form-feedback-message success';
            feedback.innerHTML = `✓ <strong>Routing via Secure Mail Client</strong>. Launching your email composer to transmit your inquiry to Vivash...`;
            feedback.style.display = 'block';

            const mailBody = `Hello Vivash,

${message}

--- SENDER CREDENTIALS ---
Name: ${name}
Email: ${email}
Organization/Role: ${org}
Profile/Portfolio: ${credentials}
--------------------------`;

            setTimeout(() => {
                window.location.href = `mailto:vivashvel2019@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent(mailBody)}`;
                form.reset();
            }, 600);
        } finally {
            submit.disabled = false;
            submit.innerHTML = `
                <span class="btn-text">TRANSMIT SECURE INQUIRY</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
        }
    });
}

/* ------------------------------------------------------------------
   9. Resume Modal System
   ------------------------------------------------------------------ */
window.openResumeModal = () => {
    const m = document.getElementById('resume-modal');
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-locked');
};

window.closeResumeModal = () => {
    const m = document.getElementById('resume-modal');
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-locked');
};

function initModalEvents() {
    const m = document.getElementById('resume-modal');
    if (!m) return;
    m.addEventListener('click', e => { if (e.target === m) closeResumeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) closeResumeModal(); });
}

/* ------------------------------------------------------------------
   10. Projects Collection Slider (Swipe & Touch Tracking)
   ------------------------------------------------------------------ */
let currentProjectIndex = 0;

function initProjectsCollectionSlider() {
    const track = document.getElementById('projects-slider-track');
    const slides = document.querySelectorAll('.project-slide-item');
    if (!track || slides.length === 0) return;

    const ind = document.getElementById('project-current-indicator');
    const tag = document.getElementById('project-active-tag');
    const prog = document.getElementById('proj-progress-bar');
    const dots = document.querySelectorAll('.proj-dot');

    function updateActiveState(idx) {
        currentProjectIndex = Math.max(0, Math.min(idx, slides.length - 1));
        
        if (ind) {
            const formatted = (currentProjectIndex + 1 < 10 ? '0' : '') + (currentProjectIndex + 1);
            const total = (slides.length < 10 ? '0' : '') + slides.length;
            ind.textContent = `${formatted} / ${total}`;
        }

        if (tag && slides[currentProjectIndex]) {
            tag.textContent = slides[currentProjectIndex].getAttribute('data-tag') || 'FEATURED';
        }

        dots.forEach((d, i) => {
            d.classList.toggle('active', i === currentProjectIndex);
        });

        if (prog) {
            prog.style.width = `${((currentProjectIndex + 1) / slides.length) * 100}%`;
        }
    }

    window.goToProject = (index) => {
        if (!slides[index]) return;
        currentProjectIndex = index;
        slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        updateActiveState(index);
    };

    window.nextProject = () => {
        const next = (currentProjectIndex + 1) % slides.length;
        window.goToProject(next);
    };

    window.prevProject = () => {
        const prev = (currentProjectIndex - 1 + slides.length) % slides.length;
        window.goToProject(prev);
    };

    // Scroll Observer for Natural Scrolling / Swiping
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = track.scrollLeft;
            const cardWidth = slides[0].offsetWidth + 28;
            const activeIdx = Math.round(scrollLeft / cardWidth);
            updateActiveState(activeIdx);
        }, 50);
    }, { passive: true });

    // Touch Swipe Left/Right Gesture Handlers
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
            if (diffX < 0) {
                window.nextProject();
            } else {
                window.prevProject();
            }
        }
    }, { passive: true });

    // Mouse Drag to Swipe
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('is-dragging');
    });

    track.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('is-dragging');
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    // Keyboard Arrow Navigation
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            window.nextProject();
        } else if (e.key === 'ArrowLeft') {
            window.prevProject();
        }
    });

    updateActiveState(0);
}
