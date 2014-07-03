gosim.components.checkbox = function (el) {
    $el = $(el);
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
    $.gosim.checkbox = {
        label: function () {
            console.log('label:', arguments);
            // TODO
        },
        check: function () {
            console.log('check:', arguments);
            // TODO
        },
        available: function () {
            console.log('available:', arguments);
            // TODO
        }
    };
    $el.on('click', function () {
        $el.val(!$el.val());
        $el.trigger('change');
    });
};
