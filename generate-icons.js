const webfontsGenerator = require('webfonts-generator'),
      fs = require('fs'),
      path = require('path')

const src = path.resolve(__dirname, './front/icons'),
      dest = path.resolve(__dirname, './front/fonts')

console.log('Generating icon font…')

fs.readdir(src, (err, files) => {
  if (err) {
    
    console.warn('Failed to get list of icons', err)
    
  } else {
    
    webfontsGenerator({
      
      files: files.map(f => `${src}/${f}`),
      dest,
      fontName: 'icons',
      cssFontsUrl: 'fonts/'
      
    }, error => {
      if (error) {
        console.warn('Ooops... (( Failed to generate icon font', error)
      } else {
        console.log('Awesome!! Successfully generated icon font!')
      }
    })
    
  }
})
