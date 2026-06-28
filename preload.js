// 预加载脚本中的所有Node.js API都可以使用
// 它在网页加载之前运行，并且有权访问两个环境的API

// 在window对象上暴露一些API给渲染进程使用
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

// 如果需要，你可以在这里添加更多的预加载逻辑
// 例如，暴露一些Node.js功能给渲染进程
// contextBridge.exposeInMainWorld('electronAPI', {
//   someFunction: () => {}
// });