const slides = document.querySelectorAll('.slides-images img');
const dots = document.querySelectorAll('.index-item');
let currentIndex = 0;
let autoSlideInterval = 3000; // 3秒自動輪播
let autoSlide;

// 顯示指定圖片
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
  currentIndex = index;
  resetAutoSlide(); // 每次手動切換時重置計時
}

// 點擊圓點切換
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

// 拖曳滑動
let startX = 0;
let isDragging = false;
const slidesContainer = document.querySelector('.slides-images');

slidesContainer.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
});
slidesContainer.addEventListener('mousemove', e => {
  if(isDragging) e.preventDefault();
});
slidesContainer.addEventListener('mouseup', e => {
  if(!isDragging) return;
  const diff = e.clientX - startX;
  if(diff > 50) showSlide((currentIndex - 1 + slides.length) % slides.length);
  if(diff < -50) showSlide((currentIndex + 1) % slides.length);
  isDragging = false;
});
slidesContainer.addEventListener('mouseleave', () => isDragging = false);

// 手機觸控滑動
slidesContainer.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slidesContainer.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if(diff > 50) showSlide((currentIndex - 1 + slides.length) % slides.length);
  if(diff < -50) showSlide((currentIndex + 1) % slides.length);
});

// 自動輪播
function autoSlideFunc() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  autoSlide = setInterval(autoSlideFunc, autoSlideInterval);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// 啟動自動輪播
startAutoSlide();
