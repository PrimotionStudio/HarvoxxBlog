const harmBurger = document.querySelector('.hamburger');
const list = document.querySelector('.list');
const times = document.querySelector('.times');

harmBurger.addEventListener('click', () => {
    list.style.right = '0';
})
times.addEventListener('click', () => {
    list.style.right = '-100%';
})