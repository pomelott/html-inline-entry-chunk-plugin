
const getRuntimeChunk = require('./getEntryChunk')
const {createTagModel, mixTag} = require('./util')
class htmlInlineEntryChunkPlugin {
    constructor (opt) {
      this.name = 'htmlInlineEntryChunkPlugin';
      this.opt = {
        inject: {
          js: 'body',
          css: 'head'
        },
        tag: {},
        tagPriority: 0
      }
      this.init(opt)
    }


    init (opt) {
      this.opt = Object.assign(this.opt, opt)
    }

    apply (compiler) {
      compiler.hooks.emit.tap(this.name, (compilation) => {
        const runtimeChunk = getRuntimeChunk(compilation.entrypoints);
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(this.name, (pluginArgs, cb) => {
        pluginArgs.head = [];
        pluginArgs.body = [];
          let entryModule = runtimeChunk[pluginArgs.plugin.options.entry];
          let mixModule = mixTag(entryModule, this.opt);
          for (let pos in mixModule) {
            mixModule[pos].forEach((fileItem) => {
                let tagModel = createTagModel(fileItem);
                pluginArgs[pos].push(tagModel);
            })
          }
          cb(null, pluginArgs)
        })
      })
    }

}
 
  
  module.exports = htmlInlineEntryChunkPlugin;