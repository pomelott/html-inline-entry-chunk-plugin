module.exports = (entryPoints) => {
    let temp = {}
    for (let [key, val] of entryPoints.entries()) {
        temp[key] = {}
        val.chunks.forEach((item) => {
            item.files.forEach((fileItem) => {
                const fileType = fileItem.match(/(?:.*?\.)(\w+)$/)[1];
                if (!temp[key][fileType]) {
                    temp[key][fileType] = [];
                }
                temp[key][fileType].push(fileItem)
            })
        })
    }
    return temp;
}