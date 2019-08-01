  // setTimeout(function() {
      //   siteWelcome.classList.remove("active")
      // }, 500)  国内网速快，可以不要loading动画

      //添加offSet类
      let specialTags = document.querySelectorAll("[data-x]")
      for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add("offSet")
      }
        findClosest()

      function findClosest() {
        let specialTags = document.querySelectorAll("[data-x]")
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
          if (
            Math.abs(specialTags[i].offsetTop-115 - window.scrollY) <
            Math.abs(specialTags[minIndex].offsetTop-115 - window.scrollY)
          ) {
            minIndex = i
          }
        } //这个循环是找到距离scrollY最近的那个元素，也是离视口顶部最近的元素，那我就给它加个class让它动一下
        specialTags[minIndex].classList.remove("offSet")
      }

      window.onscroll = function() {
        if (scrollY > 0) {
          topNavBar.classList.add("sticky")
        } else {
          topNavBar.classList.remove("sticky")
        }
        let specialTags = document.querySelectorAll("[data-x]")
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
          if (
            Math.abs(specialTags[i].offsetTop-100 - window.scrollY) <
            Math.abs(specialTags[minIndex].offsetTop-100 - window.scrollY)
          ) {
            minIndex = i
          }
        } //这个循环是找到距离scrollY最近的那个元素，也是离视口顶部最近的元素，那我就给它加个class让它动一下

        specialTags[minIndex].classList.remove("offSet")

        for (let i = 0; i < specialTags.length; i++) {
          specialTags[i].classList.remove("active") //一开始把所有的红框都消掉
        } //这个循环是把所有的active消掉，在我给距离最小的加active之前
        specialTags[minIndex].classList.add("active") //只在最小的地方加active
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]') //这一步很关键，又能让id是变量，又要保证括号里面填的是字符串
        let li = a.parentNode
        let brotherAndme = li.parentNode.children
        for (let i = 0; i < brotherAndme.length; i++) {
          brotherAndme[i].classList.remove("highLight")
        }
        li.classList.add("highLight")
      }

      let liTags = document.getElementsByClassName("menuTrigger")
      for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function(x) {
          let li = x.currentTarget
          li.classList.add("active")
        }
        liTags[i].onmouseleave = function(x) {
          let li = x.currentTarget
          li.classList.remove("active")
        }
      }
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