import $ from '/util/http/net_util';
import util from '/util/options/webutil'

function getLocation(type){

    dd.getLocation({
      type: type || 0,
      success(res) {
         getAdress(res.longitude,res.latitude);
      },
      fail() {
        dd.alert({ title: '定位失败' });
      },
    })

}
function getAdress(longitude, latitude){


}