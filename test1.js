const fs = require('fs')
const path = require('path')
let images = []

function readDir(pathDir) {
    let stat = fs.statSync,
      info = {
        path: pathDir,
        name: path.basename(pathDir)
      } 
    if(stat(pathDir).isDirectory()) {
      info.type = "folder"
      info.children = fs.readdirSync(pathDir)
        .map((file) => {
          return readDir(pathDir + '/' + file)
        })
    } else {
      info.type = "file"
      images.push({'src': path.basename(pathDir), 'folder': 1})
      console.log('image : ======' + images);
    }
    return info
  }
const pathDir = __dirname + '/public/image'
const data = readDir(pathDir);
// console.log(data);

let json = JSON.stringify(data)
fs.writeFileSync('data.json', json)