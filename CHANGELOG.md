# Dziennik Zmian (Changelog)

Ten plik służy do śledzenia postępów prac oraz jako lista kontrolna (checklist) dla przyszłych projektów, aby zachować wysoki standard techniczny.

## [1.6.4] - Settings Reset - 2026-05-22
### Dodano (UX)
- **Reset Button:** Dodano przycisk "↺" w menu, który przywraca domyślne ustawienia strony.
- **Logika:** Kliknięcie czyści `localStorage` i natychmiast przywraca domyślny język (PL), motyw (zgodny z systemem) oraz tło.

## [1.6.3] - Smooth Background Transition - 2026-05-22
### Zmieniono (UI)
- **Animacja:** Wydłużono czas przejścia (`transition`) koloru tła strony (`body`) z 0.3s do 0.8s.
- **Efekt:** Zmiana tła przyciskiem "🎨" jest teraz znacznie płynniejsza i przypomina efekt "fade".

## [1.6.2] - Extended Color Palette - 2026-05-22
### Zmieniono (UI)
- **Background Changer:** Rozszerzono paletę dostępnych kolorów tła o nowe odcienie (błękit, fiolet, zieleń, pomarańcz).

## [1.6.1] - Background Persistence - 2026-05-22
### Zmieniono (UX)
- **Background Changer:** Przeniesiono przycisk zmiany tła ("🎨") z lewego dolnego rogu do paska nawigacji (obok zmiany języka).
- **Persistence:** Wybrany kolor tła jest teraz zapamiętywany w `localStorage` i przywracany po odświeżeniu strony.
- **Cleanup:** Usunięto zbędne style `.btn-floating-left`.

## [1.6.0] - Language & Customization - 2026-05-22
### Dodano (Features)
- **Język (i18n):** Dodano obsługę języka angielskiego (flaga USA) i polskiego. Przycisk w menu przełącza teksty na stronie w czasie rzeczywistym.
- **Personalizacja:** Dodano przycisk "🎨" w lewym dolnym rogu, który pozwala użytkownikowi zmieniać kolor tła strony.
- **UI:** Dodano tooltipy (dymki) do nowych przycisków, wykorzystując uogólnioną klasę `.custom-tooltip`.

## [1.5.5] - Colored Glow Effect - 2026-05-22
### Dodano (UI)
- **Logo Glow:** Dodano efekt kolorowej poświaty (`box-shadow`) wokół logotypów po najechaniu myszką.
- **Dynamiczne Kolory:** Każde logo ma przypisany unikalny kolor w `portfolio-logos.js` (np. RentMaster - granatowy, Enterprise - zielony), który jest przekazywany do CSS przez zmienną `--hover-color`.

## [1.5.4] - Custom Tooltips - 2026-05-22
### Dodano (UI)
- **Logos Tooltip:** Zastąpiono standardowy atrybut `title` w sekcji logotypów własnym rozwiązaniem CSS (`.logo-tooltip`).
- **Styl:** Dymek z opisem pojawia się teraz nad logo z płynną animacją i ciemnym tłem, co wygląda znacznie nowocześniej.

## [1.5.3] - Animated Favicon - 2026-05-22
### Dodano (UI/UX)
- **Favicon Loader:** Dodano animację ładowania na ikonie w karcie przeglądarki.
- **Technologia:** Wykorzystano HTML5 Canvas do dynamicznego rysowania logo ("E") z obracającym się spinnerem, który znika po załadowaniu strony.

## [1.5.2] - Favicon Update - 2026-05-22
### Zmieniono (Branding)
- **Favicon:** Zmieniono ikonę w pasku przeglądarki na zielony kwadrat z literą "E" (`https://via.placeholder.com/64x64/10b981/ffffff.png?text=E`).
- **Spójność:** Zaktualizowano `index.html` oraz `manifest.json`, aby używały tej samej, czytelnej ikony PNG zamiast starego pliku `.ico`.

