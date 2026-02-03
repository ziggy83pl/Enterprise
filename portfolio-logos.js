document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('global-trusted-logos');
    if (!container) return;

    const projects = [
        {
            name: "Doners Kebab",
            url: "https://www.facebook.com/DonersLomza",
            img: "https://ziggy83pl.github.io/zasoby/logo/doners_kebab.webp",
            title: "Doners Kebab Łomża",
            label: "Kebab",
            color: "#e67e22"
        },
        {
            name: "Prodom",
            url: "https://ziggy83pl.github.io/Prodom-budownictwo/",
            img: "https://ziggy83pl.github.io/zasoby/logo/prodom.webp",
            title: "PRODOM BUDOWNICTWO",
            label: "Budowa",
            color: "#3498db"
        },
        {
            name: "Siepomaga",
            url: "https://www.siepomaga.pl",
            img: "https://ziggy83pl.github.io/zasoby/logo/siepomaga.webp",
            title: "Wspieramy Siepomaga.pl",
            label: "Pomoc",
            color: "#e74c3c"
        },
        {
            name: "Paweł Szczęsny",
            url: "https://ziggy83pl.github.io/PawelSzczesny/index.html",
            img: "https://ziggy83pl.github.io/zasoby/logo/pawel.webp",
            title: "CZŁOWIEK, KTÓRY WYKONA WSZYSTKO",
            label: "Remonty",
            color: "#34495e"
        },
        {
            name: "Enterprise",
            url: "https://ziggy83pl.github.io/coder/",
            img: "https://ziggy83pl.github.io/zasoby/logo/enterprise.webp", 
            title: "Enterprise - Strony WWW",
            label: "Strony WWW",
            color: "#10b981"
        },
        {
            name: "Rentmaster",
            url: "https://ziggy83pl.github.io/rentmaster/",
            img: "https://ziggy83pl.github.io/zasoby/logo/rentmaster.webp",
            title: "RentMaster - Wynajem",
            label: "Wynajem",
            color: "#1a2a6c"
        }
    ];

    // Pobieramy aktualną ścieżkę (np. "/coder/index.html")
    const currentPath = window.location.pathname.toLowerCase();

    let html = '';
    projects.forEach(project => {
        const urlObj = new URL(project.url);
        const projectPathSegment = urlObj.pathname.split('/').filter(p => p).pop()?.toLowerCase();

        // SPRAWDZANIE: Czy to aktualna strona?
        // 1. Sprawdź URL (dla GitHub Pages) LUB 2. Sprawdź Tytuł strony (dla localhost/serwerów lokalnych)
        const isCurrentSite = (projectPathSegment && currentPath.includes(`/${projectPathSegment}/`)) || document.title.toLowerCase().includes(project.name.toLowerCase());

        if (!isCurrentSite) {
            html += `
                <a href="${project.url}" target="_blank" class="logo-tooltip" data-tooltip="${project.title}">
                    <img src="${project.img}" alt="${project.name}" style="--hover-color: ${project.color}" onerror="this.style.display='none'">
                    <span class="logo-label">${project.label}</span>
                </a>`;
        }
    });

    container.innerHTML = html;
});