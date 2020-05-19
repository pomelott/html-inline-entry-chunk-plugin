
![versioin](https://img.shields.io/badge/version-v0.0.2-blue)
![node-versioin](https://img.shields.io/badge/node-v10.8.0-green)
![npm-versioin](https://img.shields.io/badge/node-v6.2.0-green)
![dependence](https://img.shields.io/badge/dependence-0-blue)
![size](https://img.shields.io/badge/size-31%20kB-blue)


# html-inline-entry-chunk-plugin

Obtain all dependent files according to the entrance and synthesize HTML files according to the dependencies.

If it is useful please give the star.（如果有用，请给星！ / 役立つ場合は、星をつけてください / 유용하다면 별을주세요.）

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
                chunk: ['runtime'] //chunk is invalid
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
