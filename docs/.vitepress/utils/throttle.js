// 创建一个节流函数
export default function (func, delay) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      func.apply(this, arguments);
      canRun = true;
    }, delay);
  };
}
