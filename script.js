const mobileOpenButton = document.getElementById('mobile-open-button');
const mobileMenu = document.getElementById('mobile-menu');
// Toggle mobile menu
mobileOpenButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  if (!mobileMenu.classList.contains('hidden')) {
    mobileMenu.querySelector('a').focus();
  }
});
// Close menu when any link inside is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});
// Accessibility: close menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    mobileOpenButton.focus();
  }
});