document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Nawigacja i Płynne przewijanie ---
    document.addEventListener('click', function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = targetId && targetId !== '#' ? document.querySelector(targetId) : null;
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Zamknij menu mobilne jeśli otwarte
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });

    // --- 2. Obsługa Scrolla (Navbar & Button) ---
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 300;
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', isScrolled);
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 3. Animacje wejścia (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

    // --- 4. Tłumaczenia (PL / EN) ---
    const translations = {
        pl: {
            hero_title: "Tworzę strony, które pracują dla Ciebie",
            hero_desc: "Nie jestem wielką agencją. Jestem pasjonatem, który pomoże Ci zbudować prostą, skuteczną i ładną wizytówkę w internecie.",
            hero_btn: "Sprawdź, co mogę zrobić",
            about_title: "Dlaczego ja?",
            about_desc: "Programowanie to moja pasja, a nie rzemiosło z biura. Do każdego projektu podchodzę jak do własnego – dbam o detale, których inni mogą nie zauważyć. Jeśli potrzebujesz strony bez zbędnego skomplikowania, za to z \"duszą\" i pełnym wsparciem – dobrze trafiłeś.",
            stats_projects: "Zrealizowanych Projektów",
            stats_exp: "Lata Doświadczenia",
            stats_clients: "Zadowolonych Klientów",
            portfolio_title: "Wspieramy i współpracujemy z innymi firmami",
            contact_title: "Masz pomysł? Zrealizujmy go!",
            contact_desc: "Napisz do mnie, a wspólnie zastanowimy się, jak najlepiej zaprezentować Twoją ofertę.",
            location: "Lokalizacja",
            remote: "Zdalnie",
            form_name: "Twoje imię",
            form_phone: "Twój telefon",
            form_email: "Twój email",
            form_msg: "Treść wiadomości",
            form_btn: "Wyślij wiadomość"
        },
        en: {
            hero_title: "I create websites that work for you",
            hero_desc: "I am not a big agency. I am an enthusiast who will help you build a simple, effective, and beautiful online business card.",
            hero_btn: "Check what I can do",
            about_title: "Why me?",
            about_desc: "Programming is my passion, not just an office craft. I treat every project like my own – I care about details that others might miss. If you need a website without unnecessary complexity, but with \"soul\" and full support – you've come to the right place.",
            stats_projects: "Completed Projects",
            stats_exp: "Years of Experience",
            stats_clients: "Satisfied Clients",
            portfolio_title: "We support and cooperate with other companies",
            contact_title: "Have an idea? Let's realize it!",
            contact_desc: "Write to me, and together we will figure out how to best present your offer.",
            location: "Location",
            remote: "Remote",
            form_name: "Your name",
            form_phone: "Your phone",
            form_email: "Your email",
            form_msg: "Message content",
            form_btn: "Send message"
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'pl';
    let typewriterTimeout; // Do kontrolowania animacji pisania

    function setLanguage(lang) {
        // Tłumaczenie zwykłych tekstów
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                // Jeśli to nagłówek H1, używamy Typewritera, dla reszty zwykły tekst
                if (key === 'hero_title') {
                    runTypewriter(translations[lang][key]);
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Placeholderów
        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });

        if (langToggle) langToggle.textContent = lang === 'pl' ? '🇺🇸 EN' : '🇵🇱 PL';
        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    // --- 5. Poprawiony Typewriter (Animacja pisania) ---
    function runTypewriter(text) {
        const heroHeader = document.querySelector('.hero-content h1');
        if (!heroHeader) return;

        clearTimeout(typewriterTimeout); // Zatrzymaj poprzednią animację jeśli była w trakcie
        heroHeader.textContent = ''; // CZYŚCIMY, aby uniknąć duplikatu
        
        let charIndex = 0;
        function type() {
            if (charIndex < text.length) {
                heroHeader.textContent += text.charAt(charIndex);
                charIndex++;
                typewriterTimeout = setTimeout(type, 80);
            }
        }
        type();
    }

    // Inicjalizacja języka (i pierwszego Typewritera)
    setLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'pl' ? 'en' : 'pl');
        });
    }

    // --- 6. Formularz Kontaktowy ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Przywracanie z LocalStorage
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
        formInputs.forEach(input => {
            if (savedData[input.name]) input.value = savedData[input.name];
        });

        // Auto-save
        contactForm.addEventListener('input', () => {
            const formData = {};
            formInputs.forEach(input => formData[input.name] = input.value);
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        });

        // Formatowanie telefonu
        const phoneInput = contactForm.querySelector('input[name="telefon"]');
        phoneInput?.addEventListener('input', (e) => {
            let num = e.target.value.replace(/\D/g, '').substring(0, 9);
            if (num.length > 6) e.target.value = `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
            else if (num.length > 3) e.target.value = `${num.slice(0, 3)} ${num.slice(3)}`;
            else e.target.value = num;
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerText = '...';
            btn.disabled = true;

            fetch("https://formsubmit.co/ajax/zbyszekszczesny83@gmail.com", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            })
            .then(res => {
                if (res.ok) {
                    localStorage.removeItem('contactFormData');
                    contactForm.innerHTML = `<div class="form-success"><h3>✓ Sukces!</h3><p>Odezwiemy się wkrótce.</p></div>`;
                }
            }).catch(() => {
                alert("Błąd wysyłki.");
                btn.disabled = false;
            });
        });
    }

    // --- 7. Motyw i Tło ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    applyTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    themeToggle?.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- 8. Hamburger Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // --- 9. Cookie Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted') && cookieBanner) {
        setTimeout(() => cookieBanner.classList.add('show'), 2000);
    }

    acceptBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
    });

    // --- 10. Liczniki ---
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                statsSection.querySelectorAll('.stat-number').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let current = 0;
                    const update = () => {
                        current += target / 60;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + suffix;
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    update();
                });
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }
});
                        
