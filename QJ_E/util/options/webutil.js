var md5 = require('md5.js');
//获取当前时间戳
function getTimeStamp() {
  return new Date().getTime();
}
//通过当前时间转换成时间戳
function transTimeToStamp(x) {
  return new Date(x).getTime();
}
/**
 * 时间戳或时间 格式化
 * 两个参数：
 * 第一个参数：可选，时间或时间戳，默认为当前时间。第二个参数：可选，转换的格式，默认为YYYY-MM-DD hh:mm:ss。
 * 不补0：YYYY-M-D h:m:s 2018-1-1 0:0:0
 * 加入星期：YYYY-MM-DD www hh:mm:ss 2018-01-01 星期一 00:00:00
 * 加入周：YYYY-MM-DD ww hh:mm:ss 2018-01-01 周一 00:00:00
 */
function formatTime(date, fmt) {
  date = date || new Date();
  date = ((date instanceof Date) || (typeof date) == 'number') ? new Date(date) : new Date();
  fmt = fmt || 'YYYY-MM-DD hh:mm:ss';
  var obj = {
    'Y': date.getFullYear(),
    'M': date.getMonth() + 1,
    'D': date.getDate(),
    'w': date.getDay(),
    'h': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
  }, week = ['日', '一', '二', '三', '四', '五', '六'];
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function(e) {
      var itemStr = obj[i] + '';
      if (i == 'w') return (e.length > 2 ? '星期' : '周') + week[itemStr];
      for (var j = 0, len = itemStr.length; j < e.length - len; j++) itemStr = '0' + itemStr;
      return itemStr;
    });
  }
  return fmt;
}
/**
 * 时间戳转换为时分秒
 * 两个参数：
 * 第一个参数：可选，秒数，默认为0。第二个参数：可选，转换的格式，默认为hh: mm: ss。
 * 不补0 h: m: s 0:0:0
 * 加入天：DD天hh: mm: ss 06天06:06:06
 */
function formatTimestamp(date, fmt) {
  date = date / 1000 || 0;
  fmt = fmt || 'hh:mm:ss';
  var obj;
  function setObj(h, m) {
    obj = {
      'D': parseInt(date / 60 / 60 / 24),
      'h': h == 1 ? parseInt(date / 60 / 60) % 24 : parseInt(date / 60 / 60),
      'm': m == 1 ? parseInt(date / 60) % 60 : parseInt(date / 60),
      's': parseInt(date) % 60,
    }
  }
  fmt.indexOf('h') == -1 ? setObj(0, 0) : (fmt.indexOf('D') == -1 ? setObj(0, 1) : setObj(1, 1));
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function(e) {
      var itemStr = obj[i] + '';
      for (var j = 0, len = itemStr.length; j < e.length - len; j++) itemStr = '0' + itemStr;
      return itemStr;
    });
  }
  return fmt;
}
/**
* 日期格式化
 * @param value 格式
 * @returns {*}
 */
function transTime(value) {
  if (value.length == 14) {
    return value.substring(8, 10) + ":" + value.substring(10, 12) + ":" + value.substring(12, 14);
  } else if (value.length == 8) {
    return value.substring(0, 4) + "年" + value.substring(4, 6) + "月" + value.substring(6, 8) + "日";
  } else if (value.length == 6) {
    return value.substring(0, 4) + "/" + value.substring(4, 6);
  } else {
    return value;
  }
}
//去处空格
function trimString(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}
//alert提示
function showAlert(title, content, buttonText) {
  dd.alert({
    title: title || "温馨提示",
    content: content || "似乎出了点问题",
    buttonText: buttonText || "我知道了",
  })
}
//confirm确认 
function showConfirm(title, content, confirmButtonText, cancelButtonText) {
  dd.confirm({
    title: title || '温馨提示',
    content: content || '请确认？',
    confirmButtonText: confirmButtonText || '确定',
    cancelButtonText: cancelButtonText || '取消',
    success: (result) => {
      return result.confirm;
    },
  })
}
//toast提示
function showToast(type, content, duration) {
  dd.showToast({
    type: type || 'none',//toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none
    content: content || '操作成功',
    duration: duration || 3000,
  })
}
//loading状态
function showLoading(content, delay) {
  dd.showLoading({
    content: content || '加载中...',
    delay: delay || 1000,
  })
}
//设置title
function setTitle(title, backgroundColor) {
  dd.setNavigationBar({
    title: title || '放心衢江',
    backgroundColor: backgroundColor || '#108ee9',
  })
}
function hideLoading() {
  dd.hideLoading()
}
function getTime() {
  var mon, day, now, hour, min, ampm, time, str, tz, end, beg, sec;
  var data = {};
  /*
  mon = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
          "Sep", "Oct", "Nov", "Dec");
          */
  mon = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月",
    "九月", "十月", "十一月", "十二月");
  /*
  day = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
  */
  day = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  now = new Date();
  hour = now.getHours();
  min = now.getMinutes();
  sec = now.getSeconds();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  data.time = hour + ":" + min + ":" + sec;
  data.currenttime = now.getFullYear() + "年" + mon[now.getMonth()] + now.getDate() + "日" + " " + hour + ":" + min + ":" + sec;
  data.week = day[now.getDay()];

  return data;
  // $("#time").html(hour + ":" + min + ":" + sec);
  // $("#current-time").html("<nobr>" + day[now.getDay()] + ", " + mon[now.getMonth()] + " "
  //   + now.getDate() + ", " + now.getFullYear() + " " + hour
  //   + ":" + min + ":" + sec + "</nobr>");
  // $("#current-time").html(now.getFullYear() + "年" + mon[now.getMonth()] + now.getDate() + "日" + " " + hour + ":" + min + ":" + sec);
  // $("#week").html(day[now.getDay()]);
}
module.exports = {
  formatTime: formatTime,
  formatTimestamp: formatTimestamp,
  trimString: trimString,
  showAlert: showAlert,
  showConfirm: showConfirm,
  showToast: showToast,
  showLoading: showLoading,
  setTitle: setTitle,
  hideLoading: hideLoading,
  transTime: transTime,
  getTimeStamp: getTimeStamp,
  transTimeToStamp: transTimeToStamp,
  getTime: getTime
}