## [1.5.1] - Branding Icons - 2026-05-22
### Zmieniono (Branding)
- **PWA Icons:** Zaktualizowano `manifest.json`, aby ikona aplikacji na telefonie (placeholder) miała kolor firmowy (zielony) i napis "Enterprise", zamiast domyślnego szarego "App".
- **Social Media:** Potwierdzono spójność `og:image` z tłem nagłówka.

## [1.5.0] - Auto-save Form - 2026-05-22
### Dodano (UX)
- **Formularz Kontaktowy:** Dodano automatyczne zapisywanie wpisywanej treści w `localStorage`. Dane nie znikają po odświeżeniu strony.
- **Logika:** Dane są czyszczone automatycznie po pomyślnym wysłaniu wiadomości, aby formularz był czysty przy kolejnej wizycie.

## [1.4.9] - Form Improvements - 2026-05-22
### Zmieniono (UX/Backend)
- **Formularz Kontaktowy:** Dodano atrybut `spellcheck="true"` do pól tekstowych (imię, wiadomość), aby przeglądarka sprawdzała pisownię.
- **FormSubmit:** Wyłączono captchę (`_captcha: "false"`) w żądaniu AJAX, co poprawia niezawodność wysyłania formularza (szczególnie lokalnie).

## [1.4.8] - Email Validation - 2026-05-22
### Dodano (Validation)
- **Formularz Kontaktowy:** Dodano walidację adresu email w JavaScript (Regex) przed wysłaniem formularza, aby upewnić się, że format jest poprawny.

## [1.4.7] - Form Reset Feature - 2026-05-22
### Dodano (Interaction)
- **Formularz Kontaktowy:** Dodano przycisk "Wyślij kolejną wiadomość" w oknie potwierdzenia.
- **Logika:** Zmieniono sposób wyświetlania sukcesu – zamiast nadpisywać HTML, ukrywamy pola formularza, co pozwala na ich przywrócenie i zresetowanie bez przeładowania strony.

## [1.4.6] - Form Success UI - 2026-05-22
### Zmieniono (UI)
- **Formularz Kontaktowy:** Zastąpiono prosty tekst podziękowania stylizowaną kartą (`.form-success`).
- **Animacja:** Dodano efekt `popIn` (lekkie powiększenie) przy wyświetlaniu potwierdzenia wysłania.

## [1.4.5] - Privacy Policy - 2026-05-22
### Dodano (Legal)
- **Polityka Prywatności:** Utworzono plik `privacy.html` z treścią wymaganą przez RODO (Administrator, Cookies, Prawa użytkownika).
- **Cookie Banner:** Dodano pasek zgody na cookies na dole strony (Glassmorphism).
- **Logika:** Baner pojawia się tylko nowym użytkownikom i znika po kliknięciu "Akceptuję" (zapis w `localStorage`).

## [1.4.4] - SEO Files - 2026-05-22
### Dodano (SEO)
- **robots.txt:** Plik instruujący roboty indeksujące, które części strony mogą odwiedzać.
- **sitemap.xml:** Mapa witryny w formacie XML, ułatwiająca indeksowanie przez Google.

## [1.4.3] - Glitch Effect - 2026-05-22
### Dodano (Interaction)
- **Glitch Effect:** Dodano efekt cyfrowych zakłóceń (aberracja chromatyczna + clip-path) dla słowa "Enterprise" w nagłówku po najechaniu myszką.
- **Refaktoryzacja:** Przeniesiono kolor akcentu z inline style do klasy `.glitch-text`.

## [1.4.2] - Header Animation - 2026-05-22
### Zmieniono (Animation)
- **Hero Section:** Dodano animację wjazdu z prawej strony (`slide-in-right`) dla tekstu "Digital Enterprise Solutions".
- **Timing:** Dodano opóźnienie (`transition-delay: 0.5s`), aby tekst pojawiał się chwilę po głównym nagłówku.

## [1.4.1] - Typography Update - 2026-05-22
### Zmieniono (Design)
- **Typografia:** Zmieniono czcionkę na całej stronie na **Montserrat** (zastępując Poppins i Inter).
- **Spójność:** Zaktualizowano importy Google Fonts oraz style CSS dla nagłówków, tekstu głównego i elementów specjalnych.

