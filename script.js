document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');
    const loadContent = (page) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${page}.html`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = xhr.responseText;
                const header = tempDiv.querySelector('header');
                if (header) {
                    header.remove();
                }
                const footer = tempDiv.querySelector('footer');
                if (footer) {
                    footer.remove();
                }
                contentArea.innerHTML = tempDiv.innerHTML;

            } else {
                contentArea.innerHTML = '<p>Ошибка при загрузке контента.</p>';
            }
        };

        xhr.onerror = function () {
            contentArea.innerHTML = '<p>Ошибка при подключении.</p>';
        };

        xhr.send();
    };

    navLinks.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            const page = e.target.getAttribute('data-page');
            loadContent(page);
        });
    });
});


document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    const translation = translations[lang];
    if (translation) {
        document.getElementById('site-title').textContent = translation.siteTitle;
        document.getElementById('welcome-title').textContent = translation.welcomeTitle;
        document.getElementById('welcome-text').textContent = translation.welcomeText;
        document.getElementById('featured-title').textContent = translation.featuredTitle;
        document.getElementById('featured-text').textContent = translation.featuredText;
    }
}
const scrollToTop = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
function openFullscreen(img) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');

    fullscreenImage.src = img.src;

    fullscreenContainer.style.display = 'flex';
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
}
const checkbox = document.getElementById('check-apple');

const translations = {
    en: {
        siteTitle: "Web Gallery",
        welcomeTitle: "Welcome to Our Web Gallery",
        welcomeText: "Explore a collection of stunning images, showcasing everything from breathtaking landscapes to intricate artwork. Our gallery is curated to offer you a visual journey like no other. Whether you are here for inspiration or just to enjoy the beauty of the world around us, we hope you find something that sparks joy!",
        featuredTitle: "Featured Collection",
        featuredText: "Our featured collection this month highlights 'Nature in Motion' — a series of photographs showcasing the dynamic beauty of nature. From the movement of the wind to the rush of water, these images capture nature's ever-changing landscapes. Take a moment to explore this collection and connect with the raw beauty of our planet."
    },
    ru: {
        siteTitle: "Веб Галерея",
        welcomeTitle: "Добро пожаловать в нашу Веб Галерею",
        welcomeText: "Исследуйте коллекцию потрясающих изображений, от захватывающих дух пейзажей до замысловатых произведений искусства. Наша галерея создана для того, чтобы предложить вам визуальное путешествие, не похожее ни на одно другое. Мы надеемся, что вы найдете что-то, что принесет радость!",
        featuredTitle: "Избранная коллекция",
        featuredText: "Избранная коллекция этого месяца под названием 'Природа в движении' демонстрирует динамическую красоту природы. От движения ветра до стремительного потока воды — эти изображения захватывают вечно меняющиеся ландшафты природы. Познакомьтесь с этой коллекцией и насладитесь первозданной красотой нашей планеты."
    }
};


const text1Element = document.getElementById('gallery-highlight');
const text2Element = document.getElementById('text-2');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        text1Element.textContent = translations.en.featuredText;
        text2Element.textContent = translations.en.text2;
    } else {
        text1Element.textContent = translations.ru.featuredText;
        text2Element.textContent = translations.ru.text2;
    }
});
