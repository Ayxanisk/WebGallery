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
    // const translations = {
    //     en: {
    //         welcomeTitle: "Welcome to Our Web Gallery",
    //         welcomeText: "Explore a collection of stunning images, showcasing everything from breathtaking landscapes to intricate artwork...",
    //         welcomeText2: "We believe in the power of visuals to connect people and tell stories. Dive into our gallery and let your imagination wander through each photo, every detail captured with passion and purpose.",
    //         featuredCollectionTitle: "Featured Collection",
    //         featuredCollectionText: "Our featured collection this month highlights 'Nature in Motion'...",
    //         aboutTitle: "About Us",
    //         aboutIntro: "Welcome to Web Gallery! We are a passionate team dedicated to showcasing the beauty of visual art, photography, and creativity. Our mission is to create a platform where people can share, discover, and enjoy high-quality images from artists around the world.",
    //         visionTitle: "Our Vision",
    //         visionText: "We believe that art has the power to inspire, connect, and change the world. Our goal is to make art accessible to everyone, regardless of location or background. Through our gallery, we aim to foster creativity and inspire new ideas among artists and art lovers alike.",
    //         teamTitle: "Meet the Team",
    //         teamIntro: "Our team is made up of individuals who are passionate about art, design, and technology. We work together to bring the best gallery experience to you.",
    //         storyTitle: "Our Story",
    //         storyText: "Web Gallery was founded in 2020 with the goal of providing a space for emerging and established artists to showcase their work. We started as a small community of artists, and over time, we’ve grown into a global platform. Today, we continue to grow, evolve, and innovate with the help of our incredible team and users.",
    //         nightTitle:"Night Wallpapers",
    //         nightText:"Check out our gallery of images.",
    //         animeTitle:"Anime Wallpapers",
    //         animeText:"Check out our gallery of images.",
    //         galleryTitle:"Wallpapers",
    //         galleryText:"Check out our gallery of images.",
    //         contactTitle: "Contact Us",
    //         contactText: "If you have any questions, feedback, or inquiries, feel free to reach out to us! We would love to hear from you and will respond as soon as possible.",
    //         contactInfo: "Get in touch",
    //         sendMessage:"Send us a message:",
    //         message:"Success",
    //         messageText:"Message are sent",
    //         name:"Your Name",
    //         email:"Your Email",
    //         yourMessage: "Your Message",
    //         button:"Send Message",
    //         joinUsTitle: "Join Our Community",
    //         joinUsContent: "Become part of a vibrant community of artists, photographers, and creatives. Share your own works, discover new talents, and engage with others through comments and collaborations. Whether you're an artist or an enthusiast, there's a place for you here. <a href='contact.html'>Contact us</a> for more information about joining our gallery.",
    //         categoriesTitle: "Explore Our Categories",
    //         categoriesContent: "In addition to our diverse gallery, we offer specialized categories to inspire your creativity:",
    //         animeCategory: "<strong>Anime</strong>: Immerse yourself in a world of vibrant and dynamic anime-inspired artwork. Whether you’re a fan of traditional anime or modern interpretations, this collection brings characters and scenes to life in vivid detail.",
    //         nightCategory: "<strong>Night</strong>: Explore the mystical beauty of the night in our 'Night' category. From starlit skies to cityscapes illuminated by moonlight, this collection showcases the enchanting allure of the world after dark.",
    //         teamMember1 : "<strong>Ayxan Iskender</strong> – Programmer",
    //         teamMember2 : "<strong>John Doe</strong> – Founder & CEO",
    //         teamMember3 : "<strong>Jane Smith</strong> – Creative Director",
    //         teamMember4 : "<strong>Michael Brown</strong> – Technical Lead",
    //         teamMember5 : "<strong>Sarah Lee</strong> – Marketing Manager",
    //     },
    //     ru: {
    //         welcomeTitle: "Добро пожаловать в нашу веб-галерею",
    //         welcomeText: "Исследуйте коллекцию потрясающих изображений, от захватывающих пейзажей до сложных произведений искусства...",
    //         welcomeText2: "Мы верим в силу визуальных образов, которые объединяют людей и рассказывают истории. Погрузитесь в нашу галерею и позвольте своему воображению блуждать по каждой фотографии, каждой детали, запечатленной со страстью и целью.",
    //         featuredCollectionTitle: "Рекомендуемая коллекция",
    //         featuredCollectionText: "Рекомендуемая коллекция этого месяца — 'Природа в движении'...",
    //         aboutTitle: "О нас",
    //         aboutIntro: "Добро пожаловать в Web Gallery! Мы — команда, которая увлечена искусством, фотографией и творчеством. Наша миссия — создать платформу, где люди могут делиться, открывать и наслаждаться качественными изображениями от художников со всего мира.",
    //         visionTitle: "Наше видение",
    //         visionText: "Мы верим, что искусство обладает силой вдохновлять, объединять и менять мир. Наша цель — сделать искусство доступным каждому, независимо от местоположения или происхождения. Через нашу галерею мы стремимся развивать творчество и вдохновлять новые идеи среди художников и любителей искусства.",
    //         teamTitle: "Наша команда",
    //         teamIntro: "Наша команда состоит из людей, которые увлечены искусством, дизайном и технологиями. Мы работаем вместе, чтобы обеспечить вам лучший опыт в галерее.",
    //         storyTitle: "Наша история",
    //         storyText: "Web Gallery была основана в 2020 году с целью предоставить пространство для начинающих и известных художников, чтобы демонстрировать свои работы. Мы начали как небольшое сообщество художников, а со временем стали глобальной платформой. Сегодня мы продолжаем расти, развиваться и внедрять инновации с помощью нашей невероятной команды и пользователей.",
    //         nightTitle:"Ночные обои",
    //         nightText:"Посмотрите нашу галерею изображений.",
    //         animeTitle:"Аниме обои",
    //         animeText:"Посмотрите нашу галерею изображений.",
    //         galleryTitle:"Обои",
    //         galleryText:"Посмотрите нашу галерею изображений.",
    //         contactTitle: "Свяжитесь с нами",
    //         contactText: "Если у вас есть вопросы, отзывы или запросы, не стесняйтесь обращаться к нам! Мы будем рады услышать вас и ответим как можно скорее.",
    //         contactInfo: "Связаться с нами",
    //         sendMessage: "Отправьте нам сообщение:",
    //         message: "Успех",
    //         messageText: "Сообщение отправлено",
    //         name: "Ваше имя",
    //         email: "Ваш email",
    //         yourMessage: "Ваше сообщение",
    //         button:"Отправить сообщение",
    //         joinUsTitle: "Присоединяйтесь к нашему сообществу",
    //         joinUsContent: "Станьте частью яркого сообщества художников, фотографов и творцов. Делитесь своими работами, открывайте новые таланты и общайтесь с другими через комментарии и совместные проекты. Независимо от того, художник вы или любитель, здесь найдется место и для вас. <a href='contact.html'>Свяжитесь с нами</a>, чтобы узнать больше о том, как присоединиться к нашей галерее.",
    //         categoriesTitle: "Исследуйте наши категории",
    //         categoriesContent: "Помимо разнообразной галереи, мы предлагаем специализированные категории для вдохновения вашего творчества:",
    //         animeCategory: "<strong>Аниме</strong>: Погрузитесь в мир яркого и динамичного искусства, вдохновленного аниме. Будь то традиционные аниме или современные интерпретации, эта коллекция оживляет персонажей и сцены в ярких деталях.",
    //         nightCategory: "<strong>Ночь</strong>: Исследуйте мистическую красоту ночи в нашей категории 'Ночь'. От звездного неба до городских пейзажей, освещенных лунным светом, эта коллекция демонстрирует чарующую привлекательность мира после наступления темноты.",
    //         teamMember1 : "<strong>Ayxan Iskender</strong> – Программист",
    //         teamMember2 : "<strong>John Doe</strong> – Основатель и генеральный директор",
    //         teamMember3 : "<strong>Jane Smith</strong> – Креативный Директор",
    //         teamMember4 : "<strong>Michael Brown</strong> – Технический руководитель",
    //         teamMember5 : "<strong>Sarah Lee</strong> – Менеджер по маркетингу",
    //     },
    //     az: {
    //         welcomeTitle: "Veb Qalereyamıza xoş gəlmisiniz",
    //         welcomeText: "Gözəl mənzərələrdən incə sənət əsərlərinə qədər möhtəşəm təsvirlər toplusunu araşdırın...",
    //         welcomeText2: "İnsanları birləşdirən və hekayələr izah edən vizualların gücünə inanırıq. Qalereyamıza daxil olun və təxəyyülünüzün hər bir fotoşəkildə, ehtiras və məqsədlə çəkilmiş hər bir detalda dolaşmasına icazə verin.",
    //         featuredCollectionTitle: "Seçilmiş Kolleksiya",
    //         featuredCollectionText: "Bu ayın seçilmiş kolleksiyası 'Hərəkətdə Təbiət'...",
    //         aboutTitle: "Haqqımızda",
    //         aboutIntro: "Web Gallery-ə xoş gəlmisiniz! Biz, vizual sənət, fotoqrafiya və yaradıcılıq gözəlliyini nümayiş etdirməyə həsr olunmuş həvəsli bir komandayıq. Missiyamız insanlara dünyanın müxtəlif yerlərindən olan rəssamların yüksək keyfiyyətli təsvirlərini bölüşmək, kəşf etmək və zövq almaq üçün platforma yaratmaqdır.",
    //         visionTitle: "Bizim Baxışımız",
    //         visionText: "Biz inanırıq ki, sənətin ilhamlandırmaq, birləşdirmək və dünyanı dəyişmək gücü var. Məqsədimiz sənəti hər kəs üçün əlçatan etməkdir, yer və ya mənşəyindən asılı olmayaraq. Qalereyamız vasitəsilə sənətçilər və sənət sevərlər arasında yaradıcılığı inkişaf etdirmək və yeni ideyaları ruhlandırmaq niyyətindəyik.",
    //         teamTitle: "Komandamız",
    //         teamIntro: "Komandamız sənət, dizayn və texnologiya ilə maraqlanan şəxslərdən ibarətdir. Sizə ən yaxşı qalereya təcrübəsini təqdim etmək üçün birlikdə çalışırıq.",
    //         storyTitle: "Bizim Hekayəmiz",
    //         storyText: "Web Gallery 2020-ci ildə təsis edilib və məqsədi inkişaf etməkdə olan və tanınmış rəssamların əsərlərini nümayiş etdirmək üçün yer təmin etmək olub. Biz kiçik bir sənətçi icması olaraq başladıq və zamanla qlobal bir platformaya çevrildik. Bu gün inanılmaz komandamızın və istifadəçilərimizin köməyi ilə böyüməyə, inkişaf etməyə və innovasiya etməyə davam edirik.",
    //         nightTitle:"Gecə divar kağızları",
    //         nightText:"Şəkillər qalereyamıza baxın.",
    //         animeTitle:"Anime divar kağızları",
    //         animeText:"Şəkillər qalereyamıza baxın.",
    //         galleryTitle:"Divar kağızları",
    //         galleryText:"Şəkillər qalereyamıza baxın.",
    //         contactTitle: "Bizimlə əlaqə",
    //         contactText: "Hər hansı bir sualınız, rəyiniz və ya sorğunuz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin! Sizi eşitməkdən məmnun olarıq və ən qısa zamanda cavab verəcəyik.",
    //         contactInfo: "Əlaqə saxlayın",
    //         sendMessage: "Bizə mesaj göndərin:",
    //         message: "Uğur",
    //         messageText: "Mesaj göndərildi",
    //         name: "Adınız",
    //         email: "E-poçtunuz",
    //         yourMessage: "Mesajınız",
    //         button:"Mesaj göndər",
    //         joinUsTitle: "Cəmiyyətimizə qoşulun",
    //         joinUsContent: "Rəssamlar, fotoqraflar və yaradıcı şəxslərdən ibarət canlı icmanın bir hissəsi olun. Öz işlərinizi paylaşın, yeni istedadları kəşf edin və şərhlər və əməkdaşlıqlar vasitəsilə başqaları ilə əlaqə qurun. İncəsənət həvəskarısınızsa, burada sizin üçün bir yer var. Qalereyamıza qoşulmaq haqqında daha çox məlumat üçün <a href='contact.html'>əlaqə saxlayın</a>.",
    //         categoriesTitle: "Kateqoriyalarımızı araşdırın",
    //         categoriesContent: "Müxtəlif qalereyamızdan əlavə, yaradıcılığınızı ilhamlandırmaq üçün ixtisaslaşmış kateqoriyalar təklif edirik:",
    //         animeCategory: "<strong>Anime</strong>: Rəngarəng və dinamik anime-inspirə edilmiş incəsənət dünyasına qərq olun. İstər ənənəvi anime, istərsə də müasir interpretasiyalar olsun, bu kolleksiya personajları və səhnələri canlı detallarla canlandırır.",
    //         nightCategory: "<strong>Gecə</strong>: Gecənin mistik gözəlliyini 'Gecə' kateqoriyamızda araşdırın. Ulduzlu səmalardan ay işığı ilə işıqlandırılmış şəhər mənzərələrinə qədər, bu kolleksiya qaranlıqdan sonrakı dünyanın cazibədar cazibəsini nümayiş etdirir.",
    //         teamMember1 : "<strong>Ayxan Iskender</strong> – Proqramçı",
    //         teamMember2 : "<strong>John Doe</strong> – Təsisçi və CEO",
    //         teamMember3 : "<strong>Jane Smith</strong> – Kreativ Direktor",
    //         teamMember4 : "<strong>Michael Brown</strong> – Texniki Rəhbər",
    //         teamMember5 : "<strong>Sarah Lee</strong> – Marketinq Meneceri",
    //     }
    // };

    fetch('/data/translations.json')
        .then(response => response.json())
        .then((translations) => {
            console.log(translations);
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

            document.querySelector(".change-lang").addEventListener("change", (event) => {
                const selectedLanguage = event.target.value;
                localStorage.setItem("selectedLanguage", selectedLanguage);
                applyLanguage(selectedLanguage);
            });

            function applyLanguage(language) {
                document.querySelectorAll("[data-translate]").forEach((element) => {
                    const key = element.getAttribute("data-translate");
                    if (translations[language][key]) {
                        element.innerHTML = translations[language][key];
                    }
                });
            }

            applyLanguage(savedLanguage);
            changeLanguage(savedLanguage);
        })
        .catch(error => console.error('Error loading translations:', error));
});