## [1.4.0] - Rebranding Enterprise - 2026-05-22
### Zmieniono (Branding)
- **Nazwa:** Zmiana nazwy strony na "Enterprise" w tytule, meta tagach i manifeście PWA.
- **Social Media:** Zaktualizowano `og:image` na zdjęcie z nagłówka (kodowanie), aby linki wyglądały spójnie przy udostępnianiu.
- **Hero Section:** Dodano stylowy tekst "Digital Enterprise Solutions" po prawej stronie nagłówka (widoczny na desktopie).

## [1.3.5] - Animated Counters - 2026-05-22
### Dodano (Features)
- **Liczniki (Stats):** Dodano sekcję ze statystykami (Projekty, Doświadczenie, Klienci).
- **Animacja:** Liczby odliczają od zera do wartości docelowej po przewinięciu strony (IntersectionObserver + requestAnimationFrame).

## [1.3.4] - Typewriter Effect - 2026-05-22
### Dodano (Animation)
- **Typewriter Effect:** Dodano animację pisania na maszynie dla głównego nagłówka H1 w sekcji Hero.
- **Kursor:** Dodano migający kursor (`|`) za pomocą CSS (`::after` i `@keyframes blink`).

## [1.3.3] - Hero Parallax - 2026-05-22
### Zmieniono (Design)
- **Sekcja Hero:** Dodano tło z motywem programistycznym (zdjęcie kodu) oraz efekt paralaksy (`background-attachment: fixed`).
- **Kontrast:** Zastosowano ciemną nakładkę (overlay) na zdjęcie oraz wymuszono biały kolor tekstu w nagłówku dla lepszej czytelności.

## [1.3.2] - Glassmorphism - 2026-05-22
### Zmieniono (UI)
- **Nawigacja:** Dodano efekt "frosted glass" (matowe szkło) do paska nawigacji przy przewijaniu. Wykorzystano `backdrop-filter: blur(10px)` oraz półprzezroczyste tło.

## [1.3.1] - Menu Animation - 2026-05-22
### Zmieniono (UI)
- **Animacja Menu:** Dodano płynne rozwijanie (slide-down) i zanikanie (fade-in) menu mobilnego zamiast nagłego pojawiania się.

## [1.3.0] - Hamburger Menu - 2026-05-22
### Dodano (Mobile)
- **Menu Hamburger:** Zastąpiono listę przycisków na telefonach rozwijanym menu.
- **Interakcja:** Kliknięcie w ikonę `☰` rozwija menu i zmienia ikonę na `✕`.

## [1.2.6] - Mobile UX Fixes - 2026-05-22
### Zmieniono (Mobile)
- **Nawigacja:** Na małych ekranach logo i przyciski układają się teraz w kolumnie (jeden pod drugim), co zapobiega ich nakładaniu się.
- **Scroll Top:** Ukryto przycisk "Powrót do góry" na urządzeniach mobilnych (zgodnie z życzeniem).

## [1.2.5] - Sticky Navigation - 2026-05-22
### Dodano
- **Nawigacja (UI):** Pasek nawigacji jest teraz przyklejony (`sticky`) do góry ekranu.
- **Efekt Scrolla:** Dodano cień (`box-shadow`) i tło do nawigacji po przewinięciu strony, aby oddzielić ją od treści.

## [1.2.4] - Bugfix UI - 2026-05-22
### Naprawiono
- **Hover przycisku Udostępnij:** Usunięto konflikt stylów (ID vs Class), który blokował zmianę koloru tła po najechaniu myszką.
- **Spójność:** Dodano `background-color: transparent`, `cursor: pointer` i `font-family: inherit` do klasy `.btn-sm`, aby przyciski `<button>` wyglądały i zachowywały się identycznie jak linki `<a>`.

