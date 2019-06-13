'use strict';
//引入regenerator支持async await
import regeneratorRuntime from '/util/utils_moudle/runtime-module';
import util from '/util/options/webutil'
//定义客户端接口地址
const domain = "http://ganbukaohe.com:9000/preciserequest/";
//高德获取逆地理编码位置及高德key
const amapurl = 'https://restapi.amap.com/v3/geocode/regeo?parameters';
const amapkey = ['929c02b918b641621e68d9743f093cfe','447fb6a5d26c251eb6e6e3b2596b225b'];
//const domain = "http://www.ganbukaohe.com:15883/preciserequest/";

const ddRequest = async (url, data = {}, method, loading) => {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  //默认使用POST方式
  method = method || 'POST';
  // Loading可以控制是否显示加载状态
  if (loading != undefined) {
    util.showLoading(loading, 500);
  }
  let res = await new Promise((resolve, reject) => {
    dd.httpRequest({
      url: url,
      method: method,
      data: data,
      header: header,
      dataType: 'json',
      success: (res) => {
        if (res && res.data && res.data.status == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
        util.showToast("fail", "网络出错,请稍后...", 3000);
      },
      complete: () => {
        util.hideLoading();
      }
    });
  }).catch((e) => { 
    return e.data ;
  
  });
  return res;
}
module.exports = {
  ddRequest: ddRequest,
  domain: domain,
  amapurl: amapurl,
  amapkey: amapkey
}

