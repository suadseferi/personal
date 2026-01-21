const App = {
    init() {
        try {
            document.body.classList.remove('opacity-0');

            this.initMenu();
            this.initTypewriter();
            this.initHeaderScroll(); // Consolidating scroll logic managed here
            this.initSpotlight();
            this.initRadar();
            this.initPerformance(); // Particles and others

            // Unified Scroll Handler
            this.setupScrollListener();
        } catch (e) { console.error('App init error', e); }
    },

    copyEmail() {
        navigator.clipboard.writeText('suad@ctrlab.net').then(() => {
            const el = document.querySelector('.tooltip');
            el.classList.add('show-tooltip');
            setTimeout(() => el.classList.remove('show-tooltip'), 2000);
        });
    },

    initPerformance() {
        // Initialize Animations (GSAP)
        this.initAnimations();

        // Initialize Particles only if library is loaded - improved check and reduced load
        if (typeof tsParticles !== 'undefined') {
            this.initParticles();

            // Optimization: Pause particles when not in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const container = tsParticles.domItem(0);
                    if (!container) return;

                    if (entry.isIntersecting) {
                        container.play();
                    } else {
                        container.pause();
                    }
                });
            }, { threshold: 0.1 });

            const section = document.getElementById('about');
            if (section) observer.observe(section);
        }
    },

    setupScrollListener() {
        const header = document.getElementById('main-header');
        const scrollProgress = document.getElementById('scroll-progress');
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    // 1. Header Logic
                    if (header) {
                        header.classList.toggle('scrolled-nav', scrollY > 10);
                    }

                    // 2. Scroll Progress Logic
                    if (scrollProgress) {
                        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                        const scrolled = (scrollY / height) * 100;
                        scrollProgress.style.width = scrolled + "%";
                    }

                    // 3. Nav Highlighter Logic (Optimized)
                    // Only check every few frames or simplistically
                    let current = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.clientHeight;
                        if (scrollY >= (sectionTop - sectionHeight / 3)) {
                            current = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + current) {
                            link.classList.add('active');
                        }
                    });

                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    // Deprecated individual init methods in favor of setupScrollListener, 
    // kept empty or minimal if referenced elsewhere
    initScrollProgress() { },
    initHeaderScroll() { },
    initNavHighlighter() { },

    initSpotlight() {
        if (window.innerWidth > 768) {
            let rafId = null;
            window.addEventListener('mousemove', e => {
                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
                    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
                    rafId = null;
                });
            });
        }
    },

    toggleSection(id, btn) {
        const el = document.getElementById(id);
        if (!el) return;

        const isExpanded = btn.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
            el.classList.add('hidden');
            btn.innerText = "Show More";
            btn.setAttribute('data-expanded', 'false');
            const sectionId = id.split('-')[0];
            const section = document.getElementById(sectionId);
            if (section) {
                const y = section.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        } else {
            el.classList.remove('hidden');
            btn.innerText = "Show Less";
            btn.setAttribute('data-expanded', 'true');
        }
    },

    resetRadar() {
        const sliders = document.querySelectorAll('.cyber-range');
        sliders.forEach(s => { s.value = 50; });

        const labels = document.querySelectorAll('.slider-val');
        labels.forEach(l => { l.innerText = "50%"; });

        if (sliders.length > 0) {
            sliders[0].dispatchEvent(new Event('input'));
        }
    },

    initRadar() {
        const canvas = document.getElementById('radarChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const sliders = document.querySelectorAll('.cyber-range');
        const benchmarkToggle = document.getElementById('benchmark-toggle');

        const draw = () => {
            const w = canvas.width / 2;
            const h = canvas.height / 2;
            const cx = w;
            const cy = h;
            const r = Math.max(0, Math.min(w, h) - 25);
            const totalAxes = 8;
            const labels = ["STRAT", "DATA", "INFRA", "SKILLS", "GOV", "FUND", "ADOPT", "ECO"];

            ctx.clearRect(0, 0, w * 2, h * 2);

            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            for (let i = 1; i <= 4; i++) {
                ctx.beginPath();
                for (let j = 0; j < totalAxes; j++) {
                    const angle = (Math.PI * 2 * j) / totalAxes - Math.PI / 2;
                    const x = cx + Math.cos(angle) * (r * i / 4);
                    const y = cy + Math.sin(angle) * (r * i / 4);
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            }

            for (let i = 0; i < totalAxes; i++) {
                const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
                ctx.stroke();

                ctx.fillStyle = '#666';
                ctx.font = '9px "Plus Jakarta Sans"';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const lx = cx + Math.cos(angle) * (r + 18);
                const ly = cy + Math.sin(angle) * (r + 18);
                ctx.fillText(labels[i], lx, ly);
            }

            const values = Array.from(sliders).map(s => parseInt(s.value) || 0);
            const avgScore = values.reduce((a, b) => a + b, 0) / values.length;

            let archetype = "";
            let archetypeDesc = "";
            let archetypeColor = "";

            if (avgScore < 40) {
                archetype = "Digital Observer";
                archetypeDesc = "Your organization is in the early stages. Focus on education and strategy definition before investing in tools.";
                archetypeColor = "text-red-400";
            } else if (avgScore < 70) {
                archetype = "Emerging Adopter";
                archetypeDesc = "You have foundations in place but lack consistency. Prioritize governance and infrastructure to scale.";
                archetypeColor = "text-yellow-400";
            } else {
                archetype = "AI Leader";
                archetypeDesc = "Your organization is ready for advanced innovation. Focus on ethical leadership and ecosystem optimization.";
                archetypeColor = "text-green-400";
            }

            const label = document.getElementById('recommendation-label');
            const title = document.getElementById('recommendation-title');
            const desc = document.getElementById('recommendation-desc');

            if (label) { label.innerText = "Assessment Result: " + Math.round(avgScore) + "%"; label.className = "text-[10px] uppercase tracking-widest block mb-2 " + archetypeColor; }
            if (title) { title.innerText = archetype; }
            if (desc) { desc.innerText = archetypeDesc; }

            let fillColor = 'rgba(74, 222, 128, 0.2)';
            let strokeColor = '#4ade80';

            if (avgScore < 40) {
                fillColor = 'rgba(239, 68, 68, 0.2)';
                strokeColor = '#ef4444';
            } else if (avgScore < 70) {
                fillColor = 'rgba(234, 179, 8, 0.2)';
                strokeColor = '#eab308';
            }

            ctx.beginPath();
            for (let i = 0; i < totalAxes; i++) {
                const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
                const val = values[i] / 100;
                const x = cx + Math.cos(angle) * (r * val);
                const y = cy + Math.sin(angle) * (r * val);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            if (benchmarkToggle && benchmarkToggle.checked) {
                const benchmark = [0.7, 0.55, 0.8, 0.45, 0.3, 0.6, 0.5, 0.7];
                ctx.beginPath();
                ctx.setLineDash([4, 4]);
                for (let i = 0; i < totalAxes; i++) {
                    const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
                    const val = benchmark[i];
                    const x = cx + Math.cos(angle) * (r * val);
                    const y = cy + Math.sin(angle) * (r * val);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = '#999';
                ctx.stroke();
                ctx.setLineDash([]);
            }

            for (let i = 0; i < totalAxes; i++) {
                const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
                const val = values[i] / 100;
                const x = cx + Math.cos(angle) * (r * val);
                const y = cy + Math.sin(angle) * (r * val);

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#000';
                ctx.fill();
                ctx.stroke();
            }
        };

        const resize = () => {
            if (!canvas.parentElement) return;
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth * 2;
            canvas.height = parent.clientHeight * 2;
            ctx.scale(2, 2);
            draw();
        };

        window.addEventListener('resize', resize);
        setTimeout(resize, 100);

        sliders.forEach(s => {
            s.addEventListener('input', () => {
                const label = s.parentElement.querySelector('.slider-val');
                if (label) label.innerText = s.value + "%";
                draw();
            });
        });

        if (benchmarkToggle) {
            benchmarkToggle.addEventListener('change', draw);
        }
    },

    initMenu() {
        const btn = document.getElementById('hamburger-btn');
        const closeBtn = document.getElementById('close-menu-btn');
        const menu = document.getElementById('fs-menu');
        const links = document.querySelectorAll('.fs-link');

        if (!btn || !menu) return;

        const toggleMenu = (open) => {
            const action = open ? 'add' : 'remove';
            btn.classList[action]('is-active');
            menu.classList[action]('is-active');
            document.body.style.overflow = open ? "hidden" : "";

            links.forEach((link, i) => {
                link.style.transitionDelay = open ? (0.1 + (i * 0.05)) + 's' : '0s';
                link.style.opacity = open ? '1' : '0';
                link.style.transform = open ? 'translateY(0)' : 'translateY(16px)';
            });
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(!menu.classList.contains('is-active'));
        });

        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(false);
        });

        links.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
        menu.addEventListener('click', (e) => {
            if (e.target === menu) toggleMenu(false);
        });
    },

    initParticles() {
        if (typeof tsParticles === 'undefined') return;

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 15 : 40; // Reduced particle count
        const linkDistance = isMobile ? 100 : 130;

        tsParticles.load("particles-js", {
            fpsLimit: 60, fullScreen: { enable: false },
            particles: {
                number: { value: particleCount, density: { enable: true, area: 1000 } },
                color: { value: "#ffffff" },
                opacity: { value: 0.15, random: true },
                size: { value: 1.5, random: true },
                move: { enable: true, speed: 0.2, direction: "none", random: false, straight: false, outModes: "out" },
                links: { enable: true, distance: linkDistance, color: "#ffffff", opacity: 0.05, width: 1 }
            },
            interactivity: { events: { onHover: { enable: !isMobile, mode: "grab" } } }
        });
    },

    initTypewriter() {
        const el = document.getElementById('hero-tagline');
        if (!el) return;
        const text = "Artificial Intelligence & Strategy";
        let index = 0;
        const type = () => {
            if (index < text.length) {
                el.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50);
            } else {
                el.innerHTML += '<span class="cursor-blink"></span>';
            }
        };
        setTimeout(type, 1200);
    },

    initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        if (window.innerWidth < 768) {
            const tiltElements = document.querySelectorAll('[data-tilt]');
            tiltElements.forEach(el => {
                if (el.vanillaTilt) el.vanillaTilt.destroy();
                el.removeAttribute('data-tilt');
            });
        }

        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl.from(".gsap-title-line", { y: 100, duration: 1.2, stagger: 0.15, delay: 0.2 });
        heroTl.from(".gsap-hero-fade", { y: 20, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.5");

        heroTl.fromTo(".gsap-hero-img",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
            "-=1.0");

        const animate = (selector, y = 50, delay = 0.1) => {
            gsap.utils.toArray(selector).forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: "top 85%" },
                    y: y, opacity: 0, duration: 0.8, delay: i * delay, ease: "power2.out"
                });
            });
        };

        animate('.service-card', 50, 0.1);
        animate('.publication-item', 40, 0);
        animate('.media-card', 30, 0.1);
        animate('.scroll-trigger-head', 30, 0);

        gsap.utils.toArray('.event-row').forEach((row, i) => {
            gsap.from(row, {
                scrollTrigger: { trigger: row, start: "top 90%" },
                x: -20, opacity: 0, duration: 0.6, delay: i * 0.05, ease: "power1.out"
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
