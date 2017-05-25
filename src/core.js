(() => {
    var root = document;

    let e = window.e = (selector, context) => selector ? queryDom(selector, context) : 'v0.1';
    e.single = (selector, context) => queryDom(selector, context).first();

    function queryDom(selector, context) {
        context = context || root;
        // Redirect simple selectors to the more performant function
        if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
            switch (selector.charAt(0)) {
                case '#':
                    // ID selectors
                    return toArray([context.getElementById(selector.substr(1))]);
                case '.':
                    // Class selectors
                    // Allow multiple classes by converting the selector into single spaced class names
                    var classes = selector.substr(1).replace(/\./g, ' ');
                    return toArray(context.getElementsByClassName(classes));
                default:
                    // Tag selectors
                    return toArray(context.getElementsByTagName(selector));
            }
        }
        // Default to `querySelectorAll`
        return toArray(context.querySelectorAll(selector));
    }

    function toArray(nodeList) {
        let arr = [];
        for(let i = 0, length = nodeList.length; i < length; i++) {
            arr[i] = nodeList[i];
        }
        return Enhance(arr);
    } 

    e.domReady = callback => {
        if (root.readyState === "complete" || root.readyState === "loaded" || root.readyState === "interactive") {
            //already loaded
            callback();
            return;
        }

        root.addEventListener("DOMContentLoaded", function(event) { 
            callback();
        });
    }

    //DOM manipulation
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

    function Enhance(nodeArray) {
        nodeArray.addClass = function(cssClass) {
            if(!this.length || !cssClass) return this;
            for(let i = 0, length = this.length; i < length; i++) {
                this[i].classList.add(cssClass);
            }
        };

        nodeArray.removeClass = function(cssClass) {
            if(!this.length || !cssClass) return this;
            for(let i = 0, length = this.length; i < length; i++) {
                this[i].classList.remove(cssClass);
            }
        };

        nodeArray.hasClass = function(cssClass) {
            if(!this.length || !cssClass) return false;
            for(let i = 0, length = this.length; i < length; i++) {
                if(!this[i].classList.contains(cssClass)) return false;
            }

            return true;
        };

        nodeArray.first = function() {
            return Enhance([this[0]]);
        };

        nodeArray.last = function() {
            return Enhance([this[this.length-1]]);
        };

        return nodeArray;
    }

    //AJAX
    function ajax(options) {
        return new Promise((resolve, reject) => {
            if(typeof options == 'string') options = {url: options};

            options = Object.assign({
                method: 'GET'
            }, options);

            let headers = options.headers;
            let xhr = new XMLHttpRequest();
            
            xhr.onerror = function() {
                reject([xhr.status, xhr]);
            };
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    xhr.status == 200 ? resolve(xhr.responseText) : reject([xhr.status, xhr]);
                }
            };
            xhr.open(options.method, options.url, true);

            if(headers) {
                for(let p in headers) xhr.setRequestHeader(p, headers[p]);
            }
            let data = options.data;
            let postData;
            if(data) {
                if(options.type == 'json' && typeof data != 'string') {
                    postData = JSON.stringify(data);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
                else {
                    postData = Object.keys(data)
                        .map(key => key + '=' + encodeURIComponent(data[key]))
                        .join('&');
                }
            }

            xhr.send(postData);
        });
    }

    e.ajax = ajax;
    e.get = url => ajax(url);
    e.post = (url, data, options) => ajax(Object.assign({ url, data, method: 'POST' }, options));
})();
