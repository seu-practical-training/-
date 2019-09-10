//商品销量排行前十名页面
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    fashion_list: [
    ],
    page_id: 1,
    shop_traverse: 0,
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad: function () {
    //从服务器数据库中获取销量排行前十的商品数据
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_fashion_goods',
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {},
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log("fashion", res.data); //res.data就是返回的数据
        that.setData({
          fashion_list: res.data.goods_list
        })
      }
    })
  }
})