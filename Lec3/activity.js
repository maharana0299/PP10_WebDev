let fs = require('fs');
let path = require('path'); // for extensions
let extensions = {
    'Images': ['.png', '.jpg', '.jpeg', 'gif'],
    'Audio': ['.mp3'],
    'Document': ['.pdf', '.txt', '.doc'],
    'Compressed': ['.zip', '.rar'],
    'Videos': ['.mkv', '.mp4'],
}
let input = process.argv.slice(2);
console.log(input);

let folderPath = input[0];
let content = fs.readdirSync(input[0]);
// console.log(content);
let extFolderpath = folderPath;


function checkFolder(extName, fpath) {

    for (let key in extensions) {
        let arr = extensions[key];
        let isExist = arr.includes(extName); // is value exists

        if (isExist == true) {
            // console.log(key);
            extFolderpath = path.join(fpath, key); // Joins, eg Material + Key(Image) = Material/Image
            break;
        }
    }

    return fs.existsSync(extFolderpath);
}

function createFolder() {
    // console.log(extFolderpath);
    fs.mkdirSync(extFolderpath); // create Folder using directory
}

for (let i = 0; i < content.length; i++) {
    // console.log(content[i]);
    //to get extensions
    // console.log(path.format(content[i]));
    let extname = path.extname(content[i]);
    let extensionFolderExist = checkFolder(extname, folderPath);
    // console.log(extensionFolderExist);
    // console.log(fpath);
    if (extensionFolderExist == false) {
        createFolder();
    }

    //HomeWork 
    let filePath = path.join(folderPath, content[i]);
    console.log(filePath);
    if (extname.trim() != '') {
        fs.copyFileSync(filePath, path.join(extFolderpath, content[i]));
        fs.unlinkSync(filePath)
    }

}