
const getRuntimeChunk = require('./getEntryChunk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {createTagModel, mixTag} = require('./util')
const _ = require('lodash');
class htmlInlineEntryChunkPlugin {
    constructor (opt) {
      this.name = 'htmlInlineEntryChunkPlugin';
      this.opt = {
        inject: {
          js: 'body',
          css: 'head'
        },
        tag: {},
        tagPriority: 0,
        baseCssDir: '',
        baseJsDir: ''
      }
      this.init(opt)
    }


    init (opt) {
      this.opt = _.merge(this.opt, opt)
    }

    apply (compiler) {
      compiler.hooks.emit.tap(this.name, (compilation) => {
        const runtimeChunk = getRuntimeChunk(compilation.entrypoints);
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(this.name, (pluginArgs, cb) => {
          pluginArgs.headTags = [];
          pluginArgs.bodyTags = [];
            let entryModule = runtimeChunk[pluginArgs.plugin.options.entry];
            let mixModule = mixTag(entryModule, this.opt);
            for (let pos in mixModule) {
              mixModule[pos].forEach((fileItem) => {
                  let tagModel = createTagModel(fileItem, this.opt);
                  pluginArgs[pos + 'Tags'].push(tagModel);
              })
            }
            cb(null, pluginArgs)
          })
      })
    }

}
 
  
  module.exports = htmlInlineEntryChunkPlugin;