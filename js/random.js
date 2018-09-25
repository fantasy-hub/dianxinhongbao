$(function(){
    var romance = function() {
        var random = Math.floor(Math.random()*3 + 1);
        var ct = $('.ct'),
            contentH = $('.content-h'),
            btn1 = $('.btn1'),
            btn1Fake = $('.btn1-fake'),
            btn2 = $('.btn2'),
            btn3 = $('.btn3'),
            stress = $('.btn1-stress');

        btn1Fake.hide();

        if(random === 2) {
            ct.addClass('ct2');
            contentH.html('天翼不限量199元套餐');
            btn1.hide();
            btn1Fake.show();
            btn2.html('流量不限量');
            btn3.html('赠送来电显示');
        }
        if(random === 3) {
            ct.addClass('ct3');  
            contentH.html('电信王卡')
            btn1.html('语音月月赠');
            btn2.html('视频免流量');
            btn3.html('流量超便宜');                  
        }

        $('.ct').show()    
    }();

    var robotAnima = function() {
        var animation = window.animation;
        var el = document.getElementById('robot');
        var animation1,
            animation2,
            animation3,
            list1 = [],
            list2 = [],
            list3 = [],
            lock = false;

        for(var i = 1; i < 375; i++) {
            list1.push(`./img/jiqi/9/jiqiren01_0${i}.png`)
        }
        for(var i = 0; i < 81; i++) {
            list2[i] = './img/jiqi/7/jiqiren01_' + (i + 1) + '.png';
        }
        for(var i = 0; i < 17; i++) {
            list3[i] = './img/jiqi/8/jiqiren01_' + (i + 1) + '.png';
        }

        rebotIn.play();
        animation1 = animation().loadImage(list1).changeSrc(el, list1).then(function() {
            animation2 = animation().loadImage(list2).changeSrc(el, list2).start(40);
            lock = true;
            animation2.repeatForever();
        }).start(20);

        $('.close').on('click', function(){
            if(lock) {
                animation1.dispose();
                animation2.dispose();
                leave.play();
                animation3 = animation().loadImage(list3).changeSrc(el, list3).start(60);
                setTimeout(function() {
                    animation3.dispose();
                    location.href = './index.html';
                }, 1500);
            }
        });
    }();

    var fadeFunc = function (child) {
        /* 生成随机颜色 */ 
        function randomcolor() {
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += (Math.random() * 16 | 0).toString(16);
            }
            // return color;
            // $('.light').attr('data-color', color);
            child.css('background-color', color);
        }
        function fadeAni() {
            /* 组织默认行为 */
            child.stop();
            randomcolor();
            child.animate({
                'opacity': 1
            }, 750).animate({
                'opacity': 0
            }, 750);
        }
        setInterval(function () {
            fadeAni();
        }, 1500);
    };
    var loopFunc = function () {
        var $child = $('.content-light').children();
        for (var i = 0; i < $child.length; i++) {
            (function (i) {
                setTimeout(function () {
                    fadeFunc($child.eq(i));
                }, i * 350);
            })(i);
        }
    }
    loopFunc();
});