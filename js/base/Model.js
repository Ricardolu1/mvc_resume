//var model=Model({resourceName:'Message'})上面是这个文件的调用方法，下面是这个文件的写法
/*
var model =Model({
  resourceName:'表名'
})

*/
window.Model=function(options) {
  let resourceName =options.resourceName
  return {
    init:function() {
      var APP_ID = "fjlraHVDQ4tHK3Fzksbac1Bo-gzGzoHsz"
      var APP_KEY = "a3RTalL5U6LzNcjedHee9KFL"
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch:function() {
      var query = new AV.Query(resourceName)
      return query.find() //Promise对象
    },//这里有闭包这个函数，用到了函数之外的变量
    save:function(object) {
      var X = AV.Object.extend(resourceName)
      var x= new X()
      return x.save(object)//Promise对象
    }
  }
}