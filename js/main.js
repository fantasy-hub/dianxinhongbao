const animation = window.animation;

let flag = true;

//定时器ID
const TMIER = {};
//动画
const ani = {};

// 初始化
(function init() {
   
    triggerEvent();
    // noHuman();
})()

//序列帧动画图片
const loadImages = (function () {
    let imgBg = [];
    let redBoxList = [];
    let redBoxList2 = [];
    let redBoxOpen = [];
    let redGold = [];

    //旋转背景动画
    for (let i = 1; i < 85; i++) {
        imgBg.push(`./img/StartView/Popup_red/Popup_red_bg/redpack_bg_${i}.png`);
    }
    //红包弹出动画
    for (let i = 1; i < 29; i++) {
        redBoxList.push(`./img/StartView/Popup_red/Popup_red_1/redpack_1_${i}.png`);
    }
    //红包呼吸动画
    for (let i = 1; i < 39; i++) {
        redBoxList2.push(`./img/StartView/Popup_red/Popup_red_2/redpack_2_${i}.png`);
    }
    //打开红包动画
    for (let i = 1; i < 25; i++) {
        redBoxOpen.push(`./img/StartView/Popup_red/Popup_red_3/redpack_3_${i}.png`);
    }
    //打开红包后金币及红包掉落动画
    for (let i = 0; i < 55; i++) {
        redGold.push(`./img/StartView/Popup_red/jinbi/jinbi_00${i}.png`);
    }
    return {
        imgBg,
        redBoxList,
        redBoxList2,
        redBoxOpen,
        redGold,
    }
    
})();

// 弹出红包窗口
function popBox() {
    let flexBox = document.querySelector('.open');
    let main = document.querySelector('.main');
    let redCome = document.getElementById('redCome');
    //旋转背景
    let openBg =  document.querySelector('.open-bg');
    //红包
    let redBox = document.querySelector('.open-redBox');


    //旋转背景动画
    ani.bgAnimation = animation().loadImage(loadImages.imgBg).changeSrc(openBg, loadImages.imgBg).repeatForever().start(40);
    //红包来了音效
    redCome.play();
    //红包弹出动画
    ani.redPopAni = animation().loadImage(loadImages.redBoxList).changeSrc(redBox, loadImages.redBoxList).then(
        //红包呼吸动画
        function () {
            ani.redBreathAni = animation().loadImage(loadImages.redBoxList2).changeSrc(redBox, loadImages.redBoxList2).repeatForever().start(85);
        }
    ).start(40);
}

//点击打开红包
function openRedBox() {   
    let redBoxClick = document.querySelector('.redBox-click');
    let redTitle =  document.querySelector('.open-title');
    let openRedGold =  document.querySelector('.open-redGold');
    //红包
    let redBox = document.querySelector('.open-redBox');

    redBoxClick.classList.add('hidden');
    redTitle.classList.add('hidden');
    //红包打开音效
    redOpen.play();
    //释放之前的动画资源
    disposeAni();
    //红包开启动画
    ani.openRedAnimation = animation().loadImage(loadImages.redBoxOpen).changeSrc(redBox, loadImages.redBoxOpen).then(
        function () {
            TMIER.timerRun = setTimeout(function () {
                window.location.href = "./phone.html";
            }, 500);
        }
    ).start(70);
    TMIER.timerGold = setTimeout(function () {
        ani.GoldAnimation = animation().loadImage(loadImages.redGold).changeSrc(openRedGold, loadImages.redGold).start(25);
    }, 500);       
}

// 释放动画资源
function disposeAni() {
    //红包
    let redBox = document.querySelector('.open-redBox');
    let openRedGold =  document.querySelector('.open-redGold');

    //弹窗背景
    if (ani.bgAnimation) {
        ani.bgAnimation.dispose(); 
    }
    //红包呼吸
    if (ani.redBreathAni) {
        ani.redBreathAni.dispose();
        redBox.setAttribute('src', './img/StartView/Popup_red/Popup_red_1/redpack_1_1.png');
    }
    //弹出红包
    if (ani.redPopAni) {
        ani.redPopAni.dispose(); 
        redBox.setAttribute('src', './img/StartView/Popup_red/Popup_red_1/redpack_1_1.png');
    }
    //金币
    if (ani.GoldAnimation) {
        ani.GoldAnimation.dispose(); 
        openRedGold.setAttribute('src', './img/StartView/Popup_red/Popup_red_1/redpack_1_1.png');
    }
    //红包点击打开
    if (ani.openRedAnimation) {
        ani.openRedAnimation.dispose(); 
        redBox.setAttribute('src', './img/StartView/Popup_red/Popup_red_1/redpack_1_1.png');
    }
}

// 触发事件
function triggerEvent() {
    // let smallRed = document.querySelector('.treasure-box');
    let redBoxClick = document.querySelector('.redBox-click');
    // let exit = document.querySelector('.open-exit');
    let musicBtn = document.getElementById('music-btn');

    //点击红包打开
    redBoxClick.addEventListener('click', openRedBox, false);
}

// 无人值守，红包背景渲染
function noHuman() {
    let body = document.querySelector('body');
    body.addEventListener('touchstart',function(){
        clearTimeout(TMIER.timer);
    }, false);
    body.addEventListener('touchend',function(){
        TMIER.timer = setTimeout(function () {
            location.href = 'index.html'
          
        }, 10000);
    }, false);
}
window.onload = function() {
    popBox();
}







