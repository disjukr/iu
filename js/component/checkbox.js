iu.components.checkbox = function (el) {
    var $el = $(el);
    $.valHooks[el.type] = {
        get: function () {
            return $el.attr('checked') === 'checked';
        },
        set: function (el, value) {
            if (value)
                $el.attr('checked', 'checked');
            else
                $el.removeAttr('checked');
        }
    };
    $.iu.checkbox = {
        checked: function (value) {
            if (value !== undefined)
                $el.val(value);
            return $el.val();
        },
        disabled: function (value) {
            if (value !== undefined) {
                if (value)
                    $el.attr('disabled', 'disabled');
                else
                    $el.removeAttr('disabled');
            }
            return $el.attr('disabled') !== undefined;
        }
    };
    $el.on('click', function () {
        if ($el.iu('disabled'))
            return;
        $el.val(!$el.val());
        $el.trigger('change');
    });
};
