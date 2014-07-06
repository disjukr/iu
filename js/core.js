
// 모든 iu 컴포넌트에는 이 prefix가 들어가야 한다.
var prefix = 'iu-';
function withPrefix(type) { return prefix + type; }
function checkPrefix(type) { return type.substr(0, prefix.length) == prefix; }
function cutPrefix(type) { return type.substr(prefix.length); }

function componentType(el) {
    var type;
    $.each(el.attributes, function (index, attribute) {
        if (checkPrefix(attribute.name)) {
            type = cutPrefix(attribute.name);
            return false;
        }
    });
    return type;
}

function initializable(el, type) {
    return (type || componentType(el)) !== undefined &&
           el.type                     !== 'iu';
}

function initialize(el, type) {
    type = type || componentType(el);
    var initializer = type ? iu.init[type] : null;
    if (initializable(el) && initializer) {
        el.type = 'iu';
        initializer(el);
    }
}

function iu() {
    // $(selector).iu();
    if (arguments.length === 0) {
        this.each(function () {
            initialize(this);
        });
        return this;
    }
    var first = arguments[0];
    var second = arguments[1];
    /*
     *  apply method all of selections
     *  return first selection's method call result
     *
     *  $(selector).iu('prop', value);
     */
    if (typeof first == 'string' || first instanceof String) {
        var result;
        this.each(function (index) {
            var type = componentType(this);
            var componentMethods = $.iu[type];
            var method = componentMethods ? componentMethods[first] : null;
            initialize(this, type);
            if (typeof method == 'function') {
                if (index == 0) // store result in first iteration
                    result = method.apply(this, [].concat(second));
                else
                    method.apply(this, [].concat(second));
            }
        });
        return result;
    }
    /*
     *  returns jQuery chain
     *
     *  $(selector).iu({
     *      prop: value
     *  });
     */
    this.each(function () {
        var type = componentType(this);
        var componentMethods = $.iu[type];
        initialize(this, type);
        if (!componentMethods)
            return;
        var self = this;
        $.each(first, function (key, value) {
            var method = componentMethods[key];
            if (typeof method == 'function')
                method.apply(self, [].concat(value));
        });
    });
    return this;
}
iu.init = {};
$.iu = {};
$.fn.iu = iu;
$.valHooks['iu'] = {
    get: function (el) {
        return $(el).iu('val');
    },
    set: function (el, value) {
        $(el).iu('val', value);
    }
}
