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
            return 'label';
            // TODO
        },
        check: function () {
            console.log('check:', arguments);
            return 'check';
            // TODO
        },
        available: function () {
            console.log('available:', arguments);
            return 'available';
            // TODO
        }
    };
    $el.on('click', function () {
        $el.val(!$el.val());
        $el.trigger('change');
    });
};
