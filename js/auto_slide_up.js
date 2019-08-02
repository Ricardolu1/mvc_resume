!function() {
  //添加offSet类
  let specialTags = document.querySelectorAll("[data-x]")
  for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add("offSet")
  }
  window.addEventListener('scroll',function() {
    findClosestAndRemoveOffset()
  })
  
  function findClosestAndRemoveOffset() {
    let specialTags = document.querySelectorAll("[data-x]")
    let minIndex = 0
    for (let i = 1; i < specialTags.length; i++) {
      if (
        Math.abs(specialTags[i].offsetTop - 115 - window.scrollY) <
        Math.abs(specialTags[minIndex].offsetTop - 115 - window.scrollY)
      ) {
        minIndex = i
      }
    } //这个循环是找到距离scrollY最近的那个元素，也是离视口顶部最近的元素，那我就给它加个class让它动一下
    specialTags[minIndex].classList.remove("offSet")
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
}()
