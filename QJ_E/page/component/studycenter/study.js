'use strict';
import $ from '/util/http/net_util';
import util from '/util/options/webutil'
import md5 from '/util/utils_moudle/md5.js';
let url = $.domain + '/preciserequest/wtnewsclient';
//url = 'https://www.easy-mock.com/mock/5ca599764ba86c23d507bd2c/example/address';
url = "https://cnodejs.org/api/v1/topics";
Page({
  data: {
    time: util.transTime("20190405"),
    array: [], // 服务器数组，数组
    currentpage: 0, // 每次触发下拉事件currentpage=0，上拉事件currentpage+5 默认为0
    pagesize: 20,//分页大小默认为20
    loading: false, // "上拉加载"的变量，默认false，隐藏 
    loaded: false, //“没有数据”的变量，默认false，隐藏 
    floorstatus: false,//控制回到顶部按钮
  },
  onLoad() {
    let that = this;
    util.setTitle();
    that.getUpListData(); 
     that.setData({
      loading: true,  //把"上拉加载"的变量设为false，显示 
      currentpage: that.data.currentpage + 1
    })
  },
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  onPullDownRefresh: function() {
    console.log("下拉刷新")
    let that = this;
    that.setData({
      array: [],
      loading: false,
    });
    that.getLoadingListData()
  },
  onReachBottom() {
    console.log("上拉加载")
    let that = this;
    that.setData({
      loading: true,  //把"上拉加载"的变量设为false，显示 
      currentpage: that.data.currentpage + 1
    })
    // 上拉获取更多数据
    this.getUpListData()
  },
  //联网获取数据
  getLoadingListData() {
    let that = this;
    let data = {
      page: 0,
      limit: that.data.pagesize,
      mdrender: false
      // m: 'main',
      // userid: '18629035674',
      // password: md5.hex_md5('123456'),
      //password: 'e10adc3949ba59abbe56e057f20f883e',
      // currentpage: '',
      // pagesize: '10',
      // modelid:'1'    
    };
    $.ddRequest(url, data, 'GET').then((res) => {
      dd.stopPullDownRefresh();
      if (res != null) {
        for (let i = 0; i < res.data.length; i++) {
          that.data.array.push(res.data[i].title);
        }
        that.setData({
          array: that.data.array
        })
      }
    });
  },
  getUpListData() {
    let that = this;
    let data = {
      page: that.data.currentpage,
      limit: that.data.pagesize,
      mdrender: false
    };
    $.ddRequest(url, data, 'GET').then((res) => {
      if (res != null) {
        for (let i = 0; i < res.data.length; i++) {
          that.data.array.push(res.data[i].title);
        }
        that.setData({
          array: that.data.array,
          loading: true,//把"上拉加载"的变量设为false，显示 
        })
      } else { // 数组为空
        that.setData({
          loading: false,  //把"上拉加载"的变量设为true，隐藏
          loaded: true,  //把"上拉加载完成"的变量设为false，显示
        })
      }
    });
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (dd.pageScrollTo) {
      dd.pageScrollTo({
        scrollTop: 0
      })
    } else {
      dd.showToast({
         type: 'success',
        content: '当前版本过低请升级app！'
      })
    }
  },
})