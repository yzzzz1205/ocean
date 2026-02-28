let cartItems = [];
let currentImgElement = null;
let currentProduct = null;
let currentQty = 1;

function openModal(description) {
    const productModal = document.getElementById('modal');
    const productDescription = document.getElementById('product_description');

    productDescription.innerHTML = description;
    productModal.classList.add('show');
}

function closeModal() {
    const productModal = document.getElementById('modal');
    productModal.classList.remove('show');
}

// ===== 點背景關閉 =====
const productModal = document.getElementById('modal');
const modalContent = document.querySelector('#modal .modal-content');
const closeBtn = document.querySelector('#modal .close');

productModal.addEventListener('click', closeModal);

modalContent.addEventListener('click', function (e) {
    e.stopPropagation();
});

closeBtn.addEventListener('click', closeModal);

// 點卡片本體不要關
modalContent.addEventListener('click', function (e) {
    e.stopPropagation();
});

// 點 X 關閉
closeBtn.addEventListener('click', closeModal);

// 泡泡特效
const boxes = document.querySelectorAll('.box');
const carButtons = document.querySelectorAll('.car');

boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        createBubbles(e.clientX, e.clientY);
    });
});

function createBubbles(x, y) {
    const bubbleCount = 3 + Math.floor(Math.random() * 2); // 更少顆

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('span');
        bubble.className = 'bubble';

        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = Math.random() * 10;

        bubble.style.left = `${x + offsetX}px`;
        bubble.style.top = `${y + offsetY}px`;

        const size = 8 + Math.random()*10;
        bubble.style.width = size+'px';
        bubble.style.height = size+'px';

        const duration = 3.5 + Math.random()*2.5; // 飄很久
        bubble.style.animationDuration = duration+'s';

        const delay = Math.random()*0.3;
        bubble.style.animationDelay = delay+'s';

        document.body.appendChild(bubble);

        setTimeout(() => bubble.remove(), (duration+1)*1000);
    }
}

// 飛進購物車
function flyToCart(imgElement) {
    const cart = document.getElementById('cart-btn');
    if (!imgElement || !cart) return;

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = imgElement.cloneNode(true);

    flyingImg.style.position = 'fixed';
    flyingImg.style.left = imgRect.left + imgRect.width / 2 + 'px';
    flyingImg.style.top = imgRect.top + imgRect.height / 2 + 'px';
    flyingImg.style.width = imgRect.width + 'px';
    flyingImg.style.height = imgRect.height + 'px';
    flyingImg.style.transform = 'translate(-50%, -50%)';
    flyingImg.style.borderRadius = '16px';
    flyingImg.style.zIndex = 9999;
    flyingImg.style.pointerEvents = 'none';

    document.body.appendChild(flyingImg);

    // 精準目標（購物車 icon 中心再往上一點）
    const targetX =
        cartRect.left + cartRect.width / 2;

    const targetY =
        cartRect.top + cartRect.height / 2 - 6;

    // 第一段：往上拋
    flyingImg.animate([
        { transform: 'translate(-50%, -50%) scale(1)' },
        { transform: 'translate(-50%, -140px) scale(0.6)' }
    ], {
        duration: 420,
        easing: 'cubic-bezier(.2,.6,.4,1)',
        fill: 'forwards'
    });

    // 第二段：吸進購物車
    setTimeout(() => {
        flyingImg.style.transition =
            'all 0.9s cubic-bezier(.22,.61,.36,1)';

        flyingImg.style.left = targetX + 'px';
        flyingImg.style.top = targetY + 'px';
        flyingImg.style.transform = 'translate(-50%, -50%) scale(0.15)';
        flyingImg.style.opacity = '0';
    }, 420);

    setTimeout(() => {
        flyingImg.remove();
        cart.classList.add('cart-bounce');
        setTimeout(() => cart.classList.remove('cart-bounce'), 300);
    }, 1400);
}

carButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const box = button.closest('.box');
        const img = box.querySelector('img');

        currentImgElement = img; // 飛行動畫用

        currentProduct = {
            id: box.dataset.id,
            name: box.querySelector('.commodity').innerText,
            price: parseInt(
                box.querySelector('.money').innerText.replace('NT$', '')
            ),
            img: img.src
        };

        openQtyModal(currentProduct);
    });
});

function openQtyModal(product) {
    currentProduct = product;
    currentQty = 1;

    document.getElementById('qtyImg').src = product.img;
    document.getElementById('qtyName').innerText = product.name;
    document.getElementById('qtyPrice').innerText = `NT$${product.price}`;
    document.getElementById('qtyNumber').innerText = currentQty;

    document.getElementById('qtyModal').classList.add('show');
}

function closeQtyModal() {
    document.getElementById('qtyModal').classList.remove('show');
}

function changeQty(delta) {
    currentQty = Math.max(1, currentQty + delta);
    document.getElementById('qtyNumber').innerText = currentQty;
}

