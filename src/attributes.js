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