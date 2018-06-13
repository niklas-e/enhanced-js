function setStyles(node, styles) {
    for(let styleName in styles) {
        node.style[styleName] = styles[styleName];
    }
}

function addStyleExtensions(nodeArray) {
    nodeArray.setStyles = function(styles) {
        if(!this.length || !styles) return this;

        for(let i = 0; i < this.length; i++) {
            if(typeof styles == 'object') setStyles(this[i], styles);
            else this[i].style = styles;
        }
    };
}