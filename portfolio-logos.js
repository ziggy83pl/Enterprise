document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('global-trusted-logos');
    if (!container) return;

    const projects = [
        {
            name: "Doners Kebab",
            url: "https://www.facebook.com/DonersLomza",
            img: "https://ziggy83pl.github.io/zasoby/logo/doners_kebab.webp",
            title: "Doners Kebab Łomża"
        },
        {
            name: "Prodom",
            url: "https://ziggy83pl.github.io/Prodom-budownictwo/",
            img: "https://ziggy83pl.github.io/zasoby/logo/prodom.webp",
            title: "PRODOM BUDOWNICTWO"
        },
        {
            name: "Siepomaga",
            url: "https://www.siepomaga.pl",
            img: "https://ziggy83pl.github.io/zasoby/logo/siepomaga.webp",
            title: "Wspieramy Siepomaga.pl"
        },
        {
            name: "Paweł Szczęsny",
            url: "https://ziggy83pl.github.io/PawelSzczesny/index.html",
            img: "https://ziggy83pl.github.io/zasoby/logo/pawel.webp",
            title: "CZŁOWIEK, KTÓRY WYKONA WSZYSTKO"
        },
        {
            name: "Enterprise",
            url: "https://ziggy83pl.github.io/Enterprise/",
            img: "https://ziggy83pl.github.io/zasoby/logo/enterprise.webp", 
            title: "Enterprise - Strony WWW"
        },
        {
            name: "Rentmaster",
            url: "https://ziggy83pl.github.io/rentmaster/",
            img: "https://ziggy83pl.github.io/zasoby/logo/rentmaster.webp",
            title: "RentMaster - Wynajem"
        }
    ];

    // Pobieramy aktualną ścieżkę (np. "/Enterprise/index.html")
    const currentPath = window.location.pathname.toLowerCase();

    let html = '';
    projects.forEach(project => {
        // Wyciągamy ostatni segment z URL projektu (np. "prodom-budownictwo" lub "enterprise")
        const urlObj = new URL(project.url.startsWith('http') ? project.url : 'https://' + project.url);
        const projectPathSegment = urlObj.pathname.split('/').filter(p => p).pop()?.toLowerCase();

        // SPRAWDZANIE: Czy aktualna ścieżka zawiera nazwę folderu projektu?
        // Dodatkowo sprawdzamy czy to nie jest strona główna (jeśli folder jest pusty)
        const isCurrentSite = projectPathSegment && currentPath.includes('/' + projectPathSegment + '/');

        if (!isCurrentSite) {
            html += `
                <a href="${project.url}" target="_blank" title="${project.title}">
                    <img src="${project.img}" alt="${project.name}" 
                         style="max-width: 120px; margin: 10px; transition: transform 0.3s;"
                         onmouseover="this.style.transform='scale(1.1)'"
                         onmouseout="this.style.transform='scale(1)'"
                         onerror="this.style.display='none'">
                </a>`;
        }
    });

    container.innerHTML = html;
});
