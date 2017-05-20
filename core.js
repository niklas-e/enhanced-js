(() => {
    var root = document;

    //let e = window.e = selector => selector ? [].slice.call(document.querySelectorAll(selector)).map(EnhancedElement) : 'v0.1';
    let e = window.e = (selector, context) => selector ? {
        elements: queryDom(selector, context),
        addClass: function(cssClass) { this.elements.forEach(el => el.addClass(cssClass))}
     } : 'v0.1';

    e.single = selector => EnhancedElement(document.querySelector(selector));

    function queryDom(selector, context) {
        context = context || root;
        // Redirect simple selectors to the more performant function
        if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
            switch (selector.charAt(0)) {
                case '#':
                    // Handle ID-based selectors
                    return toArray([context.getElementById(selector.substr(1))]);
                case '.':
                    // Handle class-based selectors
                    // Query by multiple classes by converting the selector 
                    // string into single spaced class names
                    var classes = selector.substr(1).replace(/\./g, ' ');
                    return toArray(context.getElementsByClassName(classes));
                default:
                    // Handle tag-based selectors
                    //return [].slice.call(context.getElementsByTagName(selector));
                    return toArray(context.getElementsByTagName(selector));
            }
        }
        // Default to `querySelectorAll`
        return toArray(context.querySelectorAll(selector));
    }

    function toArray(nodeList) {
        let arr = [];
        for(let i = 0, length = nodeList.length; i < length; i++) {
            arr[i] = EnhancedElement(nodeList[i]);
        }
        return arr;
    } 

    e.domReady = callback => {
        if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
            //already loaded
            callback();
            return;
        }

        document.addEventListener("DOMContentLoaded", function(event) { 
            callback();
        });
    }

    //DOM manipulation
    e.create = tagName => document.createElement(tagName);

    function EnhancedElement(element) {
        return {
            elem: element,
            addClass: function(cssClass) {
                if(this.elem && cssClass) this.elem.classList.add(cssClass);
                return this;
            },
            removeClass: function(cssClass) {
                if(this.elem && cssClass) this.elem.classList.remove(cssClass);
                return this;
            },
            hasClass: function(cssClass) {
                if(!this.elem || !cssClass) return false;
                return this.elem.classList.contains(cssClass);
            }
        }
    }

    //AJAX
    e.ajax = options => new Promise((resolve, reject) => {
        if(typeof options == 'string') options = {url: options};

        options = Object.assign({
            method: 'GET'
        }, options);

        let xhttp = new XMLHttpRequest();
        xhttp.onerror = function() {
            reject(this);
        };
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            }
        };
        xhttp.open(options.method, options.url, true);
        xhttp.send();
    });
})();
