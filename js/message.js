var APP_ID = "fjlraHVDQ4tHK3Fzksbac1Bo-gzGzoHsz"
var APP_KEY = "a3RTalL5U6LzNcjedHee9KFL"

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

var query = new AV.Query('Message');
query.find().then(function (messages) {
  let array =messages.map((item)=>item.attributes)
  array.forEach((item)=>{
    let li = document.createElement('li')
    li.innerText=item.content
    let messageList=document.querySelector('#messageList')
    messageList.appendChild(li)
  })
  },function(error) {
    alert('提交失败，请改天来留言')
  }
)//这里的错误信息是会被吞掉的，可以再then的第二个函数打印出来error信息


let myForm = document.querySelector("#postMessageForm")
myForm.addEventListener("submit", function(e) {
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value //方括号表示属性,这就是用户输入的content
  var Message = AV.Object.extend('Message');
  var message =new Message
  message.save({
    'content':content
  }).then(function (object) {
    window.location.reload() //我们来帮用户刷新
    alert('存入成功')
    console.log(object)
  })
})
 

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
