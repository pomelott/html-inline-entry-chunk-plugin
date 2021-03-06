
![webpack-versioin](https://img.shields.io/badge/webpack-4.0.0+-green)
![node-versioin](https://img.shields.io/badge/node-v10.8.0-green)
![npm-versioin](https://img.shields.io/badge/npm-v6.2.0-green)
![html-webpack-plugin](https://img.shields.io/badge/html--webpack--plugin-v4.3.0-blue)

<img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">


# html-inline-entry-chunk-plugin

*notice: use this with html-webpack-plugin*

When useing optimization.splitChunks, obtain all dependent files according to the entrance and synthesize HTML files according to the dependencies.

If it is useful please give the star on the github.（如果有用，请给星！ / 役立つ場合は、星をつけてください / 유용하다면 별을주세요.）

## Download
```
    npm install --save-dev html-inline-entry-chunk-plugin
```

## Fast use

* use in single page

```js
    // webpack plugin config
    module.exports = {
        entry: {
            index: './src/js/index.js'
        },
        plugin: [
            new htmlInlineEntryChunkPlugin(),
            // when useing inlineHtmlEntryChunkPlugin, the chunk param in htmlWebpackPlugin is invalid
            new htmlWebpackPlugin({
                entry: 'index',  // need to be consistent with the entry name
                title: 'test-page',
                template: 'tpl.html',
                chunk: ['chunkName'] //chunk is invalid
            })
        ]
    }
```

* use in multi page

```js
    // webpack plugin config
    module.exports = {
        entry: {
            index: './src/js/index.js',
            list: './src/js/list.js'
        },
        plugin: [
            new htmlInlineEntryChunkPlugin(),
            new htmlWebpackPlugin({
                entry: 'index'
            }),
            new htmlInlineEntryChunkPlugin(),
            new htmlWebpackPlugin({
                entry: 'list'
            })
        ]
    }
```

## Options

| Name | Type | Default | Description |
| :---: | :---: | :---: | :---: |
| inject | {Object} | {css: 'head', js: 'body'} | control the assets of position in HTML|
| tag | {Object} | {} | Add additional resource tags |
| tagPriority | {Number} | 0 | Control the insertion order of entry chunk and other tags |
| baseJsDir | {String} | '' | Control the prefix of script tags in html |
| baseCssDir | {String} | '' | Control the prefix of link tags in html |


## Example

```js
    module.exports = {
        plugin: [
            new htmlInlineEntryChunkPlugin({
                inject: {
                    js: 'body',
                    css: 'head'
                },
                tagPriority: 1,  // 1: inline custom tag first   0: inline chunk file first
                baseJsDir: '../',
                baseCssDir: '//www.cdn-plugin.com/css/',
                tag: {
                    // Control the corresponding introduction order according to the position in the array
                    head: [
                        'https://cdn.bootcdn.net/ajax/libs/basscss/8.1.0/css/basscss-cp.css',
                        'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js'
                    ],
                    body: [
                        'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.0/animate.compat.css',
                        'https://cdn.bootcdn.net/ajax/libs/Chart.js/3.0.0-alpha/Chart.esm.js'
                    ]
                }
            }),
            new htmlWebpackPlugin({
                entry: 'index'
            })
        ]
    }
```
