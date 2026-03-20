// Zmienna globalna dla PWA
let deferredPrompt;
const appVersion = (typeof self !== 'undefined' && self.APP_VERSION) ? self.APP_VERSION : '0.0.0';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'inline-block';
});

document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = targetId && targetId !== '#' ? document.querySelector(targetId) : null;
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Zamknij menu mobilne po kliknięciu (Fix z Twojego kodu)
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle) menuToggle.textContent = '☰';
            }
        }
    }
});

// Obsługa przycisku "Powrót do góry"
const scrollTopBtn = document.getElementById("scrollTopBtn");
const nav = document.querySelector('nav');

let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
            nav.classList.toggle('scrolled', window.scrollY > 50);
            isScrolling = false;
        });
        isScrolling = true;
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animacja pojawiania się elementów (Fade-in)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// --- 1. Formularz Kontaktowy (Wersja Uniwersalna) ---
const contactForm = document.getElementById('contact-form');
const contactWrapper = document.querySelector('.contact-form-wrapper') || contactForm;

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // A. Przywracanie danych z LocalStorage (Pamięć formularza)
    const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    formInputs.forEach(input => {
        if (savedData[input.name]) input.value = savedData[input.name];
    });

    // B. Auto-save (Zapisywanie w locie)
    contactForm.addEventListener('input', () => {
        const formData = {};
        formInputs.forEach(input => formData[input.name] = input.value);
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    });

    // C. Formatowanie telefonu (Automatyczne spacje)
    const phoneInput = contactForm.querySelector('input[name="telefon"]');
    phoneInput?.addEventListener('input', (e) => {
        let num = e.target.value.replace(/\D/g, '').substring(0, 9);
        if (num.length > 6) e.target.value = `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
        else if (num.length > 3) e.target.value = `${num.slice(0, 3)} ${num.slice(3)}`;
        else e.target.value = num;
    });

    // D. Wysyłka formularza
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Funkcja pomocnicza do animacji błędu
        const triggerShake = (element) => {
            element.classList.add('shake-animation');
            setTimeout(() => element.classList.remove('shake-animation'), 500);
            element.focus();
        };
        
        // Walidacja telefonu (dokładnie 9 cyfr)
        const purePhone = phoneInput.value.replace(/\D/g, '');
        if (purePhone.length !== 9) {
            triggerShake(phoneInput);
            alert("Numer telefonu musi składać się dokładnie z 9 cyfr.");
            return;
        }

        // Walidacja Email
        const emailInput = contactForm.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            triggerShake(emailInput);
            alert("Proszę podać poprawny adres email.");
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalBtnText = btn.innerText;
        btn.innerText = 'Wysyłanie...';
        btn.disabled = true;

        fetch("https://formsubmit.co/ajax/zbyszekszczesny83@gmail.com", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
        })
        .then(res => {
            if (res.ok) {
                // Czyścimy pamięć podręczną po sukcesie
                localStorage.removeItem('contactFormData');

                // Ukrywamy formularz i pokazujemy sukces
                const originalContent = Array.from(contactWrapper.children);
                originalContent.forEach(child => child.style.display = 'none');

                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <h3 style="color: var(--accent);">✓ Dziękujemy!</h3>
                        <p>Wiadomość została wysłana pomyślnie.</p>
                        <button type="button" id="reset-form-btn" class="btn-main" style="margin-top: 20px;">Wyślij kolejną wiadomość</button>
                    </div>
                `;
                contactWrapper.appendChild(successDiv);

                // E. Przywracanie formularza (Wyślij kolejną wiadomość)
                document.getElementById('reset-form-btn').addEventListener('click', () => {
                    successDiv.remove();
                    originalContent.forEach(child => child.style.display = '');
                    contactForm.reset();
                    btn.innerText = originalBtnText;
                    btn.disabled = false;
                });

            } else {
                throw new Error();
            }
        })
        .catch(() => {
            alert("Błąd wysyłki. Spróbuj ponownie.");
            btn.innerText = originalBtnText;
            btn.disabled = false;
        });
    });
}

