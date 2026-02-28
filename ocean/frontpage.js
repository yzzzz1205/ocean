document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const images = document.querySelectorAll('.slider-image');
    const totalImages = images.length;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    showImage(currentIndex);

    // 自動播放
    setInterval(nextImage, 3000);

    // 按鈕
    document.querySelector('.next').addEventListener('click', nextImage);
    document.querySelector('.prev').addEventListener('click', prevImage);
});

let lastRipple = 0;

document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastRipple < 120) return; // 控制密度
    lastRipple = now;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1200);
});

/* ===== 首頁背景泡泡系統 ===== */
function initBackgroundBubbles(){
    const layer = document.querySelector('.bubble-bg-layer');
    if(!layer) return;

    setInterval(()=>{
        const bubble = document.createElement('span');
        bubble.className = 'bg-bubble';

        // 大小
        const size = 6 + Math.random()*18;
        bubble.style.width = size+'px';
        bubble.style.height = size+'px';

        // 位置
        bubble.style.left = Math.random()*100+'%';

        // 動畫時間（越大越慢）
        const duration = 12 + Math.random()*18;
        bubble.style.animationDuration = duration+'s';

        // 透明度微變化
        bubble.style.opacity = 0.25 + Math.random()*0.35;

        layer.appendChild(bubble);

        setTimeout(()=>bubble.remove(), duration*1000);
    }, 800); // 👉 數字越大 = 泡泡越稀疏
}

initBackgroundBubbles();