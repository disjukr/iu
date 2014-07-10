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
        if (value) {
            $this.iu('group').iu('members').val(false);
            $this.attr('checked', 'checked');
        }
        else {
            $this.removeAttr('checked');
        }
    },
    value: function (value) {
        var $this = $(this);
        if (value !== undefined)
            $this.attr('value', value);
        return $this.attr('value');
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
    },
    group: function (value) {
        var $this = $(this);
        var $group = $(this.__iu_radio_group__);
        if (value === undefined)
            return $group;
        var $oldGroup = $this.iu('group');
        if ($oldGroup.length > 0)
            $oldGroup.iu('remove', this);
        var $newGroup = $(value);
        if ($newGroup.is('[iu-radio-group]')) {
            if (!$newGroup.iu('has', this))
                $newGroup.iu('add', this);
            this.__iu_radio_group__ = $newGroup[0];
        }
    }
};
