// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require('path');
const url = require('url');

//const customTitlebar = require('custom-electron-titlebar');
const customTitlebar = require('..'); // Delete this line and uncomment top line

window.addEventListener('DOMContentLoaded', () => {
  const titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2f3241'),
    icon: url.format(path.join(__dirname, '/images', '/icon.png')),
  });

  // delay close for 2s
  titlebar.on('before-close', () => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000 * 2);
  }));

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