function confirmAddToCart() {
    const exist = cartItems.find(item => item.id === currentProduct.id);

    if (exist) {
        exist.qty += currentQty;
    } else {
        cartItems.push({
            ...currentProduct,
            qty: currentQty
        });
    }

    closeQtyModal();

    // 更新總金額
    updateCheckoutTotal();

    // 圖片飛進購物車
    if (currentImgElement) {
        flyToCart(currentImgElement);
    }
}

function openCartModal() {
    renderCart();
    document.getElementById('cartModal').classList.add('show');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('show');
}

function renderCart() {
    const list = document.getElementById('cartList');
    list.innerHTML = '';

    cartItems.forEach((item, index) => {
        list.innerHTML += `
          <div class="cart-item">
            <img src="${item.img}">
            <div>
              <div>${item.name}</div>
              <div>NT$${item.price}</div>
            </div>
            <div class="cart-qty">
              <button onclick="updateQty(${index}, -1)">−</button>
              <span>${item.qty}</span>
              <button onclick="updateQty(${index}, 1)">＋</button>
              <button onclick="removeItem(${index})">🗑</button>
            </div>
          </div>
        `;
    });

    updateCheckoutTotal();
}

function updateQty(index, delta) {
    cartItems[index].qty += delta;
    if (cartItems[index].qty <= 0) {
        cartItems.splice(index, 1);
    }
    renderCart();
}

function removeItem(index) {
    cartItems.splice(index, 1);
    renderCart();
}

document.getElementById('cart-btn').addEventListener('click', (e) => {
    createBubbles(e.clientX, e.clientY);
    openCartModal();
});

function updateCheckoutTotal() {
    const total = cartItems.reduce((sum, item) => {
        return sum + item.price * item.qty;
    }, 0);

    document.getElementById('checkout-total').innerText = total;
}

// 結帳
const successModal = document.getElementById('success-modal');
const successClose = document.querySelector('.success-close');

document.addEventListener('DOMContentLoaded', ()=>{

    const checkoutBtn = document.getElementById('checkout-btn');
    const successModal = document.getElementById('success-modal');
    const successClose = document.querySelector('.success-close');

    checkoutBtn.addEventListener('click', (e)=>{
        createBubbles(e.clientX, e.clientY); // 泡泡特效

        if(cartItems.length === 0) return;

        successModal.classList.add('show');
        createSuccessEffects();

        // 清空購物車
        cartItems.length = 0;
        renderCart();
    });

    successClose.addEventListener('click', ()=>{
        successModal.classList.remove('show');
    });

});

// 成功特效
function createSuccessEffects(){
    const container = document.querySelector('.success-effects');
    container.innerHTML = '';

    // 🌊 中心能量波紋
    const ripple = document.createElement('div');
    ripple.className = 'success-ripple';
    container.appendChild(ripple);

    // ✨ 光點爆散
    for(let i=0;i<24;i++){
        const spark = document.createElement('span');
        spark.className = 'success-spark';

        const angle = Math.random()*Math.PI*2;
        const dist = 60 + Math.random()*80;

        spark.style.setProperty('--x', `${Math.cos(angle)*dist}px`);
        spark.style.setProperty('--y', `${Math.sin(angle)*dist}px`);
        spark.style.left = '50%';
        spark.style.top = '50%';

        container.appendChild(spark);

        setTimeout(()=>spark.remove(),1200);
    }

    // 🫧 上升泡泡
    for(let i=0;i<12;i++){
        const bubble = document.createElement('span');
        bubble.className = 'success-bubble';

        bubble.style.left = Math.random()*100+'%';
        bubble.style.bottom = '-10px';
        bubble.style.animationDelay = Math.random()*0.6+'s';

        container.appendChild(bubble);
        setTimeout(()=>bubble.remove(),4000);
    }
}

// ===== 全站按鈕泡泡特效 =====
function bindBubbleToButtons(selector){
    document.querySelectorAll(selector).forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            createBubbles(e.clientX, e.clientY);
        });
    });
}

// 套用泡泡的元件
bindBubbleToButtons(`
    button,
    .car,
    .close,
    .success-close,
    .carousel-button,
    .hamburger,
    #cart-btn
`);

document.body.addEventListener('click', function(e){
    const btn = e.target.closest('button');
    if(!btn) return;

    // 排除 carousel 切換鈕（避免亂噴泡泡）
    if(btn.classList.contains('carousel-button')) return;

    createBubbles(e.clientX, e.clientY);
});

function initDeepSea(){
    const layer = document.querySelector('.deep-sea-layer');

    setInterval(()=>{
        const p = document.createElement('span');
        p.className = 'sea-particle';

        const size = 4 + Math.random()*6;
        p.style.width = size+'px';
        p.style.height = size+'px';

        p.style.left = Math.random()*100+'%';
        p.style.top = '110%';

        const duration = 12 + Math.random()*18; // 很慢很慢
        p.style.animationDuration = duration+'s';

        layer.appendChild(p);

        setTimeout(()=>p.remove(), duration*1000);
    }, 600); // 生成頻率（數字越大越稀疏）
}

initDeepSea();