// 2. Przycisk udostępniania
document.querySelectorAll('.share-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        if (navigator.share) navigator.share({ title: document.title, url: window.location.href }).catch(console.error);
        else navigator.clipboard.writeText(window.location.href).then(() => alert('Link skopiowany!')).catch(() => alert('Błąd kopiowania'));
    });
});

// 3. Obsługa Dark Mode (Ciemny motyw)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Sprawdź zapisany motyw lub preferencje systemowe
const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme || 'dark'; // Domyślnie ciemny (Dark Mode First)

if (currentTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
});

// 4. Obsługa Menu Hamburger (Mobile)
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Zmiana ikony hamburgera na X i odwrotnie
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// 5. Efekt pisania na maszynie (Typewriter) dla nagłówka H1
let typewriterTimeout;

function runTypewriter(text) {
    const heroHeader = document.querySelector('.hero-content h1');
    if (!heroHeader) return;

    clearTimeout(typewriterTimeout); // Zatrzymaj poprzednią animację
    heroHeader.textContent = ''; // Wyczyść tekst, aby uniknąć duplikatów
    
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

// 6. Liczniki (Counters) - Animacja odliczania
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const counters = statsSection.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000; // Czas trwania animacji w ms
                const increment = target / (duration / 16); // Przybliżenie dla 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                updateCounter();
            });
            observer.unobserve(statsSection); // Uruchom tylko raz
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// 7. Cookie Banner (Polityka Prywatności)
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => cookieBanner.classList.add('show'), 1000); // Pokaż po 1s
}

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
});

// 9. Favicon Animation (Loader)
const faviconLink = document.querySelector("link[rel~='icon']");
if (faviconLink) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let intervalId;

    function drawFavicon() {
        // Tło (zielony kwadrat)
        ctx.fillStyle = '#10b981';
        ctx.fillRect(0, 0, 32, 32);

        // Litera "E"
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('E', 16, 17);

        // Spinner (biały łuk)
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.arc(16, 16, 13, angle, angle + Math.PI / 2);
        ctx.stroke();

        angle += 0.4;
        faviconLink.href = canvas.toDataURL('image/png');
    }

    // Uruchom animację co 100ms
    intervalId = setInterval(drawFavicon, 100);

    // Zatrzymaj animację 1.5 sekundy po pełnym załadowaniu strony
    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(intervalId);
            // Rysujemy czystą ikonę bez spinnera na koniec
            ctx.fillStyle = '#10b981';
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillStyle = '#ffffff';
            ctx.fillText('E', 16, 17);
            faviconLink.href = canvas.toDataURL('image/png');
        }, 1500);
    });
}

// 10. Tłumaczenia (PL / EN)
const translations = {
    pl: {
        hero_title: "Nowoczesne wizytówki online dla małych firm w całej Polsce",
        hero_desc: "Prosta i skuteczna strona internetowa, która pomoże Ci zdobywać klientów bez abonamentu i zbędnych kosztów.",
        hero_btn: "Zamów bezpłatną wycenę",
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
        hero_title: "Modern online business cards for small companies across Poland",
        hero_desc: "A simple, effective website that helps you win clients without subscriptions or unnecessary costs.",
        hero_btn: "Get a free quote",
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

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            if (key === 'hero_title') {
                runTypewriter(translations[lang][key]);
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Obsługa placeholderów w formularzu
    const placeholders = document.querySelectorAll('[data-lang-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Zmiana przycisku
    langToggle.textContent = lang === 'pl' ? '🇺🇸 EN' : '🇵🇱 PL';
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

// Inicjalizacja języka
setLanguage(currentLang);

langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'pl' ? 'en' : 'pl');
});

// 11. Zmiana tła (Background Changer)
const bgChangeBtn = document.getElementById('bg-change-btn');
const bgColors = ['var(--bg)', '#f0f4f8', '#eef2f3', '#fff0f5', '#f5f5dc', '#e0f7fa', '#f3e5f5', '#e8f5e9', '#fff3e0']; // Lista kolorów
let bgIndex = parseInt(localStorage.getItem('bgIndex')) || 0;

// Funkcja aplikująca tło
function applyBackground(index) {
    if (index > 0) {
        document.documentElement.style.setProperty('--bg', bgColors[index]);
        document.body.style.backgroundColor = bgColors[index];
    } else {
        // Reset do domyślnego (zależnego od motywu dark/light)
        document.documentElement.style.removeProperty('--bg');
        document.body.style.backgroundColor = '';
    }
}

// Zastosuj zapisane tło na starcie
applyBackground(bgIndex);

bgChangeBtn.addEventListener('click', () => {
    bgIndex = (bgIndex + 1) % bgColors.length;
    localStorage.setItem('bgIndex', bgIndex);
    applyBackground(bgIndex);
});

// 12. Reset Ustawień (Factory Reset)
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    // 1. Reset Języka
    localStorage.removeItem('lang');
    currentLang = 'pl';
    setLanguage('pl');

    // 2. Reset Motywu
    localStorage.removeItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (systemTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }

    // 3. Reset Tła
    localStorage.removeItem('bgIndex');
    bgIndex = 0;
    applyBackground(0);
});

