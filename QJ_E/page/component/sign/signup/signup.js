import $ from '/util/http/net_util';
import util from '/util/options/webutil'
Page({
  data: {
    scale: 15,
    longitude: '',
    latitude: '',
    adress: '',
    currenttime: '',
    week: '',
    time: '',
    controls: [{
      id: 5,
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50,
      },
      clickable: true,
    }]
  },
  onLoad() {
    this.getLocation(0);
    util.setTitle();
  },
  onShow() {
    setInterval(() => {
      this.getTime();
    }, 500);
  },
  getTime() {
    //let time = util.formatTime("","YYYY-MM-DD hh:mm:ss");
    let time = util.getTime();
    this.setData({
      time: time.time,
      week: time.week,
      currenttime: time.currenttime
    });
  },
  getLocation(type) {
    let that = this;
    dd.getLocation({
      type: type || 0,
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
        that.getAdress(res.longitude, res.latitude);
      },
      fail() {
        util.showToast('fail', '定位失败！请稍后重试', "1000")
      },
    })

  },
  getAdress(a, b) {
    let that = this;
    //随机获取一个Key来使用
    const key = $.amapkey[Math.floor((Math.random() * $.amapkey.length))];
    let location = a + ',' + b;
    let data = {
      key,
      location
    };
    $.ddRequest($.amapurl, data, 'POST').then((res) => {
      if (res.status == 1) {
        that.setData({
          adress: res.regeocode.formatted_address
        })
      } else {
        util.showToast('fail', res.info, "1000")
      }
    })

  },
});
