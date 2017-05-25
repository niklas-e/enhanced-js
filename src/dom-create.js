e.create = create;

function create(options) {
    if(typeof options == 'string') return root.createElement(options);
    else if(typeof options != 'object') throw Error('e.create | given value must be a string or an object.');

    let element = root.createElement(options.tag);
    let events = options.events;
    if(options.content) element.innerHTML = options.content
    if(events) {
        for(let i = 0, length = events.length; i < length; i++) {
            let e = events[i];
            element.addEventListener(e.type, e.listener);
        }
    }
    let children = options.children;

    for(let p in options) {
        if(p == 'children' || p == 'tag' || p == 'content' || p == 'events') continue;
        element.setAttribute(p, options[p]);
    }

    if(children) {
        for(let i = 0, length = children.length; i < length; i++) {
            element.appendChild(create(children[i]));
        }
    }

    return element;
}