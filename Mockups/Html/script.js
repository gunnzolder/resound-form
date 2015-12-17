(function($){
    var cloneControls = document.querySelectorAll('.configurator__control-group__copy-values input');

    for (var i = 0; i < cloneControls.length; i++) {
        cloneControls[i].addEventListener('change', copyValues);
    }

    function copyValues(e) {
        var $container = $(e.target).closest('.configurator__control-group'),
            $inputs = $container.find('.configurator__input'),
            checked = e.target.checked;

        $container[0].classList.toggle('configurator__control-group--disabled');

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
            $('.configurator__control-group--right').hide();
            $('.configurator__control-group--left').show();
            var copyValuesControls = $('.configurator__control-group__copy-values');
            console.log(copyValuesControls);
            $.each(copyValuesControls , function(){
                $(this).find('input').trigger('click', false);
                $(this).hide();
            });
        } else if (e.target.value == 'right') {
            $('.configurator__control-group--left').hide();
            $('.configurator__control-group--right').show();
        } else {
            $('.configurator__control-group--left').show();
            $('.configurator__control-group--right').show();
            var copyValuesControls = $('.configurator__control-group__copy-values');
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
            .closest('.configurator__section')
            .find('.configurator__control-group__copy-values input')[0]
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