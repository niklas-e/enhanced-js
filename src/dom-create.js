e.create = create;

function create(options) {
    // Create an empty element if only string is passed
    if(typeof options == 'string') return root.createElement(options);
    // DOM element was passed, most likely as a children -> return as is
    else if(options instanceof Element || options instanceof Node) return options;
    // Fail, if passed value is not string, element/node or object
    else if(typeof options != 'object') throw Error('e.create | given value must be a string, DOM element or an object.');

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