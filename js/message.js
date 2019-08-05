!function() {
  var view = document.querySelector("section.message")
  //model是干嘛的呢，只要跟数据有关的都需要用model
  var model={
    init: function() {
      var APP_ID = "fjlraHVDQ4tHK3Fzksbac1Bo-gzGzoHsz"
      var APP_KEY = "a3RTalL5U6LzNcjedHee9KFL"
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    //获取数据
    fetch:function() {
      var query = new AV.Query("Message")
      return query.find() //Promise对象
    },
    //创建数据
    sava:function() {
      var Message = AV.Object.extend("Message")
      var message = new Message()
      return message.save({ //Promise对象
          'name': name,
          'content': content
      })
    }
  }

  var controller = {
    view: null,
    model:null,
    messageList: null,

    init: function(view,model) {
      this.view = view
      this.model=model
      this.messageList = view.querySelector("#messageList")
      this.form = view.querySelector("form")
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    
    loadMessages: function() {
      this.model.fetch().then(
        (messages) => {
          let array = messages.map(item => item.attributes)
          array.forEach(item => {
            let li = document.createElement("li")
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        })
        .then(
          function() {},
          function(error) {
            console.log(error)
          }
        ) //这里的错误信息是会被吞掉的，可以再then的第二个函数打印出来error信息
    },

    bindEvents: function() {
      this.form.addEventListener("submit", function(e) {
        e.preventDefault()
        this.savaMessage()
      })
    },

    savaMessage: function() {
      let myForm = this.form
      let content = myForm.querySelector("input[name=content]").value //方括号表示属性,这就是用户输入的content
      let name = myForm.querySelector("input[name=name]").value
      this.model.sava(name, content).then(function(object) {
          let li = document.createElement("li")
          li.innerText = `${object.attributes.name}: ${ object.attributes.content}`
          let messageList = document.querySelector("#messageList")
          messageList.appendChild(li)
          content = myForm.querySelector("input[name=content]").value = ""
          console.log(object)
        })
    },

  }
  controller.init(view,model)
}.call()
















//bindEvents除了绑定事件以外，其他事情它不应该做

// //创建TestObject表
// var X = AV.Object.extend('Frank2');
// //在表中创建一行数据
// var o = new X();
// //数据内容是word：‘Hello world！’保存
// //如果把保存成功就运行，console.log()

// o.set('xxxxxx', 'ff world!');
// o.save().then(function (o) {
//   console.log(o)
//   console.log('保存成功。')
// })
