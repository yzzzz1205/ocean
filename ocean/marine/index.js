const animalsData = [
  {
    name: "長江白海豚",
    short: "長江流域特有淡水海豚｜極危物種",
    long: "長江白海豚是中國長江流域特有的淡水海豚物種，身體細長、膚色呈現淺灰至黃白色，且沒有背鰭，是極具辨識度的河豚類生物。過去長江曾是牠們穩定的棲息環境，但隨著工業化與都市發展，水域污染、航運增加、水壩建設與過度捕撈，使牠們的生存空間快速縮小。2006 年調查時族群數量已下降至極低水平，部分研究顯示野外族群可能僅剩數十隻。目前牠們被列為極危物種，保育工作包含水域保護、航道管理、生態復育與人工繁殖研究，是河川生態保育的重要指標物種之一。"
  },
  {
    name: "里德利海龜",
    short: "全球最稀有海龜之一｜瀕危物種",
    long: "里德利海龜主要棲息於大西洋熱帶與亞熱帶海域，特別集中於墨西哥灣沿岸。牠們具有高度集體產卵行為，但產卵海灘因人類開發、觀光活動與海岸工程而大幅減少。長期過度捕撈、漁網誤捕、塑膠污染與棲地破壞，使其族群數量在 20 世紀中期急遽下降。目前已被列為瀕危物種，透過產卵地保護計畫、人工孵化、海岸管制與國際保育合作進行復育。"
  },
  {
    name: "夏威夷海豹",
    short: "夏威夷群島特有物種｜極危",
    long: "夏威夷海豹是世界上最瀕危的海豹物種之一，也是夏威夷群島特有的哺乳動物。牠們主要棲息於偏遠小島與珊瑚礁沙灘，族群高度集中且分布範圍狹小。因人類活動擴張、漁業衝突、海洋垃圾纏繞、疾病傳播與食物資源減少，導致族群數量長期下降。保育措施包含棲地保護、醫療照護、繁殖監測與人類干擾管控。"
  },
  {
    name: "巨型魔鬼魚",
    short: "海洋最大型魟魚｜瀕危物種",
    long: "巨型魔鬼魚廣泛分布於熱帶與亞熱帶海域，生長速度慢、繁殖率低，一次僅能產下極少數後代，因此族群恢復能力極弱。因觀賞捕撈、誤捕、海洋污染與船隻活動影響，使其數量逐年下降。國際間已逐步限制捕撈與貿易，並加強海洋保護區管理。"
  },
  {
    name: "海獺",
    short: "海洋生態系關鍵物種｜族群脆弱",
    long: "海獺曾廣泛分布於北太平洋沿岸，是海洋食物鏈中極為重要的關鍵物種。因其厚實皮毛價值極高，18 至 20 世紀遭大量獵捕，族群數量幾乎滅絕。雖經多年保育復育，部分地區族群回升，但仍受到海洋污染、食物鏈破壞與氣候變遷影響。海獺能控制海膽數量，維持海藻森林生態平衡，被視為「生態系工程師」。"
  }
];

function renderContent(){
    const items = document.querySelectorAll('.item');

    items.forEach((item, index) => {
        if(!animalsData[index]) return;

        const nameEl = item.querySelector('.name');
        const desEl = item.querySelector('.des');

        nameEl.textContent = animalsData[index].name;
        desEl.textContent = animalsData[index].short;
    });
}

renderContent();

let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})
prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1])
})

const modal = document.getElementById('ecoModal');
const modalImg = document.getElementById('eco-img');
const modalTitle = document.getElementById('eco-title');
const modalText = document.getElementById('eco-text');
const closeBtn = document.querySelector('.eco-close');

document.querySelectorAll('.see-more').forEach((btn, index)=>{
    btn.addEventListener('click', (e)=>{
        const item = e.target.closest('.item');

        // 背景圖
        const bg = item.style.backgroundImage
            .replace('url("','')
            .replace('")','');

        modalImg.src = bg;

        // 用資料源（不是畫面文字）
        modalTitle.innerText = animalsData[index].name;
        modalText.innerText = animalsData[index].long;

        modal.classList.add('show');
    });
});

closeBtn.addEventListener('click', ()=>{
    modal.classList.remove('show');
});

document.querySelector('.eco-backdrop').addEventListener('click', ()=>{
    modal.classList.remove('show');
});

document.getElementById('closeDetail').addEventListener('click', ()=>{
    document.getElementById('detailModal').classList.remove('show');
});

/* ===== 切換按鈕水波特效 ===== */
document.querySelectorAll('.button button').forEach(btn=>{
    btn.addEventListener('click', function(e){

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + 'px';

        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(()=>{
            ripple.remove();
        }, 800);
    });
});
