function getFileType (filePath) {
    const bundleType = ['.css', '.js'];
    for (let i = 0; i < bundleType.length; i++) {
        let typeItem = bundleType[i];
        if (filePath.indexOf(typeItem) !== -1) {
            return typeItem.substr(1);
        }
    }
}

module.exports = (entryPoints) => {
    let temp = {}
    for (let [key, val] of entryPoints.entries()) {
        temp[key] = {}
        val.chunks.forEach((item) => {
            item.files.forEach((fileItem) => {
                const fileType = getFileType(fileItem);
                if (!temp[key][fileType]) {
                    temp[key][fileType] = [];
                }
                temp[key][fileType].push(fileItem)
            })
        })
    }
    return temp;
}