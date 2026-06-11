
/* --------------------------------------------------------
   Script do site Patas e Companhia
   - Carrossel de imagens
   - Busca de produtos
   - FAQ interativo
   - Cadastro com modal de sucesso
   -------------------------------------------------------- */

const CAROUSEL_INTERVAL_MS = 5000;
const carouselImages = [
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&h=500&q=80",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&h=500&q=80",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&h=500&q=80"
];

const carouselTitles = [
    "Diversão e Saúde",
    "Conforto e Carinho",
    "Estética e Higiene"
];

const carouselTexts = [
    "Espaços pensados para a diversão e socialização segura dos cães.",
    "Área exclusiva e silenciosa para os felinos descansarem com conforto.",
    "Profissionais qualificados para banho, tosa e tratamentos de spa pet."
];

let currentCarouselIndex = 0;

const carouselElements = {
    image: document.getElementById("imagem-carousel"),
    title: document.getElementById("titulo-carousel"),
    text: document.getElementById("texto-carousel"),
    dots: [
        document.getElementById("dot0"),
        document.getElementById("dot1"),
        document.getElementById("dot2")
    ]
};

const buttons = {
    next: document.getElementById("nextBtn"),
    prev: document.getElementById("prevBtn")
};

function setActiveCarouselDot(index) {
    carouselElements.dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
    });
}

function updateCarouselContent(index) {
    carouselElements.image.classList.add("fading");

    setTimeout(() => {
        carouselElements.image.src = carouselImages[index];
        carouselElements.title.innerText = carouselTitles[index];
        carouselElements.text.innerText = carouselTexts[index];
        carouselElements.image.classList.remove("fading");
    }, 150);

    setActiveCarouselDot(index);
}

function showNextCarouselSlide() {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
    updateCarouselContent(currentCarouselIndex);
}

function showPreviousCarouselSlide() {
    currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarouselContent(currentCarouselIndex);
}

buttons.next.addEventListener("click", showNextCarouselSlide);
buttons.prev.addEventListener("click", showPreviousCarouselSlide);

setInterval(showNextCarouselSlide, CAROUSEL_INTERVAL_MS);

carouselElements.dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
        currentCarouselIndex = dotIndex;
        updateCarouselContent(dotIndex);
    });
});

/* --------------------------------------------------------
   Busca de produtos
   -------------------------------------------------------- */

const searchInput = document.getElementById("pesquisa");
const searchResultMessage = document.getElementById("resultado");

function searchProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const productCards = document.querySelectorAll(".card");
    let foundCount = 0;

    productCards.forEach((card) => {
        const productTitle = card.querySelector("h2").textContent.toLowerCase();
        const matchesSearch = searchText === "" || productTitle.includes(searchText);

        card.classList.toggle("hidden", !matchesSearch);
        if (matchesSearch) {
            foundCount += 1;
        }
    });

    if (searchText === "") {
        searchResultMessage.innerText = "";
    } else {
        searchResultMessage.innerText = `${foundCount} produto(s) encontrado(s)`;
    }
}

searchInput.addEventListener("input", searchProducts);

/* --------------------------------------------------------
   Perguntas frequentes (FAQ)
   -------------------------------------------------------- */

const faqQuestions = document.querySelectorAll(".pergunta");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains("open");

        answer.classList.toggle("open", !isOpen);
    });
});

/* --------------------------------------------------------
   Cadastro de cliente e modal de sucesso
   -------------------------------------------------------- */

const form = document.getElementById("petRegistrationForm");
const modalOverlay = document.getElementById("successModalOverlay");

function showSuccessModal(name, city, phone, petCount) {
    document.getElementById("summaryName").innerText = name;
    document.getElementById("summaryCity").innerText = city;
    document.getElementById("summaryPhone").innerText = phone;
    document.getElementById("summaryPets").innerText = `${petCount} ${petCount === "1" ? "animal" : "animais"}`;

    modalOverlay.classList.remove("hidden");
}

function resetForm() {
    form.reset();
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("clientName").value;
    const city = document.getElementById("clientCity").value;
    const phone = document.getElementById("clientPhone").value;
    const petCount = document.getElementById("petsCount").value;

    if (name && city && phone && petCount) {
        showSuccessModal(name, city, phone, petCount);
        resetForm();
    }
});

document.getElementById("modalCloseBtn").addEventListener("click", closeModal);

/* --------------------------------------------------------
   Ações dos botões de compra
   -------------------------------------------------------- */

const buyButtons = document.querySelectorAll(".btn-buy");

buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("Produto adicionado ao seu carrinho virtual!");
    });
});

