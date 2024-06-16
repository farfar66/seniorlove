document.addEventListener('DOMContentLoaded', function() {
  const slidingImage = document.getElementById('slidingImage');
  const staticImage = document.querySelector('.static-image');
  const scrollContainer = document.querySelector('.scroll-container');
  const containerRect = scrollContainer.getBoundingClientRect();
  const containerTop = containerRect.top + window.scrollY;
  const containerBottom = containerRect.bottom + window.scrollY;
  const containerHeight = containerBottom - containerTop; // 容器的实际高度
  
  // 计算静态图片位置
  const staticImageRect = staticImage.getBoundingClientRect();
  const staticImageTop = staticImageRect.top + window.scrollY;
  const staticImageBottom = staticImageRect.bottom + window.scrollY;
  
  // 监听页面滚动事件，实时更新图片位置和透明度
  window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY - containerTop;
      const newRight = (scrollPosition / containerHeight) * scrollContainer.clientWidth;
      const newLeft = staticImageRect.left - containerRect.left;
      
      // 计算滑动图片和静态图片的重合位置
      const overlapThreshold = 3; // 重合阈值，根据实际情况调整
      
      // 检查滑动方向
      if (scrollY > containerTop) {
          // 向下滚动：向左滑动
          slidingImage.style.transform = `translateX(-${newRight}px)`;
      } else {
          // 向上滚动：向右滑动
          slidingImage.style.transform = `translateX(${newLeft}px)`;
      }
      
      // 计算滑动图片和静态图片的重合程度，并控制透明度
      if (scrollY >= staticImageTop && scrollY <= staticImageBottom) {
          // 在静态图片范围内，计算重合程度
          const distance = Math.abs(scrollY - staticImageTop);
          const opacity = 1 - distance / (staticImageBottom - staticImageTop);
          slidingImage.style.opacity = opacity.toFixed(2); // 保留两位小数
      } else {
          // 显示滑动效果
          slidingImage.style.opacity = 1;
      }
  });
});


