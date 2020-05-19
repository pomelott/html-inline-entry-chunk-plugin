# html-inline-entry-chunk-plugin

<img src="https://img.shields.io/badge/node-v1.1.1-green">

Obtain all dependent files according to the entrance and synthesize HTML files according to the dependencies


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
            new inlineHtmlEntryChunkPlugin(),
            new htmlWebpackPlugin({
                entry: 'index',
                chunk: ['runtime'] // chunk已无效
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
            new inlineHtmlEntryChunkPlugin(),
            new htmlWebpackPlugin({
                entry: 'index'
            }),
            new inlineHtmlEntryChunkPlugin(),
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


## Example

```js
    module.exports = {
        plugin: [
            new htmlInlineEntryChunkPlugin({
                inject: {
                    js: 'body',
                    css: 'head'
                },
                tagPriority: 1,
                tag: {
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