// 13. Rejestracja Service Workera (PWA)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            registration.update();

            const showUpdateBanner = (versionText) => {
                let banner = document.getElementById('update-banner');
                if (!banner) {
                    banner = document.createElement('div');
                    banner.id = 'update-banner';
                    banner.className = 'update-banner';
                    banner.innerHTML = `
                        <div class="update-text"></div>
                        <button type="button" class="update-btn">Zaktualizuj teraz</button>
                    `;
                    document.body.appendChild(banner);
                }

                const textEl = banner.querySelector('.update-text');
                textEl.textContent = `Dostępna nowa wersja ${versionText}.`;
                banner.classList.add('show');

                const btn = banner.querySelector('.update-btn');
                btn.onclick = () => {
                    if (registration.waiting) {
                        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    }
                };
            };

            if (registration.waiting && navigator.serviceWorker.controller) {
                showUpdateBanner(appVersion);
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) return;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBanner(appVersion);
                    }
                });
            });
        })
        .catch(() => {});

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

// Obsługa kliknięcia w przycisk instalacji
const installBtn = document.getElementById('install-btn');
if (installBtn) {
    installBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
            });
        }
    });
}

// 14. Efekt Lupy w Stopce (Footer Magnifier)
const versionText = document.getElementById('version-text');
if (versionText) {
    const text = appVersion ? `pro.v${appVersion} | Enterprise` : versionText.innerText;
    versionText.innerText = text;
    // Rozbijamy tekst na litery, zachowując spacje jako &nbsp;
    versionText.innerHTML = text.split('').map(char => {
        return char === ' ' ? '<span style="display:inline">&nbsp;</span>' : `<span>${char}</span>`;
    }).join('');
    
    const spans = versionText.querySelectorAll('span');
    let isAnimating = false;

    const runMagnifyAnimation = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('magnified');
                setTimeout(() => span.classList.remove('magnified'), 150); // Czas trwania powiększenia jednej litery
                
                if (index === spans.length - 1) isAnimating = false;
            }, index * 70); // Prędkość fali (im mniej, tym szybciej)
        });
    };

    // Uruchamiaj animację co jakiś czas, gdy stopka jest widoczna
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            runMagnifyAnimation(); // Uruchom raz na start
            const interval = setInterval(() => {
                // Sprawdź czy element nadal jest w viewport (zabezpieczenie)
                if (entries[0].target.getBoundingClientRect().top < window.innerHeight) {
                    runMagnifyAnimation();
                }
            }, 5000); // Powtarzaj co 4 sekundy
            versionText.dataset.intervalId = interval;
        } else {
            clearInterval(versionText.dataset.intervalId);
        }
    }, { threshold: 0.5 });
    
    observer.observe(versionText);
}
