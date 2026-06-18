// Alternar Tipo de Usuário
function toggleUserType(button) {
    const allButtons = document.querySelectorAll('.user-type');
    allButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Scroll Suave para Links de Navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 20;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar efeito de scroll na navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('header.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Ações de Botão
document.querySelector('.btn-hero')?.addEventListener('click', function() {
    alert('Redirecionando para download do app...');
});

document.querySelector('.btn-google')?.addEventListener('click', function() {
    alert('Abrindo Google Play Store...');
});

document.querySelector('.btn-apple')?.addEventListener('click', function() {
    alert('Abrindo App Store...');
});

let carouselCurrentIndex = 0;

// Simple carousel logic
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');

    function updateTrack() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${carouselCurrentIndex * slideWidth}px)`;
    }

    window.addEventListener('resize', updateTrack);

    nextButton.addEventListener('click', function() {
        carouselCurrentIndex = (carouselCurrentIndex + 1) % slides.length;
        updateCarousel(carouselCurrentIndex);
    });

    prevButton.addEventListener('click', function() {
        carouselCurrentIndex = (carouselCurrentIndex - 1 + slides.length) % slides.length;
        updateCarousel(carouselCurrentIndex);
    });

    // initialize
    updateCarousel(carouselCurrentIndex);
});

// Search bar logic
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('site-search');
    const suggestions = document.getElementById('search-suggestions');
    if (!searchInput || !suggestions) return;

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = carouselTrack ? Array.from(carouselTrack.children) : [];
    const carouselTitle = document.querySelector('.carousel-info h3');
    const carouselDesc = document.querySelector('.carousel-info .desc');
    const carouselPrice = document.querySelector('.carousel-info .price strong');

    const items = [
        {
            name: 'Fusão Nuclear',
            subtitle: 'Dupla de carnes, chédar e caro',
            price: 'R$ 48,00',
            image: 'https://source.unsplash.com/400x300/?burger',
            targetId: 'riders',
            slideIndex: 0
        },
        {
            name: 'Giga Planet',
            subtitle: 'Burger gigante com dupla de carnes',
            price: 'R$ 42,00',
            image: 'https://source.unsplash.com/400x300/?cheeseburger',
            targetId: 'riders',
            slideIndex: 1
        },
        {
            name: 'Supernova',
            subtitle: 'Explosão de sabor com chédar derretido',
            price: 'R$ 35,00',
            image: 'https://source.unsplash.com/400x300/?food,burger',
            targetId: 'riders',
            slideIndex: 2
        },
        {
            name: 'Cheese Storm',
            subtitle: 'Tempestade de queijos variados',
            price: 'R$ 38,00',
            image: 'https://source.unsplash.com/400x300/?burger,fries',
            targetId: 'riders',
            slideIndex: 3
        },
        {
            name: 'Big Bigorna',
            subtitle: 'O maior dos nossos burgers',
            price: 'R$ 52,00',
            image: 'https://source.unsplash.com/400x300/?burger,grill',
            targetId: 'riders',
            slideIndex: 4
        },
        {
            name: 'Curto-Circuito',
            subtitle: 'Combinação perfeita de sabores',
            price: 'R$ 32,00',
            image: 'https://source.unsplash.com/400x300/?fastfood',
            targetId: 'riders',
            slideIndex: 5
        },
        {
            name: 'Chapa Fria',
            subtitle: 'Toque refrescante e diferente',
            price: 'R$ 29,90',
            image: 'https://source.unsplash.com/400x300/?sandwich',
            targetId: 'riders',
            slideIndex: 6
        },
        {
            name: 'Braça Viva',
            subtitle: 'Tempero tradicional da chapa',
            price: 'R$ 34,50',
            image: 'https://source.unsplash.com/400x300/?meal',
            targetId: 'riders',
            slideIndex: 7
        }
    ];

    function normalize(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function updateSlideInfo(index) {
        const item = items[index] || items[0];
        if (carouselTitle) carouselTitle.textContent = item.name;
        if (carouselDesc) carouselDesc.textContent = item.subtitle;
        if (carouselPrice) carouselPrice.textContent = item.price;
    }

    function updateCarousel(index) {
        if (!carouselTrack || !carouselSlides.length) return;
        carouselCurrentIndex = Math.max(0, Math.min(index, carouselSlides.length - 1));
        const slideWidth = carouselSlides[0].getBoundingClientRect().width;
        carouselTrack.style.transform = `translateX(-${carouselCurrentIndex * slideWidth}px)`;
        updateSlideInfo(carouselCurrentIndex);
    }

    function renderSuggestions(matches) {
        suggestions.innerHTML = '';
        if (!matches.length) {
            suggestions.hidden = true;
            return;
        }
        matches.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('suggestion-item');

            const thumb = document.createElement('img');
            thumb.classList.add('suggestion-thumb');
            thumb.src = item.image || 'img/hamburguer.jpg';
            thumb.alt = item.name;

            const content = document.createElement('div');
            content.classList.add('suggestion-content');

            const title = document.createElement('strong');
            title.classList.add('suggestion-title');
            title.textContent = item.name;

            const subtitle = document.createElement('span');
            subtitle.classList.add('suggestion-subtitle');
            subtitle.textContent = item.subtitle || '';

            const price = document.createElement('span');
            price.classList.add('suggestion-price');
            price.textContent = item.price || '';

            content.appendChild(title);
            content.appendChild(subtitle);
            content.appendChild(price);
            li.appendChild(thumb);
            li.appendChild(content);

            li.addEventListener('mousedown', function(e) {
                e.preventDefault();
                const target = document.getElementById(item.targetId);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                updateCarousel(item.slideIndex);
                const info = document.querySelector('.carousel-info');
                if (info) {
                    info.classList.add('highlight');
                    setTimeout(() => info.classList.remove('highlight'), 2000);
                }
                suggestions.hidden = true;
            });
            suggestions.appendChild(li);
        });
        suggestions.hidden = false;
    }

    searchInput.addEventListener('input', function() {
        const q = normalize(this.value.trim());
        if (!q) { suggestions.hidden = true; return; }
        const matches = items.filter(i => normalize(i.name).includes(q));
        renderSuggestions(matches);
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const first = suggestions.querySelector('li');
            if (first) { first.dispatchEvent(new MouseEvent('mousedown')); }
        }
    });

    // hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.hidden = true;
        }
    });
});