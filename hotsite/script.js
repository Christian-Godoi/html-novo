const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navigation.classList.remove('is-open'));
});

const progressBars = document.querySelectorAll('.bar span');
const progressObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.35 });

progressBars.forEach((bar) => progressObserver.observe(bar));

const revealSections = document.querySelectorAll('[data-reveal="section"]');
const revealItems = document.querySelectorAll('[data-reveal="item"]');

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 })
  : null;

revealSections.forEach((section) => {
  section.classList.add('reveal-target');
  revealObserver?.observe(section);
});

revealItems.forEach((item, index) => {
  item.classList.add('reveal-item');
  item.style.transitionDelay = `${index * 120}ms`;
  revealObserver?.observe(item);
});

if (!revealObserver) {
  [...revealSections, ...revealItems].forEach((element) => element.classList.add('is-visible'));
}

const scrollRevealElements = document.querySelectorAll(
  '.metrics-copy, .progress-row, .stat, .features-head, .feature, .team-photo, .team-copy, .footer-brand, .footer-column, .footer-newsletter, .footer-address, .footer-bottom'
);

scrollRevealElements.forEach((element, index) => {
  element.classList.add('scroll-reveal');
  element.style.transitionDelay = `${(index % 4) * 100}ms`;
  revealObserver?.observe(element);
});

if (!revealObserver) {
  scrollRevealElements.forEach((element) => element.classList.add('is-visible'));
}

const allRevealElements = document.querySelectorAll('.reveal-target, .reveal-item, .scroll-reveal');
const revealOnScroll = () => {
  allRevealElements.forEach((element) => {
    if (element.classList.contains('is-visible')) return;
    const distanceFromTop = element.getBoundingClientRect().top;
    if (distanceFromTop < window.innerHeight * 0.9) {
      element.classList.add('is-visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('resize', revealOnScroll);
revealOnScroll();

const newsletterForm = document.querySelector('.footer form');
newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = newsletterForm.querySelector('button');
  submitButton.textContent = '✓';
  submitButton.setAttribute('aria-label', 'E-mail cadastrado');
  newsletterForm.reset();
});
