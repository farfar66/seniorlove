document.addEventListener('DOMContentLoaded', function() {
  const elevator = document.querySelector('.elevator');
  const textItems = document.querySelectorAll('.text-item');
  let activeIndex = 0;
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;
    
    // 更新电梯位置
    if (Math.abs(scrollDelta) > 50) { // 仅当滚动超过一定阈值时更新
      elevator.style.top = elevator.offsetTop + scrollDelta * 0.5 + 'px';
    }
    lastScrollTop = scrollTop;
    
    // 更新文本框状态
    if (scrollTop > (activeIndex * (window.innerHeight / textItems.length))) {
      activeIndex++;
      textItems.forEach((item, index) => {
        if (index === activeIndex - 1) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
});