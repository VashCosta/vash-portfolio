/* ==========================================================================
   VIVASH VEL C.S. — GSAP LUXURY CINEMATIC ANIMATION ENGINE v5.0
   - Powered by GSAP 3.12 & ScrollTrigger
   - Orchestrated Hero Entry & Scroll-Scrub Parallax Exit
   - Bi-directional 3D Spatial Section Warp-Ins & Staggered Reveals
   - Spring-Physics Magnetic Buttons & Interactive Glass Depth
   - Seamless Video -> Executive Portrait Crossfade (vash_suit.jpeg)
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
   1. Scroll Progress Bar
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
   2. GSAP Hero Entrance Sequence (Cinematic Orchestra)
   ------------------------------------------------------------------ */
function initGsapHeroEntry() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });

    // Top Navigation bar entrance
    tl.from('#main-nav', {
        y: -40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out'
    }, 0);

    // Hero background video / image scale-in
    tl.from('.hero-video-stage', {
        scale: 1.06,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out'
    }, 0.1);

    // Hero Badge
    tl.from('.hero-badge-container', {
        y: 25,
        opacity: 0,
        scale: 0.92,
        duration: 0.75
    }, 0.3);

    // Headline: VIVASH VEL C.S. staggered word reveal
    tl.from('.hero-headline .name-first, .hero-headline .name-middle, .hero-headline .name-last', {
        y: 45,
        opacity: 0,
        rotationX: -12,
        stagger: 0.1,
        duration: 1.0,
        ease: 'power4.out'
    }, 0.45);

    // Roles Rotator
    tl.from('.hero-roles-cycler', {
        y: 25,
        opacity: 0,
        duration: 0.8
    }, 0.7);

    // Manifesto description
    tl.from('.hero-manifesto', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, 0.85);

    // CTA Button Group
    tl.from('.hero-cta-group .btn', {
        y: 28,
        opacity: 0,
        scale: 0.94,
        stagger: 0.12,
        duration: 0.85,
        ease: 'back.out(1.3)'
    }, 1.0);

    // Metrics Bar
    tl.from('.hero-metrics-strip .metric-block, .hero-metrics-strip .metric-sep', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75
    }, 1.15);

    // Sound toggle button
    tl.from('#video-sound-btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)'
    }, 1.25);
}

/* ------------------------------------------------------------------
   3. GSAP ScrollTrigger Effects & Parallax (Bi-directional Luxury)
   ------------------------------------------------------------------ */
function initGsapScrollEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // ── Section Headers Cinematic Reveal ──
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            y: 35,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // ── Spatial Project Carousel (Slide-in & Elevation) ──
    const projWrapper = document.querySelector('.projects-carousel-wrapper');
    if (projWrapper) {
        gsap.from(projWrapper, {
            scrollTrigger: {
                trigger: projWrapper,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out'
        });
    }

    // ── Experience Timeline Entries ──
    gsap.utils.toArray('.timeline-entry').forEach(entry => {
        gsap.from(entry, {
            scrollTrigger: {
                trigger: entry,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // ── Skills Category Blocks & Pills Stagger ──
    gsap.utils.toArray('.skill-category-block').forEach(block => {
        const pills = block.querySelectorAll('.skill-pill-item');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: block,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(block, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out'
        })
        .from(pills, {
            scale: 0.8,
            opacity: 0,
            stagger: 0.03,
            duration: 0.4,
            ease: 'back.out(1.4)'
        }, '-=0.3');
    });

    // ── Credentials / Education / Pillar / Skill Cards ──
    gsap.utils.toArray('.cert-card, .cert-glass-card, .pillar-card, .edu-featured-card, .edu-card, .edu-secondary-card, .contact-card, .skills-col-card, .skill-row-item').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            scale: 0.98,
            duration: 0.7,
            ease: 'power3.out'
        });
    });

    // Refresh ScrollTrigger after assets load
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
}

/* ------------------------------------------------------------------
   4. Physics-Driven Magnetic Elements (GSAP quickTo)
   ------------------------------------------------------------------ */
function initGsapMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches || typeof gsap === 'undefined') return;

    document.querySelectorAll('.magnetic-btn, .nav-cta-btn, .social-link-btn').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3.out' });

        btn.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = (e.clientX - (left + width / 2)) * 0.35;
            const y = (e.clientY - (top + height / 2)) * 0.35;
            xTo(x);
            yTo(y);
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1.2, 0.4)' });
        });
    });
}

/* ------------------------------------------------------------------
   5. Video & Audio System (Smart Global Audio Unlock & Full Control)
   ------------------------------------------------------------------ */
