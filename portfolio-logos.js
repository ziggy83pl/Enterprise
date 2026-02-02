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
            url: "https://ziggy83pl.github.io/Enterprise/", // Poprawiony URL
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

    const currentUrl = window.location.href.toLowerCase();

    let html = '';
    projects.forEach(project => {
        // --- KLUCZOWA ZMIANA: Sprawdzanie czy nazwa lub fragment URL projektu jest w adresie przeglądarki ---
        const projectSlug = project.name.toLowerCase().replace(/\s/g, ''); // np. "enterprise"
        const projectUrlPart = project.url.toLowerCase();

        // Sprawdzamy, czy aktualny adres strony NIE zawiera nazwy projektu ani jego URL
        const isCurrentSite = currentUrl.includes(projectSlug) || currentUrl.includes("enterprise");

        if (!isCurrentSite) {
            html += `
                <a href="${project.url}" target="_blank" title="${project.title}">
                    <img src="${project.img}" alt="${project.name}" onerror="this.style.display='none'">
                </a>`;
        }
    });

    container.innerHTML = html;
});


});
