function searchArrayRecursive(needle, haystack, strict) {

    function constructPath(needle, haystack, path, strict) {
        if (!$.isArray(haystack)) {
            return false;
        }
        var index;
        for (index = 0; index < haystack.length; index++) {
            var value = haystack[index];
            var currentPath = $.merge([], path);
            currentPath.push(index);

            if ((strict && value === needle) || (!strict && value == needle)) {
                return currentPath;
            }
            if ($.isArray(value)) {

                var foundPath = constructPath(needle, value, currentPath, strict);
                if (foundPath) {
                    return foundPath;
                }
            }
        }

        return false;
    }


    return constructPath(needle, haystack, [], strict);
}


var getSubMenuItem = function (subMenuItems, id) {
    if (subMenuItems) {
        for (var i = 0; i < subMenuItems.length; i++) {
            if (subMenuItems[i].id == id) {
                return subMenuItems[i];
            }
            var found = getSubMenuItem(subMenuItems[i].items, id);
            if (found) return found;
        }
    }
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}