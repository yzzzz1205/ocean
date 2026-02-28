
    // ====== UI 元素 ======
    const menuBtn = document.getElementById('menuBtn');           // Hamburger
    const sideMenu = document.getElementById('sideMenu');         // 側邊選單
    const menuOverlay = document.getElementById('menuOverlay');   // 遮罩
    const settingsBtn = document.getElementById('settingsBtn');   // 設定按鈕
    const settingsMenu = document.getElementById('settingsMenu'); // 設定選單
    const exitBtn = document.getElementById('exitBtn');           // 退出遊戲按鈕
    const switchModeBtn = document.getElementById('switchModeBtn'); // 關卡/無盡切換

    // ====== Hamburger：旋轉 + 側邊選單滑入 ======
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');           // 旋轉動畫
      sideMenu.classList.toggle('open');           // 側邊選單滑入
      menuOverlay.style.display = sideMenu.classList.contains('open') ? 'block' : 'none'; // 顯示遮罩
    });

    // 點遮罩關閉選單
    menuOverlay.addEventListener('click', () => {
      sideMenu.classList.remove('open');
      menuBtn.classList.remove('active');
      menuOverlay.style.display = 'none';
    });