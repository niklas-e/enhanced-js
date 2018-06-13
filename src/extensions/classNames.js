function addClass(nodes, cssClass) {
    for(let i = 0, length = nodes.length; i < length; i++) {
        nodes[i].classList.add(cssClass);
    }
}

function removeClass(nodes, cssClass) {
    for(let i = 0, length = nodes.length; i < length; i++) {
        nodes[i].classList.remove(cssClass);
    }
}

function addClassNameExtensions(nodeArray) {
    nodeArray.addClass = function(cssClass) {
        if(!this.length || !cssClass) return this;
        // Allow multiple classes
        cssClass.split(' ').forEach(c => addClass(this, c));
    };

    nodeArray.removeClass = function(cssClass) {
        if(!this.length || !cssClass) return this;
        // Allow multiple classes
        cssClass.split(' ').forEach(c => removeClass(this, c));
    };

    nodeArray.hasClass = function(cssClass) {
        if(!this.length || !cssClass) return false;
        for(let i = 0, length = this.length; i < length; i++) {
            if(!this[i].classList.contains(cssClass)) return false;
        }

        return true;
    };
}