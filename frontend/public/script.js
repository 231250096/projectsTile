function move(id, position, color) {
    // 创建一个 gsap 时间线
    var tl = gsap.timeline();
    
    // 移动背景泡泡，使其向上移动并隐藏
    tl.to("#bgBubble", { duration: 0.15, bottom: "-30px", ease: "ease-out" }, 0)
    
    // 隐藏其他泡泡
    .to("#bubble1, #bubble2, #bubble3, #bubble4", { duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out" }, 0)
    
    // 隐藏图标
    .to(".icon", { duration: 0.05, opacity: 0, ease: "ease-out" }, 0)
    
    // 移动背景泡泡到目标位置
    .to("#bgBubble", { duration: 0.2, left: position, ease: "ease-in-out" }, 0.1)
    
    // 恢复背景泡泡的位置
    .to("#bgBubble", { duration: 0.15, bottom: "-50px", ease: "ease-out" }, '-=0.2')
    
    // 显示特定的泡泡
    .to(`#bubble${id}`, { duration: 0.15, y: "0%", opacity: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', ease: "ease-out" }, '-=0.1')
    
    // 调整泡泡的样式
    .to(`#bubble${id} > span`, { duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out" }, '-=0.1')
    
    // 更改导航栏背景颜色
    .to("#navbarContainer", { duration: 0.3, backgroundColor: color, ease: "ease-in-out" }, 0)
    
    // 更改背景颜色
    .to("#bg", { duration: 0.3, backgroundColor: color, ease: "ease-in-out" }, 0)
    
    // 更改背景泡泡颜色
    .to("#bgBubble", { duration: 0.3, backgroundColor: color, ease: "ease-in-out" }, 0);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'http://127.0.0.1:7001/api/AllUsers'; // 修改为实际的 API URL
    const url = new URL(window.location.href);
    const email = url.searchParams.get('email');

    // 请求用户数据
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            const container = document.getElementById('userButtonsContainer');

            // 为每个用户创建一个按钮
            users.forEach(user => {
                const button = document.createElement('button');
                button.innerText = `查看或评论“${user.email}”的项目看板`;
                button.onclick = () => {
                    window.location.href = `http://localhost:5173?id=${user.id}&email=${email}`;
                };
                container.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});

