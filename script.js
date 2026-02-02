document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = targetId && targetId !== '#' ? document.querySelector(targetId) : null;
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
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

// --- Nowe funkcje zapożyczone ---

// 1. Obsługa formularza kontaktowego (AJAX) i formatowanie telefonu
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // 8. Auto-save (Zapisywanie treści formularza)
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    
    // Przywracanie danych po odświeżeniu
    formInputs.forEach(input => {
        if (savedData[input.name]) {
            input.value = savedData[input.name];
        }
    });

    // Zapisywanie danych przy każdej zmianie
    contactForm.addEventListener('input', () => {
        const formData = {};
        formInputs.forEach(input => {
            formData[input.name] = input.value;
        });
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    });

    // Automatyczne formatowanie numeru telefonu
    const phoneInput = contactForm.querySelector('input[name="telefon"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let number = e.target.value.replace(/\D/g, '');
            if (number.length > 9) number = number.substring(0, 9);
            
            if (number.length > 6) {
                e.target.value = number.substring(0, 3) + ' ' + number.substring(3, 6) + ' ' + number.substring(6);
            } else if (number.length > 3) {
                e.target.value = number.substring(0, 3) + ' ' + number.substring(3);
            } else {
                e.target.value = number;
            }
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const phoneInput = contactForm.querySelector('input[name="telefon"]');
        const rawPhoneNumber = phoneInput.value.replace(/\D/g, '');
        if (rawPhoneNumber.length !== 9) {
            alert("Proszę podać poprawny, 9-cyfrowy numer telefonu.");
            return;
        }

        const emailInput = contactForm.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert("Proszę podać poprawny adres email.");
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Wysyłanie...';
        btn.disabled = true;

        // Używamy adresu email z treści strony (twoj-email@przyklad.pl)
        fetch("https://formsubmit.co/ajax/zbyszekszczesny83@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                imie: contactForm.querySelector('input[name="imie"]').value,
                telefon: contactForm.querySelector('input[name="telefon"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                wiadomosc: contactForm.querySelector('textarea[name="wiadomosc"]').value,
                _captcha: "false"
            })
        })
        .then(response => {
            if (response.ok) {
                // Wyczyść zapisane dane po udanym wysłaniu
                localStorage.removeItem('contactFormData');

                // Ukrywamy elementy formularza zamiast nadpisywać innerHTML, aby zachować event listenery
                const originalChildren = Array.from(contactForm.children);
                originalChildren.forEach(child => child.style.display = 'none');

                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.innerHTML = `
                    <h3>✓ Dziękujemy!</h3>
                    <p>Twoja wiadomość została wysłana pomyślnie.<br>Skontaktujemy się z Tobą wkrótce.</p>
                    <button type="button" id="new-message-btn" class="btn-main" style="margin-top: 20px;">Wyślij kolejną wiadomość</button>
                `;
                contactForm.appendChild(successDiv);

                // Obsługa przycisku resetu
                document.getElementById('new-message-btn').addEventListener('click', () => {
                    successDiv.remove();
                    originalChildren.forEach(child => child.style.display = '');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
            } else {
                throw new Error('Błąd wysyłki');
            }
        }).catch(error => {
            alert("Wystąpił błąd. Spróbuj ponownie.");
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}

// 2. Przycisk udostępniania
document.getElementById('share-btn').addEventListener('click', () => {
    if (navigator.share) navigator.share({ title: document.title, url: window.location.href }).catch(console.error);
    else navigator.clipboard.writeText(window.location.href).then(() => alert('Link skopiowany!')).catch(() => alert('Błąd kopiowania'));
});

// 3. Obsługa Dark Mode (Ciemny motyw)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Sprawdź zapisany motyw lub preferencje systemowe
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const currentTheme = savedTheme || systemTheme;

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
const heroHeader = document.querySelector('.hero-content h1');
if (heroHeader) {
    const textToType = heroHeader.textContent;
    heroHeader.textContent = ''; // Wyczyszczenie tekstu początkowego
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < textToType.length) {
            heroHeader.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80); // Prędkość pisania (ms)
        }
    }
    
    // Start animacji po 500ms
    setTimeout(typeWriter, 500);
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