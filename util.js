const {join} = require('path');
var validUrl = require('valid-url');
let model = {
    js: {
        tagName: 'script',
        closeTag: true,
        attributes: {
            type: 'text/javascript',
            src: ''
        }
    },
    css: {
        tagName: 'link',
        closeTag: false,
        attributes: {
            type: 'text/css',
            rel: "stylesheet",
            href: ''
        }
    }
}

module.exports.createTagModel = (filePath, opt) => {
    const fileType = filePath.match(/(?:.*?\.)(\w+)(?:\?.*)?$/)[1];
    const temp = JSON.parse(JSON.stringify(model[fileType]))
    switch (fileType) {
        case 'css':
            if (validUrl.isWebUri(opt.baseCssDir)) {
                temp.attributes.href = opt.baseCssDir + filePath;
            } else {
                temp.attributes.href = join(opt.baseCssDir, filePath);
            }
            
            break;
        case 'js':
            if (validUrl.isWebUri(opt.baseJsDir)) {
                temp.attributes.src = opt.baseJsDir + filePath;
            }  else {
                temp.attributes.src = join(opt.baseJsDir, filePath);
            }
            
            break;
        default:
            temp = {};
    }
    
    return temp;
}

module.exports.mixTag = (entryModule, opt) => {
    opt.tag.head = opt.tag.head ? opt.tag.head : [];
    opt.tag.body = opt.tag.body ? opt.tag.body : [];
    let temp = {
        head: [],
        body: []
    }
    if (opt.tagPriority === 1) {
        temp.head = opt.tag.head;
        temp.body = opt.tag.body;
    }
    for (let key in entryModule) {
        temp[opt.inject[key]] = temp[opt.inject[key]].concat(entryModule[key]);
    }
    if (opt.tagPriority === 0) {
        temp.head = temp.head.concat(opt.tag.head);
        temp.body = temp.body.concat(opt.tag.body);
    }
    return temp;
}