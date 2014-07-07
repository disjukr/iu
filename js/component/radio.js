iu.init.radio = function (el) {
    var $el = $(el);
    $el.on('click', function (e) {
        if ($el.iu('disabled'))
            return;
        if (!$el.val()) {
            $el.val(true);
            $el.trigger('change');
        }
        e.stopPropagation();
    });
};

$.iu.radio = {
    val: function (value) {
        var $this = $(this);
        if (value === undefined)
            return $this.attr('checked') === 'checked';
        if (value)
            $this.attr('checked', 'checked');
        else
            $this.removeAttr('checked');
    },
    checked: function (value) {
        var $this = $(this);
        if (value !== undefined)
            $this.val(value);
        return $this.val();
    },
    disabled: function (value) {
        var $this = $(this);
        if (value !== undefined) {
            if (value)
                $this.attr('disabled', 'disabled');
            else
                $this.removeAttr('disabled');
        }
        return $this.attr('disabled') !== undefined;
    }
};
