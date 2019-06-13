let app = getApp();

//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
import $ from '/util/http/net_util';
import util from '/util/options/webutil'
let url = $.domain + 'dingtalkinfo';
Page({
  data: {
    corpId: '',
    authCode: '',
    userId: '',
    userName: '',
    hideList: false,
    time: ''
  },
  loginSystem() {  
    util.showLoading('正在鉴权...');
    dd.getAuthCode({
      success: (res) => {
        console.log(res);
        this.setData({
          authCode: res.authCode
        })
       let data = {
          method: 'userinfo',
          corpid: app.globalData.corpId,
          code: res.authCode,
        };
        $.ddRequest(url, data, 'POST').then((res) => {
          console.log(res);
          if (res != null && res.errorcode == 0) {
            this.setData({
              userId: res.operid,
              userName: res.opername,
              hideList: false
            })
          } else {
            util.showToast('fail', res.errordesc, "1000")
          }
        })
      },
      fail: (err) => {
        util.showToast('fail', '鉴权失败', "1000")
      }
    })
  },
  getTime(){
    let time = util.formatTime("","YYYY-MM-DD hh:mm:ss");
    this.setData({
              time: time     
            });
  },
  onLoad() {
    let _this = this;
    util.setTitle();
  }
})