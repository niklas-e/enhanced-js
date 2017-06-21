/*! enhanced-js v1.1.1 | (c) Niklas Engblom | MIT License */
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){function t(t,n){if(n=n||u,/^(#?[\w-]+|\.[\w-.]+)$/.test(t))switch(t.charAt(0)){case"#":return e([n.getElementById(t.substr(1))]);case".":var r=t.substr(1).replace(/\./g," ");return e(n.getElementsByClassName(r));default:return e(n.getElementsByTagName(t))}return e(n.querySelectorAll(t))}function e(t){for(var e=[],r=0,o=t.length;r<o;r++)e[r]=t[r];return n(e)}function n(t){return t.addClass=function(t){var e=this;if(!this.length||!t)return this;t.split(" ").forEach(function(t){return r(e,t)})},t.removeClass=function(t){var e=this;if(!this.length||!t)return this;t.split(" ").forEach(function(t){return o(e,t)})},t.hasClass=function(t){if(!this.length||!t)return!1;for(var e=0,n=this.length;e<n;e++)if(!this[e].classList.contains(t))return!1;return!0},t.first=function(){return n([this[0]])},t.last=function(){return n([this[this.length-1]])},t}function r(t,e){for(var n=0,r=t.length;n<r;n++)t[n].classList.add(e)}function o(t,e){for(var n=0,r=t.length;n<r;n++)t[n].classList.remove(e)}function i(t,e){if("string"==typeof t)return e?u.createElementNS(e,t):u.createElement(t);if(t instanceof Element||t instanceof Node)return t;if("object"!=(void 0===t?"undefined":_typeof(t)))throw Error("e.create | given value must be a string, DOM element or an object.");var n=e?u.createElementNS(e,t.tag):u.createElement(t.tag),r=t.events;if(t.content&&(n.innerHTML=t.content),r)for(var o=0,a=r.length;o<a;o++){var s=r[o];n.addEventListener(s.type,s.listener)}var f=t.children;for(var c in t)"children"!=c&&"tag"!=c&&"content"!=c&&"events"!=c&&n.setAttribute(c,t[c]);if(f)for(var l=0,d=f.length;l<d;l++)n.appendChild(i(f[l],e));return n}function a(t){return new Promise(function(e,n){"string"==typeof t&&(t={url:t});var r=t.type;t=Object.assign({method:"GET"},t);var o=t.headers||{},i=new XMLHttpRequest;if(i.onerror=function(){n([i.status,i])},i.onreadystatechange=function(){if(4==i.readyState){var t=i.status;if(t>=200&&t<=300){var r="application/json"!=o.Accept?i.responseText:JSON.parse(i.responseText);return e(r)}n([t,i])}},i.open(t.method,t.url,!0),o)for(var a in o)i.setRequestHeader(a,o[a]);var s=t.data,u=void 0;s&&("json"==r&&"string"!=typeof s?(u=JSON.stringify(s),i.setRequestHeader("Content-Type","application/json")):u=Object.keys(s).map(function(t){return t+"="+encodeURIComponent(s[t])}).join("&")),i.send(u)})}var s=function(e,n){return e?t(e,n):"v1.1.1"};s.single=function(e,n){return t(e,n).first()},"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=s:window.e=s;var u=document;s.domReady=function(t){if("complete"===u.readyState||"loaded"===u.readyState||"interactive"===u.readyState)return void t();u.addEventListener("DOMContentLoaded",function(e){t()})},s.create=i,s.ajax=a,s.get=function(t){return a(t)},s.post=function(t,e,n){return a(Object.assign({url:t,data:e,method:"POST"},n))}}();