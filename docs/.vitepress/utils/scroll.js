// 监听鼠标滚轮事件
export default function (height, e) {
  if (e.deltaY > 0) {
    // 鼠标向下滚动
    scrollDown(height);
  } else if (e.deltaY < 0) {
    // 鼠标向上滚动
    scrollUp(height);
  }
}

// 滚动到指定距离
function scrollToDistance(distance) {
  window.scrollTo({ top: distance, behavior: "smooth" });
}

// 向上滚动
function scrollUp(height) {
  if (!height.value) return;
  height.value -= 500;
  console.log(height.value, "向上");

  scrollToDistance(height.value);
}

// 向下滚动
function scrollDown(height) {
  height.value += 500;
  console.log(height.value, "向下");

  scrollToDistance(height.value);
}
