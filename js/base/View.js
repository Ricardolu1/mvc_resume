/*
var view =View('.xxx')
 */
window.View=function(selector) {
  return this.document.querySelector(selector)
}