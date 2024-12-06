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
                const loader = tempDiv.querySelector('.loader');
                if (loader)
                {
                    loader.remove();
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

function showSidebar()
{
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar()
{
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/translations.json')
        .then(response => response.json())
        .then((translations) => {
            function changeLanguage(language) {
                const elements = document.querySelectorAll('[data-id]');
                elements.forEach((element) => {
                    const key = element.getAttribute('data-id');
                    if (translations[language][key]) {
                        element.textContent = translations[language][key];
                    }
                });
            }
            const languageSelector = document.getElementById('languageSelector');


            languageSelector.addEventListener('change', (event) => {
                const selectedLanguage = event.target.value;
                changeLanguage(selectedLanguage);
            });

            const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
            document.querySelector(".change-lang").value = savedLanguage;
            applyLanguage(savedLanguage);
            changeLanguage(savedLanguage);
        })
        .catch(error => console.error('Error loading translations:', error));
});

const translations2 = {
    en: {
        joinUsTitle: "Join Our Community",
        joinUsContent: "Become part of a vibrant community of artists, photographers, and creatives. Share your own works, discover new talents, and engage with others through comments and collaborations. Whether you're an artist or an enthusiast, there's a place for you here. <a href='contact.html'>Contact us</a> for more information about joining our gallery.",
        categoriesTitle: "Explore Our Categories",
        categoriesContent: "In addition to our diverse gallery, we offer specialized categories to inspire your creativity:",
        animeCategory: "<strong>Anime</strong>: Immerse yourself in a world of vibrant and dynamic anime-inspired artwork. Whether you’re a fan of traditional anime or modern interpretations, this collection brings characters and scenes to life in vivid detail.",
        nightCategory: "<strong>Night</strong>: Explore the mystical beauty of the night in our 'Night' category. From starlit skies to cityscapes illuminated by moonlight, this collection showcases the enchanting allure of the world after dark.",
        teamMember1 : "<strong>Ayxan Iskender</strong> – Programmer",
        teamMember2 : "<strong>John Doe</strong> – Founder & CEO",
        teamMember3 : "<strong>Jane Smith</strong> – Creative Director",
        teamMember4 : "<strong>Michael Brown</strong> – Technical Lead",
        teamMember5 : "<strong>Sarah Lee</strong> – Marketing Manager",

    },
    ru: {
        joinUsTitle: "Присоединяйтесь к нашему сообществу",
        joinUsContent: "Станьте частью яркого сообщества художников, фотографов и творцов. Делитесь своими работами, открывайте новые таланты и общайтесь с другими через комментарии и совместные проекты. Независимо от того, художник вы или любитель, здесь найдется место и для вас. <a href='contact.html'>Свяжитесь с нами</a>, чтобы узнать больше о том, как присоединиться к нашей галерее.",
        categoriesTitle: "Исследуйте наши категории",
        categoriesContent: "Помимо разнообразной галереи, мы предлагаем специализированные категории для вдохновения вашего творчества:",
        animeCategory: "<strong>Аниме</strong>: Погрузитесь в мир яркого и динамичного искусства, вдохновленного аниме. Будь то традиционные аниме или современные интерпретации, эта коллекция оживляет персонажей и сцены в ярких деталях.",
        nightCategory: "<strong>Ночь</strong>: Исследуйте мистическую красоту ночи в нашей категории 'Ночь'. От звездного неба до городских пейзажей, освещенных лунным светом, эта коллекция демонстрирует чарующую привлекательность мира после наступления темноты.",
        teamMember1 : "<strong>Ayxan Iskender</strong> – Программист",
        teamMember2 : "<strong>John Doe</strong> – Основатель и генеральный директор",
        teamMember3 : "<strong>Jane Smith</strong> – Креативный Директор",
        teamMember4 : "<strong>Michael Brown</strong> – Технический руководитель",
        teamMember5 : "<strong>Sarah Lee</strong> – Менеджер по маркетингу",

    },
    az: {
        joinUsTitle: "Cəmiyyətimizə qoşulun",
        joinUsContent: "Rəssamlar, fotoqraflar və yaradıcı şəxslərdən ibarət canlı icmanın bir hissəsi olun. Öz işlərinizi paylaşın, yeni istedadları kəşf edin və şərhlər və əməkdaşlıqlar vasitəsilə başqaları ilə əlaqə qurun. İncəsənət həvəskarısınızsa, burada sizin üçün bir yer var. Qalereyamıza qoşulmaq haqqında daha çox məlumat üçün <a href='contact.html'>əlaqə saxlayın</a>.",
        categoriesTitle: "Kateqoriyalarımızı araşdırın",
        categoriesContent: "Müxtəlif qalereyamızdan əlavə, yaradıcılığınızı ilhamlandırmaq üçün ixtisaslaşmış kateqoriyalar təklif edirik:",
        animeCategory: "<strong>Anime</strong>: Rəngarəng və dinamik anime-inspirə edilmiş incəsənət dünyasına qərq olun. İstər ənənəvi anime, istərsə də müasir interpretasiyalar olsun, bu kolleksiya personajları və səhnələri canlı detallarla canlandırır.",
        nightCategory: "<strong>Gecə</strong>: Gecənin mistik gözəlliyini 'Gecə' kateqoriyamızda araşdırın. Ulduzlu səmalardan ay işığı ilə işıqlandırılmış şəhər mənzərələrinə qədər, bu kolleksiya qaranlıqdan sonrakı dünyanın cazibədar cazibəsini nümayiş etdirir.",
        teamMember1 : "<strong>Ayxan Iskender</strong> – Proqramçı",
        teamMember2 : "<strong>John Doe</strong> – Təsisçi və CEO",
        teamMember3 : "<strong>Jane Smith</strong> – Kreativ Direktor",
        teamMember4 : "<strong>Michael Brown</strong> – Texniki Rəhbər",
        teamMember5 : "<strong>Sarah Lee</strong> – Marketinq Meneceri",

    }
};
document.querySelector(".change-lang").addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("selectedLanguage", selectedLanguage);
    applyLanguage(selectedLanguage);
});

function applyLanguage(language) {
    document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (translations2[language][key]) {
            element.innerHTML = translations2[language][key];
        }
    });
}


const button = document.querySelector("#send");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");

let timer1, timer2;

button.addEventListener("click", () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 5000);

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
});

closeIcon.addEventListener("click", () => {

    toast.classList.remove("active");

    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
});

fetch('/data/translations.json')
    .then(response => response.json())
    .then(translations => {
        // Используйте объект translations как раньше
        console.log(translations);
    })
    .catch(error => console.error('Error loading translations:', error));
