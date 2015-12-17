(function($){
    var cloneControls = document.querySelectorAll('.order-form__control-group__copy-values input');

    for (var i = 0; i < cloneControls.length; i++) {
        cloneControls[i].addEventListener('change', copyValues);
    }

    function copyValues(e) {
        var $container = $(e.target).closest('.order-form__control-group'),
            $inputs = $container.find('.order-form__input'),
            checked = e.target.checked;

        $container[0].classList.toggle('order-form__control-group--disabled');

        for (var i = 0; i < $inputs.length; i++) {
            $inputs[i].disabled = checked;
        }
    }

    var sideSelectors = document.querySelectorAll('input[name="side"]');

    for (var i = 0; i < sideSelectors.length; i++) {
        sideSelectors[i].addEventListener('change', showSide);
    }

    function showSide(e) {
        console.log(e.target.value);
        if (e.target.value == 'left') {
            $('.order-form__control-group--right').hide();
            $('.order-form__control-group--left').show();
            var copyValuesControls = $('.order-form__control-group__copy-values');
            console.log(copyValuesControls);
            $.each(copyValuesControls , function(){
                $(this).find('input').trigger('click', false);
                $(this).hide();
            });
        } else if (e.target.value == 'right') {
            $('.order-form__control-group--left').hide();
            $('.order-form__control-group--right').show();
        } else {
            $('.order-form__control-group--left').show();
            $('.order-form__control-group--right').show();
            var copyValuesControls = $('.order-form__control-group__copy-values');
            $.each(copyValuesControls , function(){
                $(this).find('input').prop('checked', true);
                $(this).show();
            });
        }
    }

    var leftInputs = $('[id$=-left]');

    for (var i = 0; i < leftInputs.length; i++) {
        leftInputs[i].addEventListener('change', doTheSame);
    }
    function doTheSame(e) {
        var copyHandler = $(e.target)
            .closest('.order-form__section')
            .find('.order-form__control-group__copy-values input')[0]
            .checked;

        var targetId = e.target.id.replace('-left', '-right');

        if(copyHandler) {
            if (e.target.type == 'checkbox' || e.target.type == 'radio') {
                document.getElementById(targetId).checked = e.target.checked
            } else {
                document.getElementById(targetId).value = e.target.value;
            }
        }



    }
})(jQuery);