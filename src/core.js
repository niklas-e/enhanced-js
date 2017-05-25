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

    //DOM manipulation
    //=require dom-create.js

    //AJAX
    //=require ajax.js
})();
