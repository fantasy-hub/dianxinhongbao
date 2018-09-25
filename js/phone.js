(function () {
    var btn = $('.keyboard-btn'),
        $input = $('.prompt-phone'),
        $board = $('.keyboard'),
        $next = $('.knext');

    var robotAnima = function () {
        var animation = window.animation;
        var ele = document.getElementById('cover-img');
        console.log(ele)
        var imglist = [];
        for (var i = 0; i < 17; i++) {
            imglist[i] = './img/StartView/Popup_red/Popup_red_bg/redpack_bg_' + (i + 1) + '.png';
        }
        var demoAnimation = animation().loadImage(imglist).changeSrc(ele, imglist).repeatForever();
        demoAnimation.start(80);
    };

    var randNum = function () {
        var str = Math.floor(Math.random() * 101) + 100 + 'mb';
        //对随机数绑定属性data-text，主要用于css字体描边
        $('.package-randnum').attr('data-text', str).html(str);
    }();

    // 验证手机号
    var checkInput = function () {
        var $confirm = $('.confirm');
        if (/^1\d{10}/.test($input.val())) {
            //如果匹配正确，就对虚拟键盘确认键变色，同时对外层确认按钮替换背景
            $next.addClass('avilible');
            $confirm.addClass('confirmpase');
            btnClick.play();
        } else if ($next.hasClass('avilible')) {
            //如果用户点击删除，就去掉添加颜色及背景
            $next.removeClass('avilible');
            $confirm.removeClass('confirmpase');
        }

    };

    var checkPhone = function () {
        var reg = /^1\d{10}/;
        $('.prompt-phone').on('focus', function () {
            // $(this).val('');
            // if (reg.test($input.val()) && !$next.hasClass('avilible')) {
            //     $next.addClass('avilible');
            // }
            // $('.keyboard').show();
            $board.removeClass('slideOutDown').addClass('slideInUp');
        });
        $('.prompt-phone').on('input', function () {
            checkInput();
        });
        $('.confirm').on('click', function () {
            let $el = $(this);
            btnClick.play();
            // 判断弹框是否已弹出，如果有跳转活动页
            if ($('.cover-package').hasClass('bounce')) {
                setTimeout(function() {
                    location.href = './face.html';
                }, 1000);
            } else if ($el.hasClass('confirmpase')) {
                $('.fireworks').hide();
                $el.addClass('fix');
                // 显示弹框
                $('.cover').show().find('.cover-package').addClass('bounce');
            }
        });

        // $board.hide();
        $board.on('click', function (e) {
            var $e = $(e.target),  
                $val = $input.val();
            e.stopPropagation();
            //如果点击的不是按钮 同时 也不是图片（条件1）
            if (!$e.hasClass('keyboard-btn') && !$e.hasClass('kimg')) {
                return;
            }
            //删除键必须满足（条件1），才能顺利获取kimg
            if ($e.hasClass('kpre') || $e.hasClass('kimg')) {
                if ($val.length === 0) {
                    return;
                } else {
                    //提取出最后一位前面的值传给input
                    $input.val($val.substring(0, $val.length - 1));
                }
            } else if ($e.hasClass('knext')) {
                if ($e.hasClass('avilible')) {
                    // $board.hide();
                    $board.removeClass('slideInUp').addClass('slideOutDown');
                } else {
                    return;
                }
            } else if ($val.length === 11) {
                return;
            } else {
                $input.val($val + $e.text());
            }
            checkInput();
        });
        //防止键盘闪出
        $(document).on('click', function (e) {
            if (!$(e.target).hasClass('prompt-phone') && $('.keyboard').is(':visible') && $board.hasClass('slideInUp')) {
                // $board.hide();
                $board.removeClass('slideInUp').addClass('slideOutDown');
            }
        });
    }();

    var back = function () {
        var time = 0;
        $(document).on('click', function() {
            clearTimeout(time);
        })
        time = setTimeout(function () {
            location.href = 'index.html';
        }, 10000);
    }();
}());