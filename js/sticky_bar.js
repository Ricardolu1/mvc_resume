!function() {
  var view =document.querySelector('#topNavBar')
  var controller={
    view:null,
    init:function(view) {
      this.view=view
      this.bindEvents()
    },
    bindEvents:function() {
      var view=this.view
      window.addEventListener('scroll',function() {
        if (scrollY > 0) {
          topNavBar.classList.add("sticky")
        } else {
          topNavBar.classList.remove("sticky")
        }
      })
      //箭头函数没有this
    },
  }
  controller.init(view)
}.call()