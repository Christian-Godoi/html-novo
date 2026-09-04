const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
	const isOpen = navigation.classList.toggle('is-open');
	menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => navigation.classList.remove('is-open'));
});

document.querySelector('.download-pill')?.addEventListener('click', (event) => {
	event.preventDefault();
	const downloadSection = document.querySelector('#download');
	if (!downloadSection) return;

	downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
	downloadSection.classList.remove('is-targeted');
	requestAnimationFrame(() => downloadSection.classList.add('is-targeted'));
	window.setTimeout(() => downloadSection.classList.remove('is-targeted'), 900);
});

const revealSections = document.querySelectorAll('[data-reveal]');
const revealItems = document.querySelectorAll('.section-heading, .step, .app-frame, .benefit-card, .family-image, .family-copy, .family-copy .button, .download-copy, .download-art, .store-buttons, .qr-card, .qr-code, .qr-card .button, .team-strip > div, .team-strip > p, .footer-brand, .footer-col, .footer-news, .footer-info, .copyright');
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
	item.classList.add('scroll-reveal');
	item.style.transitionDelay = `${(index % 4) * 100}ms`;
	revealObserver?.observe(item);
});

if (!revealObserver) {
	[...revealSections, ...revealItems].forEach((element) => element.classList.add('is-visible'));
}

const allRevealElements = document.querySelectorAll('.reveal-target, .scroll-reveal');
const revealOnScroll = () => {
	allRevealElements.forEach((element) => {
		if (element.classList.contains('is-visible')) return;
		if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
			element.classList.add('is-visible');
		}
	});
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('resize', revealOnScroll);
revealOnScroll();

document.querySelector('.footer form')?.addEventListener('submit', (event) => {
	event.preventDefault();
	const button = event.currentTarget.querySelector('button');
	button.textContent = '✓';
	button.setAttribute('aria-label', 'E-mail cadastrado');
	event.currentTarget.reset();
});
