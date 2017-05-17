(() => {
    //let e = window.e = selector => selector ? [].slice.call(document.querySelectorAll(selector)).map(EnhancedElement) : 'v0.1';
    let e = window.e = selector => selector ? {
        elements: [].slice.call(document.querySelectorAll(selector)).map(EnhancedElement),
        addClass: function(cssClass) { this.elements.forEach(el => el.addClass(cssClass))}
     } : 'v0.1';

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
