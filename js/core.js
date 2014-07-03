
// 모든 gosim 컴포넌트에는 이 prefix가 들어가야 한다.
var gosimPrefix = 'gosim-';
function withPrefix(type) { return gosimPrefix + type; }
function checkPrefix(type) { return type.substr(0, gosimPrefix.length) == gosimPrefix; }
function cutPrefix(type) { return type.substr(gosimPrefix.length); }

function componentType(el) {
    var type = undefined;
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
           el.type                     === undefined;
}

function initialize(el, type) {
    type = type || componentType(el);
    var initializer = type ? gosim.components[type] : null;
    if (initializable(el) && initializer) {
        el.type = withPrefix(type);
        initializer(el);
    }
}

function gosim() {
    var first = arguments[0];
    var second = arguments[1];
    /*
     *  $(selector).gosim({
     *      prop: value
     *  });
     */
    if (second === undefined) {
        this.each(function () {
            var type = componentType(this);
            var componentMethods = $.gosim[type];
            initialize(this, type);
            if (!componentMethods)
                return;
            $.each(first, function (key, value) {
                var method = componentMethods[key];
                if (typeof method == 'function')
                    method.apply(this, [].concat(value));
            });
        });
        return this;
    }
    /*
     *  $(selector).gosim('prop', value);
     */
    this.each(function () {
        var type = componentType(this);
        var componentMethods = $.gosim[type];
        var method = componentMethods ? componentMethods[first] : null;
        initialize(this, type);
        if (typeof method == 'function')
            method.apply(this, [].concat(second));
    });
    return this;
}
gosim.components = {};
$.gosim = {};
$.fn.gosim = gosim;
