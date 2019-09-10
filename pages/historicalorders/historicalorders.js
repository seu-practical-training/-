//历史订单页面，查看全部订单信息
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    orders_list:[],
    thumb: '',
    nickname: '',
    hasAddress: false,
    address: {},
  },
//页面加载
//作者：唐余鑫
  onShow: function(options) {
    //从服务器数据库中获取商品数据
    console.log(app.globalData.user_id)
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_order', // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          orders_list: res.data.orders
        })
      }
    })
  },

  payOrders: function() {
    var that = this
    wx.navigateTo({
      url: '../orderdetails/orderdetails?temp=' + that.data.orders_list[0].number
    })
  }
})