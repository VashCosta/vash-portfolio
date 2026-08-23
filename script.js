/* ==========================================================================
   VIVASH VEL C.S. — CINEMATIC 240fps SCROLL IN/OUT ENGINE
   - Hardware-accelerated GPU animations
   - Dynamic scroll in & out effects across all sections
   - Hero scroll-out parallax with smooth opacity and scale transition
   - Accurate framing for both video and vash_suit.jpeg below header
   - Auto audio unlock on interaction / toggle
   ========================================================================== */

/* ------------------------------------------------------------------
   ENTRY POINT
   ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    initScrollEngine();
    initVideoSystem();
    initHeroAnimations();
    initScrollspyAndNav();
    initScrollReveals();
    initMagneticElements();
    initContactForm();
    initModalEvents();
});

/* ------------------------------------------------------------------
   1. Ultra-Smooth Scroll Engine with Hero Scroll-Out Effects
   ------------------------------------------------------------------ */
function initScrollEngine() {
    const prog           = document.getElementById('scroll-progress');
    const nav            = document.getElementById('main-nav');
    const hero           = document.getElementById('hero');
    const heroLeft       = document.querySelector('.hero-left');
    const heroVideoStage = document.getElementById('hero-video-stage');

    let ticking = false;

    function updateScroll() {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        // Update progress bar
        if (prog && docH > 0) {
            prog.style.width = Math.min(100, (scrollY / docH) * 100) + '%';
        }

        // Nav scrolled state
        if (nav) {
            nav.classList.toggle('scrolled', scrollY > 20);
        }

        // Hero dynamic scroll-out transition
        if (hero) {
            const heroH = hero.offsetHeight;
            hero.classList.toggle('scrolled-past', scrollY > heroH * 0.4);

            if (scrollY <= heroH) {
                const ratio = scrollY / heroH;
                if (heroLeft) {
                    heroLeft.style.transform = `translate3d(0, -${(scrollY * 0.22).toFixed(1)}px, 0)`;
                    heroLeft.style.opacity = Math.max(0, 1 - ratio * 1.6).toFixed(2);
                }
                if (heroVideoStage) {
                    heroVideoStage.style.transform = `translate3d(0, ${(scrollY * 0.12).toFixed(1)}px, 0) scale(${(1 - ratio * 0.04).toFixed(3)})`;
                    heroVideoStage.style.filter = `brightness(${(0.72 - ratio * 0.45).toFixed(2)}) contrast(${(1.1 - ratio * 0.15).toFixed(2)})`;
                }
            } else {
                if (heroLeft && heroLeft.style.opacity !== '0') heroLeft.style.opacity = '0';
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial pass
    updateScroll();
}

/* ------------------------------------------------------------------
   2. Video & Audio System (Framed strictly below header)
   ------------------------------------------------------------------ */
function initVideoSystem() {
    const video    = document.getElementById('hero-bg-video');
    const soundBtn = document.getElementById('video-sound-btn');
    const iconOff  = document.getElementById('sound-icon-off');
    const iconOn   = document.getElementById('sound-icon-on');
    const label    = document.getElementById('sound-label');
    const stage    = document.getElementById('hero-video-stage');

    if (!video) return;

    video.loop   = false;
    video.volume = 1.0;

    const playWithAudio = () => {
        video.muted = false;
        return video.play().then(() => {
            _enableSound(video, iconOff, iconOn, label, soundBtn);
            sessionStorage.setItem('vivash_sound_on', '1');
        }).catch(() => {
            // Autoplay policy fallback: play muted
            video.muted = true;
            video.play().catch(() => {});
            _disableSound(video, iconOff, iconOn, label, soundBtn);
        });
    };

    if (sessionStorage.getItem('vivash_sound_on') === '1') {
        playWithAudio();
    } else {
        playWithAudio();
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

    // Sound toggle button
    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.muted) {
                _enableSound(video, iconOff, iconOn, label, soundBtn);
                sessionStorage.setItem('vivash_sound_on', '1');
                if (video.ended) {
                    const bgImg = document.getElementById('hero-bg-img');
                    if (bgImg) bgImg.style.opacity = '0';
                    video.style.display = '';
                    video.style.opacity = '1';
                    video.style.transition = '';
                    video.currentTime = 0;
                }
                video.play().catch(() => {});
            } else {
                _disableSound(video, iconOff, iconOn, label, soundBtn);
                sessionStorage.removeItem('vivash_sound_on');
            }
        });
    }
}

function _enableSound(video, iconOff, iconOn, label, btn) {
    video.muted  = false;
    video.volume = 1.0;
    if (iconOff) iconOff.style.display = 'none';
    if (iconOn)  iconOn.style.display  = 'block';
    if (label)   label.textContent     = 'SOUND ON';
    if (btn)     btn.classList.add('is-on');
}

function _disableSound(video, iconOff, iconOn, label, btn) {
    video.muted = true;
    if (iconOff) iconOff.style.display = 'block';
    if (iconOn)  iconOn.style.display  = 'none';
    if (label)   label.textContent     = 'SOUND OFF';
    if (btn)     btn.classList.remove('is-on');
}

/* ------------------------------------------------------------------
   3. Hero Roles Rotator
   ------------------------------------------------------------------ */
function initHeroAnimations() {
    setTimeout(() => {
        document.querySelectorAll('.hero-section .reveal-title, .hero-section .reveal-fade').forEach(el => {
            el.classList.add('is-visible');
        });
    }, 150);

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
   4. Scrollspy & Mobile Navigation
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
   5. Dynamic Scroll In & Out Effects
   ------------------------------------------------------------------ */
function initScrollReveals() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
            } else {
                // When scrolling out of view, remove is-visible for dynamic scroll in/out effects!
                e.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    const targets = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade, .timeline-entry, .spatial-project-card, ' +
        '.skill-category-block, .cert-card, .pillar-card, .edu-featured-card, .edu-card, ' +
        '.contact-card, .section-header, .about-intro-block'
    );

    targets.forEach(el => obs.observe(el));
}

/* ------------------------------------------------------------------
   6. Magnetic Buttons (Hardware-accelerated)
   ------------------------------------------------------------------ */
function initMagneticElements() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width  / 2)) * 0.15;
            const y = (e.clientY - (r.top  + r.height / 2)) * 0.15;
            btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0,0,0)';
        });
    });
}

/* ------------------------------------------------------------------
   7. Contact Form
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
   8. Resume Modal
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
