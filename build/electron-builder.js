/**
 * electron-builder配置文件
 * 用于配置应用打包相关的设置
 */

const path = require('path');

module.exports = {
  appId: 'com.example.escontentgen',
  productName: 'ESContentGen',
  copyright: 'Copyright © 2023',
  directories: {
    output: 'dist',
    buildResources: 'assets',
  },
  files: [
    'index.js',
    'preload.js',
    'src/**/*',
    'node_modules/**/*',
    'package.json'
  ],
  win: {
    icon: 'assets/icon.ico',
    target: [
      'nsis'
    ]
  },
  mac: {
    icon: 'assets/icon.icns',
    target: [
      'dmg'
    ]
  },
  linux: {
    icon: 'assets/icon.png',
    target: [
      'AppImage',
      'deb'
    ]
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true
  }
};