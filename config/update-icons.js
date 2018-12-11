var fs = require('fs-extra');
var path = require('path');

const envPath = process.env['ICONS_ROOT'] || '/Users/bvvliet/Documents/Icon-Export';

if (fs.existsSync(path.join(envPath, 'MusicRank'))) {

  if (fs.existsSync(path.join(envPath, 'MusicRank/fonts/'))) {
    const srcFolder = path.join(envPath, 'MusicRank/fonts/');
    const targetFolder = path.join(__dirname, '../src/assets/fonts/');

    fs.copySync(srcFolder, targetFolder);

    if (fs.existsSync(path.join(envPath, 'MusicRank/scss/icons.scss'))) {
      const srcIconsFile = path.join(envPath, 'MusicRank/scss/icons.scss');
      const targetIconsFile = path.join(__dirname, '../src/styles/icon/_icon-names.scss');

      fs.copySync(srcIconsFile, targetIconsFile);
    } else {
      console.log('Icons file not found in', path.join(envPath, 'MusicRank/scss/icons.scss'));
    }
  } else {
    console.log('Fonts folder not found in', path.join(envPath, 'MusicRank/fonts/'));
  }

} else {
  console.log('MusicRank not found in', path.join(envPath));
  const available = fs.readdirSync(envPath);
  console.log('All available fonts (' + available.length + ')', available.join(', '));
}
