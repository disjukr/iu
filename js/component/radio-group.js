iu.init['radio-group'] = function (el) {
    var $el = $(el);
    el.__iu_radio_group_members__ = [];
    $('[iu-radio]', el).iu('group', el);
};

$.iu['radio-group'] = {
    val: function (value) {
        var $this = $(this);
        var $selected
        return $($this.iu('selected')).iu('value');
    },
    selected: function () {
        return $('[iu-radio][checked]', this)[0];
    },
    members: function () {
        return this.__iu_radio_group_members__.concat();
    },
    has: function (value) {
        var member = $(value)[0];
        var members = this.__iu_radio_group_members__;
        members.indexOf(member);
        return value != -1;
    },
    add: function (value) {
        var $this = $(this);
        if (value.jquery) {
            value.each(function () {
                $this.iu('add', this);
            });
        }
        if (!$this.iu('has', value) && $(value).is('[iu-radio]'))
            this.__iu_radio_group_members__.push(value);
        return $this;
    },
    remove: function (value) {
        var $this = $(this);
        if (value.jquery) {
            value.each(function () {
                $this.iu('remove', this);
            });
        }
        var members = this.__iu_radio_group_members__;
        var index = members.indexOf(value);
        var $value = $(value);
        if (index > -1) {
            this.__iu_radio_group_members__.splice(index, 1);
            if ($value.is('[iu-radio]'))
                $value.iu('group', null);
        }
        return $this;
    }
};
