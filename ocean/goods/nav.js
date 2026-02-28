const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

// Hamburger 點擊事件
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('open');
});
