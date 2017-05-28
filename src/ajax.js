function ajax(options) {
    return new Promise((resolve, reject) => {
        if(typeof options == 'string') options = {url: options};
        let type = options.type;

        options = Object.assign({
            method: 'GET'
        }, options);

        let headers = options.headers || {};
        let xhr = new XMLHttpRequest();
        
        xhr.onerror = function() {
            reject([xhr.status, xhr]);
        };
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                let result = headers['Accept'] != 'application/json' ? xhr.responseText : JSON.parse(xhr.responseText);
                xhr.status == 200 ? resolve(result) : reject([xhr.status, xhr]);
            }
        };
        xhr.open(options.method, options.url, true);

        if(headers) {
            for(let p in headers) xhr.setRequestHeader(p, headers[p]);
        }
        let data = options.data;
        let postData;
        if(data) {
            if(type == 'json' && typeof data != 'string') {
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