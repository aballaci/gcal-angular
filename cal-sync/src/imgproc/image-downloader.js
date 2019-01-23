var path = require ("path");
const download = require('image-downloader')
var fs = require('fs');

module.exports.getImage = function(fileId, filename, callback){

    var destination = '';

    if (process.env.NODE_ENV == 'production') {
        destination = '/var/responsive';
    } else {
        destination = path.join(__dirname, '/../../img/');
    }

    var fileNameParts = filename.split('.');
    fileNameParts[0] = fileId;
    var newName = fileNameParts.join('.');

    const options = {
        url: 'https://drive.google.com/uc?id=' + fileId,
        dest: path.join(destination, newName)                  // Save to /path/to/dest/image.jpg
    }

    if(fs.existsSync(options.dest)){
        console.log('file ' + options.dest + ' exists already!');
        return;
    }
    download.image(options)
        .then(({ filename, image }) => {
            callback(filename);
        })
        .catch((err) => {
            console.error('Error downloading image: ' + err)
        });
};

