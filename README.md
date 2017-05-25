# enhanced-js

Lightweight JavaScript library to write more compact and readable code.

Developed to reduce the need to copy basic functionalities between projects. It does not have any fancy new functionalities, but rather wraps in all the generic routines which you may need when working with plain JS. All animations and stuff like that were left out because most of them can be done with CSS. Hence the small size of only 3KB.

## Installation

### npm + CommonJS

`npm i --save enhanced-js`
```
var e = require('enhanced-js');
```

### Include as a standalone JS file
Get from Github: [minified](dist/enhanced.js)
```
<script src="/path/to/enhanced.js"></script>
```

## Usage

### DOM query

All the query results are returned as an "Enhanced" array. Meaning it will have few helpful methods (addClass, removeClass and hasClass) in addition to all of the standard array methods. Simple queries are also optimized for better performance, but more complex queries will be done via document.querySelectorAll. Therefore it's more about the browser's performance when you are doing complex queries.

Class manipulations
```
// Get all anchor elements
var links = e('a');
// Add "button" class and remove "link" class
links.addClass('button').removeClass('link');
```

Get specific item
```
// These methods will return nodes as an enhanced array
var firstNews = e('.news-item').first();
var lastNews = e('.news-item').last();

// You can also get the plain objects by via array indexes
var firstNews = e('.news-item')[0];
var thirdNews = e('.news-item')[2];
```

Note: you can also pass a DOM node as second parameter which will be used as a context for the queries. By default "document" will be used as the context.

### DOM creation

Create nested structure. Note that you can also pass only a string to create an empty element.
```
var emptyDiv = e.create('div');

var newsItem = e.create({
    tag: 'article',
    class: 'news-item',
    children: [
        {
            tag: 'strong',
            class: 'title',
            content: 'Breaking news! Something really happened.'
        },
        {
            tag: 'div',
            content: 'Lorem ipsum dolor sit amet, eu in est fugiat labore ex incididunt deserunt ullamco officia duis mollit mollit.',
            children: [
                'br',
                {
                    tag: 'a',
                    href: '/path/to/news',
                    content: 'Read more'
                }
            ]
        }
    ]
});
```

Set event listeners on creation
```
var button = e.create({
    tag: 'button',
    content: 'Click me!',
    events: [
        {
            type: 'mouseover',
            listener: () => {
                console.log('Almost there! Now just click me!');
            }
        },
        {
            type: 'click',
            listener: event => {
                alert('Yay, you really clicked me! :)');
            }
        }
    ]
});
```

### AJAX

AJAX functions return a promise object. Therefore if you have to support older browsers (or IE), you must include your favorite promise library. For example [bluebird](http://bluebirdjs.com/docs/getting-started.html).

```
e.ajax({
    url: '/api/posts',
    // default method is GET
    method: 'post',
    // default type is key-value pairs (name=...&email=...&feedback=...)
    type: 'json',
    data: {
        name: 'Matti Meikäläinen',
        email: 'matti.meikalainen@example.com',
        feedback: 'Nice one!'
    }
}).then(result => {
    // do something with the result
}).catch(error => {
    // oh noes!
    // error[0] contains the status code
    // error[1] contains the xhr object
});
```

Shorthands
```
// Same as e.ajax({url: '/api/posts'})
e.get('/api/posts')
    .then(result => {
        // success!
    })
    .catch(error => {
        // uh-oh..
    });

// Same as e.ajax({ url: '/api/posts', method: 'post', data: { name: 'Matti Meikäläinen'}, type: 'json'})
e.post('/api/posts', { name: 'Matti Meikäläinen' }, { type: 'json' })
    .then(result => {
        // success!
    })
    .catch(error => {
        // what now!?
    });
```

## Licensed under MIT License

Copyright 2017 Niklas Engblom

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.