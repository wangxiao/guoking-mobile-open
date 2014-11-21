(function() {
    'use strict';

    var errorEle = $('#show-error');
    var mobileEle = $('#mobile');
    var nameCnEle = $('#name-cn');
    var sourceCode = '';
    var absUrl = location.href;
    if (/source_code/.test(absUrl)) {
        sourceCode = absUrl.match('source_code=(.*)')[1];
        window.localStorage.setItem('sourceCode', sourceCode);
    }

    mobileEle.on('focus', function() {
        mobileEle.removeClass('error');
    });
    nameCnEle.on('focus', function() {
        nameCnEle.removeClass('error');
    });

    function checkMobile() {
        var val = mobileEle.val().trim();
        if (!val) {
            errorEle.text('请填写手机号码');
            mobileEle.addClass('error');
            return false;
        } else if (/\D/.test(val)) {
            errorEle.text('手机号只能是数字');
            mobileEle.addClass('error');
            return false;
        } else if (val.length !== 11) {
            errorEle.text('手机号码位数不对');
            mobileEle.addClass('error');
            return false;            
        } else {
            mobileEle.removeClass('error');
            return true;
        }
    }

    function checkNameCn() {
        var val = nameCnEle.val().trim();
        if (!val) {
            errorEle.text('请填写您的姓名');
            nameCnEle.addClass('error');
            return false;
        } else if (!/^[\u4e00-\u9fa5]+$/.test(val)) {
            errorEle.text('请填写中文姓名');
            nameCnEle.addClass('error');     
            return false;       
        } else {
            nameCnEle.removeClass('error');
            return true;
        }
    }

    function submit() {
        $.post('/account/register_simple', {
            nameCn: nameCnEle.val().trim(),
            mobile: mobileEle.val().trim(),
            sourceCode: sourceCode
        });
    }

    $('#open-btn').on('click', function() {
        if (checkMobile() && checkNameCn()) {
            submit();
            $('#step1').hide();
            $('#step2').show();
        }
    });
})();