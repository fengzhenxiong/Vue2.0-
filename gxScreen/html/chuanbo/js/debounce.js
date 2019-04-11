/**
 * Created by zyl on 2019/3/29.
 */
var debounce = function (action,delay) {
  var tId;
  return function () {
    var context = this;
    var arg = arguments;
    if (tId) clearTimeout(tId);
    tId = setTimeout(function () {
      action.apply(context, arg);
    }, delay || 200);
  }
}