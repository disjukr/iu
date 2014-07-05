gosim.components.label = function (el) {
    var $el = $(el);
    $.valHooks[el.type] = {
        get: function () {
            return $el.text();
        },
        set: function (el, value) {
            $el.text(value);
        }
    };
    $.gosim.label = {
        target: function (value) {
            if (value !== undefined)
                $el.attr('for', value);
            return $('#' + $el.attr('for'))[0];
        },
        text: function (value) {
            if (value !== undefined)
                $el.text(value);
            return $el.text();
        }
    };
    $el.on('click', function () {
        var $target = $($el.gosim('target'));
        $target.trigger('click');
    });
};