## [1.2.3] - UI Consistency - 2026-05-22
### Zmieniono
- **Spójność (UI):** Zastosowano efekt hover (zmiana tła na kolor akcentu) dla wszystkich elementów klasy `.btn-sm` (w tym przycisku "Napisz do mnie"), usuwając zduplikowany kod CSS.

## [1.2.2] - UI Improvements - 2026-05-22
### Zmieniono
- **Interakcje (UI):** Dodano efekt hover (zmiana tła na kolor akcentu) oraz płynne przejście (`transition`) dla przycisku "Udostępnij".

## [1.2.1] - Refaktoryzacja - 2026-05-22
### Zmieniono
- **Czystość kodu:** Przeniesiono wszystkie pozostałe style inline (przycisk "Udostępnij") do pliku `style.css`.

## [1.2.0] - Dark Mode - 2026-05-22
### Dodano (New Features)
- **Ciemny Motyw (Dark Mode):** Pełna obsługa trybu ciemnego oparta na zmiennych CSS (`:root` vs `[data-theme="dark"]`).
- **Przełącznik Motywu:** Przycisk w nagłówku (ikona słońca/księżyca) z zapamiętywaniem wyboru w `localStorage`.
- **Animacje (UI):** Dodano płynne przejścia (`transition`) kolorów tła oraz animację obrotu (360°) ikony zmiany motywu.

## [1.1.0] - Optymalizacja i Czystość Kodu - 2026-05-21
### Zmieniono (Ulepszenia)
- **Separacja kodu:** Wydzielono kod JavaScript z `index.html` do osobnego pliku `script.js`. Ułatwia to zarządzanie i cache'owanie.
- **Refaktoryzacja CSS:** Przeniesiono style inline ze stopki do pliku `style.css` dla zachowania czystości kodu.
- **Wygląd (UI):** Zmieniono układ stopki na elastyczny (Flexbox) – elementy układają się obok siebie lub jeden pod drugim w zależności od szerokości ekranu.
- **Wydajność (Performance):**
  - Dodano atrybut `defer` do ładowania skryptu (nie blokuje renderowania strony).
  - Zastosowano **Event Delegation** dla linków (jeden nasłuchiwacz zamiast wielu).
  - Zastosowano **Throttling (requestAnimationFrame)** dla zdarzenia scroll (przycisk "Powrót do góry" nie obciąża procesora).

## [1.0.0] - Wersja Bazowa (MVP)
### Funkcjonalności (Features)
- **Struktura HTML5:** Semantyczny podział na sekcje (Header, Hero, O mnie, Usługi, Portfolio, Kontakt, Footer).
- **PWA (Progressive Web App):**
  - Dodano plik `manifest.json` (możliwość instalacji na telefonie).
  - Zdefiniowano kolory motywu (`theme-color`).
- **SEO i Social Media:**
  - Meta tagi Open Graph (tytuł, opis, zdjęcie dla Facebooka/LinkedIn).
  - Favicon.
- **Interakcje (JavaScript):**
  - **Smooth Scroll:** Płynne przewijanie do sekcji po kliknięciu w menu.
  - **Scroll Top:** Przycisk powrotu do góry pojawiający się po przewinięciu 300px.
  - **Fade-in Animation:** Elementy pojawiają się płynnie podczas przewijania (IntersectionObserver).
  - **Udostępnianie:** Obsługa Web Share API (natywne udostępnianie na telefonach) z fallbackiem do kopiowania linku.
- **Formularz Kontaktowy:**
  - Wysyłka AJAX (bez przeładowania strony) przez FormSubmit.
  - Automatyczne formatowanie numeru telefonu (spacje co 3 cyfry).
  - Walidacja danych przed wysyłką.

### Wygląd (Design)
- Fonty: Poppins (nagłówki) i Inter (tekst).
- Responsywność (RWD): Dostosowanie do urządzeń mobilnych.

---

## Do zrobienia w przyszłości (Roadmap)
- [ ] Minifikacja plików CSS i JS (dla jeszcze szybszego ładowania).
- [ ] Dodanie polityki prywatności (wymagane przy formularzach).