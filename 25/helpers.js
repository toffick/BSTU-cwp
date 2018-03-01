const fs = require('fs');
const mime = require('mime');

module.exports = {
    getFileInfo(filePath) {
        const descriptor = fs.openSync(filePath, 'r');

        const stat = fs.fstatSync(descriptor);
        const contentType = mime.getType(filePath);

        return {
            descriptor,
            headers: {
                'content-length': stat.size,
                'last-modified': stat.mtime.toUTCString(),
                'content-type': contentType
            }
        }
    }
};