function initVideoSystem() {
    const video    = document.getElementById('hero-bg-video');
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

    // Attempt unmuted autoplay immediately
    video.muted = false;
    video.play().then(() => {
        enableSound();
        soundUnlocked = true;
    }).catch(() => {
        // Autoplay policy prevented audio: start muted, listen for first user touch
        video.muted = true;
        video.play().catch(() => {});
        disableSound();
    });

    // Auto-unmute on first user interaction anywhere on the viewport
    const unlockAudioOnInteraction = () => {
        if (soundUnlocked) return;
        if (sessionStorage.getItem('vivash_explicit_mute') === '1') return;

        video.muted = false;
        video.volume = 1.0;
        enableSound();
        soundUnlocked = true;

        ['click', 'touchstart', 'keydown'].forEach(evt => {
            window.removeEventListener(evt, unlockAudioOnInteraction);
        });
    };

    ['click', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAudioOnInteraction, { once: true, passive: true });
    });

    // Sound toggle button click
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            soundUnlocked = true;

            if (video.muted) {
                sessionStorage.removeItem('vivash_explicit_mute');
                enableSound();
                if (video.ended) {
                    const bgImg = document.getElementById('hero-bg-img');
                    if (bgImg) bgImg.style.opacity = '0';
                    video.style.display = '';
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

    // Video end -> smooth crossfade to hero-bg-img (vash_suit.jpeg) with 100% head visibility
    video.addEventListener('ended', () => {
        sessionStorage.setItem('vivash_video_done', '1');
        const bgImg = document.getElementById('hero-bg-img');
        if (bgImg) bgImg.style.opacity = '1';
        video.style.transition = 'opacity 1.8s ease';
        video.style.opacity    = '0';
        setTimeout(() => {
            video.style.display = 'none';
        }, 1900);
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
   7. Scrollspy & Mobile Navigation
   ------------------------------------------------------------------ */
function initScrollspyAndNav() {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle    = document.getElementById('mobile-toggle');
    const navLinksWrapper = document.getElementById('nav-links');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const id = e.target.id;
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
            }
        });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

    sections.forEach(s => obs.observe(s));

    if (mobileToggle && navLinksWrapper) {
        mobileToggle.addEventListener('click', () => {
            const open = navLinksWrapper.classList.toggle('mobile-open');
            mobileToggle.setAttribute('aria-expanded', open);
        });
        navLinks.forEach(l => l.addEventListener('click', () => {
            navLinksWrapper.classList.remove('mobile-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }));
    }
}

/* ------------------------------------------------------------------
   8. Contact Form (Direct Delivery to Personal Email vivashvel2019@gmail.com)
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
            // Attempt direct AJAX transmission to personal email via FormSubmit API
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
                feedback.innerHTML = `✓ <strong>Secure Transmission Confirmed</strong>. Thank you, <strong>${name}</strong>. Your message and credentials have been routed directly to Vivash. Encrypted confirmation logged — response expected within 24 hours.`;
                feedback.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Direct endpoint response error');
            }
        } catch (err) {
            // Reliable client fallback to mailto if network or adblock blocks AJAX
            feedback.className = 'form-feedback-message success';
            feedback.innerHTML = `✓ <strong>Routing via Secure Mail Client</strong>. Launching your email composer to transmit your credentials to Vivash...`;
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
   9. Resume Modal
   ------------------------------------------------------------------ */
window.openResumeModal = () => {
    const m = document.getElementById('resume-modal');
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

window.closeResumeModal = () => {
    const m = document.getElementById('resume-modal');
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

function initModalEvents() {
    const m = document.getElementById('resume-modal');
    if (!m) return;
    m.addEventListener('click', e => { if (e.target === m) closeResumeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) closeResumeModal(); });
}

/* ------------------------------------------------------------------
   10. Projects Collection Slider (Swipe Left & Track Drag)
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
        
        // Update Indicator
        if (ind) {
            const formatted = (currentProjectIndex + 1 < 10 ? '0' : '') + (currentProjectIndex + 1);
            const total = (slides.length < 10 ? '0' : '') + slides.length;
            ind.textContent = `${formatted} / ${total}`;
        }

        // Update Active Tag
        if (tag && slides[currentProjectIndex]) {
            tag.textContent = slides[currentProjectIndex].getAttribute('data-tag') || 'FEATURED';
        }

        // Update Dots
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === currentProjectIndex);
        });

        // Update Progress Bar
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
            const cardWidth = slides[0].offsetWidth + 32; // card + gap
            const activeIdx = Math.round(scrollLeft / cardWidth);
            updateActiveState(activeIdx);
        }, 60);
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

        // Ensure horizontal intent
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
            if (diffX < 0) {
                // Swiped Left -> Go Next
                window.nextProject();
            } else {
                // Swiped Right -> Go Prev
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

    // Initial state
    updateActiveState(0);
}
