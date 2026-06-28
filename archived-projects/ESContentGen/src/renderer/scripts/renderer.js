// 这是渲染进程的主要脚本文件

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  console.log('渲染进程已加载');
  
  // 获取按钮元素并添加点击事件
  const startButton = document.getElementById('start-btn');
  if (startButton) {
    startButton.addEventListener('click', () => {
      console.log('按钮被点击');
      // 这里可以添加按钮点击后的逻辑
      // 例如，向主进程发送消息
      if (window.electron) {
        window.electron.send('message-from-renderer', '按钮被点击了！');
      }
    });
  }
  
  // 如果需要，可以监听来自主进程的消息
  if (window.electron) {
    window.electron.receive('message-from-main', (message) => {
      console.log('收到来自主进程的消息:', message);
      // 这里可以处理来自主进程的消息
    });
  }
});

// 这里可以添加其他渲染进程的逻辑
// 例如，表单处理、UI更新等