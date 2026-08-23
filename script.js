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

    // ── Spatial Project Cards (3D Slide-in & Elevation) ──
    gsap.utils.toArray('.spatial-project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            scale: 0.97,
            duration: 0.85,
            delay: (i % 2) * 0.1,
            ease: 'power3.out'
        });
    });

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

    // ── Credentials / Education / Pillar Cards ──
    gsap.utils.toArray('.cert-card, .pillar-card, .edu-featured-card, .edu-card, .contact-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 35,
            opacity: 0,
            scale: 0.97,
            duration: 0.75,
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
   8. Contact Form
   ------------------------------------------------------------------ */
function initContactForm() {
    const form     = document.getElementById('cinematic-contact-form');
    const feedback = document.getElementById('form-feedback');
    const submit   = document.getElementById('submit-btn');
    if (!form || !feedback || !submit) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name    = document.getElementById('user-name')?.value.trim();
        const email   = document.getElementById('user-email')?.value.trim();
        const subject = document.getElementById('user-subject')?.value.trim();
        const message = document.getElementById('user-message')?.value.trim();

        if (!name || !email || !subject || !message) {
            feedback.className   = 'form-feedback-message error';
            feedback.textContent = 'Please complete all required fields.';
            feedback.style.display = 'block';
            return;
        }

        submit.disabled = true;
        submit.innerHTML = '<span>DISPATCHING...</span>';

        setTimeout(() => {
            submit.disabled = false;
            submit.innerHTML = '<span class="btn-text">DISPATCH INQUIRY</span>';
            feedback.className = 'form-feedback-message success';
            feedback.innerHTML = `✓ Thank you, <strong>${name}</strong>. Direct: <a href="mailto:vivashvel2019@gmail.com" style="color:#f5c842;text-decoration:underline;">vivashvel2019@gmail.com</a>`;
            feedback.style.display = 'block';
            form.reset();
            window.location.href = `mailto:vivashvel2019@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
        }, 1000);
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
