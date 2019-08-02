!function() {
  //这个函数决定了多长时间动一次，根据电脑性能动态决定帧率，好电脑一秒60次，坏电脑一秒20次
  function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
  }
  
  requestAnimationFrame(animate)
  
  let aTags = document.querySelectorAll("nav.menu > ul > li > a")
  for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function(x) {
      x.preventDefault()
      let a = x.currentTarget
      let href = a.getAttribute("href") //得到的是#siteAbout
      let element = document.querySelector(href) //这个api已收藏
      let top = element.offsetTop //这个offset属性还挺重要的，在mdn上没有找到
  
      let currentTop = window.scrollY
      let targetTop = top - 80
      let distance = targetTop - currentTop
      var coords = { y: currentTop } //初始位置
      var t = Math.abs((distance / 100) * 300) //距离可以是负数，时间不能是负数，这里有bug 这里决定动画多长时间走完
      if (t > 500) {
        t = 500 //时间不能超过500毫秒
      }
      var tween = new TWEEN.Tween(coords)
        .to({ y: targetTop }, t) //结束位置，时间 距离是100的几倍我就用多少个0.3秒。这样长距离移动看上去就没有那么快了，不要所有的距离都是一秒移动完。时间和距离是相关的，看上去更好
        .easing(TWEEN.Easing.Quadratic.InOut) //选择动画类型
        .onUpdate(() => {
          console.log(coords.y)
          window.scrollTo(0, coords.y) //每次变化的时候需要执行的代码 通过这个更新页面
        })
        .start() //开始缓动
    }
  }
  
  //下面的代码是引入了一个库，tween来实现动画效果
}()
