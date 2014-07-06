iu.init.label = function (el) {
    var $el = $(el);
    $el.children().iu();
    $el.on('click', function () {
        $($el.iu('target') || $el.children()).triggerHandler('click');
    });
};

$.iu.label = {
    val: function (value) {
        var $this = $(this);
        if (value === undefined)
            return $this.text();
        $this.text(value);
    },
    target: function (value) {
        var $this = $(this);
        if (value !== undefined) {
            if (typeof value == 'string' || value instanceof String) {
                this.__iu_label_target__ = $('#' + $this.attr('for'))[0];
                $this.attr('for', value);
            } else {
                this.__iu_label_target__ = value;
            }
        } else {
            if (this.__iu_label_target__ === undefined)
                this.__iu_label_target__ = $('#' + $this.attr('for'))[0];
        }
        return this.__iu_label_target__;
    },
    text: function (value) {
        var $this = $(this);
        if (value !== undefined)
            $this.text(value);
        return $this.text();
    }
};
