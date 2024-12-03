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

