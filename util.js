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

module.exports.createTagModel = (filePath) => {
    const fileType = filePath.match(/(?:.*?\.)(\w+)(?:\?.*)?$/)[1];
    console.log('===========')
    console.log(fileType)
    const temp = JSON.parse(JSON.stringify(model[fileType]))
    switch (fileType) {
        case 'css':
            temp.attributes.href = filePath;
            break;
        case 'js':
            temp.attributes.src = filePath;
            break;
        default:
            temp = {};
    }
    
    return temp;
}

module.exports.mixTag = (entryModule, opt) => {
    console.log(entryModule)
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