// const translations2 = {
//     en: {
//         joinUsTitle: "Join Our Community",
//         joinUsContent: "Become part of a vibrant community of artists, photographers, and creatives. Share your own works, discover new talents, and engage with others through comments and collaborations. Whether you're an artist or an enthusiast, there's a place for you here. <a href='contact.html'>Contact us</a> for more information about joining our gallery.",
//         categoriesTitle: "Explore Our Categories",
//         categoriesContent: "In addition to our diverse gallery, we offer specialized categories to inspire your creativity:",
//         animeCategory: "<strong>Anime</strong>: Immerse yourself in a world of vibrant and dynamic anime-inspired artwork. Whether you’re a fan of traditional anime or modern interpretations, this collection brings characters and scenes to life in vivid detail.",
//         nightCategory: "<strong>Night</strong>: Explore the mystical beauty of the night in our 'Night' category. From starlit skies to cityscapes illuminated by moonlight, this collection showcases the enchanting allure of the world after dark.",
//         teamMember1 : "<strong>Ayxan Iskender</strong> – Programmer",
//         teamMember2 : "<strong>John Doe</strong> – Founder & CEO",
//         teamMember3 : "<strong>Jane Smith</strong> – Creative Director",
//         teamMember4 : "<strong>Michael Brown</strong> – Technical Lead",
//         teamMember5 : "<strong>Sarah Lee</strong> – Marketing Manager",
//
//     },
//     ru: {
//         joinUsTitle: "Присоединяйтесь к нашему сообществу",
//         joinUsContent: "Станьте частью яркого сообщества художников, фотографов и творцов. Делитесь своими работами, открывайте новые таланты и общайтесь с другими через комментарии и совместные проекты. Независимо от того, художник вы или любитель, здесь найдется место и для вас. <a href='contact.html'>Свяжитесь с нами</a>, чтобы узнать больше о том, как присоединиться к нашей галерее.",
//         categoriesTitle: "Исследуйте наши категории",
//         categoriesContent: "Помимо разнообразной галереи, мы предлагаем специализированные категории для вдохновения вашего творчества:",
//         animeCategory: "<strong>Аниме</strong>: Погрузитесь в мир яркого и динамичного искусства, вдохновленного аниме. Будь то традиционные аниме или современные интерпретации, эта коллекция оживляет персонажей и сцены в ярких деталях.",
//         nightCategory: "<strong>Ночь</strong>: Исследуйте мистическую красоту ночи в нашей категории 'Ночь'. От звездного неба до городских пейзажей, освещенных лунным светом, эта коллекция демонстрирует чарующую привлекательность мира после наступления темноты.",
//         teamMember1 : "<strong>Ayxan Iskender</strong> – Программист",
//         teamMember2 : "<strong>John Doe</strong> – Основатель и генеральный директор",
//         teamMember3 : "<strong>Jane Smith</strong> – Креативный Директор",
//         teamMember4 : "<strong>Michael Brown</strong> – Технический руководитель",
//         teamMember5 : "<strong>Sarah Lee</strong> – Менеджер по маркетингу",
//
//     },
//     az: {
//         joinUsTitle: "Cəmiyyətimizə qoşulun",
//         joinUsContent: "Rəssamlar, fotoqraflar və yaradıcı şəxslərdən ibarət canlı icmanın bir hissəsi olun. Öz işlərinizi paylaşın, yeni istedadları kəşf edin və şərhlər və əməkdaşlıqlar vasitəsilə başqaları ilə əlaqə qurun. İncəsənət həvəskarısınızsa, burada sizin üçün bir yer var. Qalereyamıza qoşulmaq haqqında daha çox məlumat üçün <a href='contact.html'>əlaqə saxlayın</a>.",
//         categoriesTitle: "Kateqoriyalarımızı araşdırın",
//         categoriesContent: "Müxtəlif qalereyamızdan əlavə, yaradıcılığınızı ilhamlandırmaq üçün ixtisaslaşmış kateqoriyalar təklif edirik:",
//         animeCategory: "<strong>Anime</strong>: Rəngarəng və dinamik anime-inspirə edilmiş incəsənət dünyasına qərq olun. İstər ənənəvi anime, istərsə də müasir interpretasiyalar olsun, bu kolleksiya personajları və səhnələri canlı detallarla canlandırır.",
//         nightCategory: "<strong>Gecə</strong>: Gecənin mistik gözəlliyini 'Gecə' kateqoriyamızda araşdırın. Ulduzlu səmalardan ay işığı ilə işıqlandırılmış şəhər mənzərələrinə qədər, bu kolleksiya qaranlıqdan sonrakı dünyanın cazibədar cazibəsini nümayiş etdirir.",
//         teamMember1 : "<strong>Ayxan Iskender</strong> – Proqramçı",
//         teamMember2 : "<strong>John Doe</strong> – Təsisçi və CEO",
//         teamMember3 : "<strong>Jane Smith</strong> – Kreativ Direktor",
//         teamMember4 : "<strong>Michael Brown</strong> – Texniki Rəhbər",
//         teamMember5 : "<strong>Sarah Lee</strong> – Marketinq Meneceri",
//
//     }
// };
//


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
