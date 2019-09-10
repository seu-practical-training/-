// 未付款订单具体信息页面
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    number: "",
    list: [],
    "address": "  ",
  },

  onLoad: function(options) {
    var that = this
    that.setData({
      number: options.temp
    })

    //从服务器数据库中获取未付款订单详情信息
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_order_details', // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        number: JSON.stringify(that.data.number),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          list: res.data.orders
        })
        console.log(that.data.list)
      }
    })
  },

  payOrders() {
    //对未付款商品进行付款
    console.log(this.data.number)
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/pay_order_details', // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        number: JSON.stringify(this.data.number),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data); //res.data就是返回的数据
        wx.switchTab({
          url: '../firstpage/firstpage',
        })
      }
    })
  },

  deleteOrders() {
    //对未付款商品删除订单信息
    console.log(this.data.number)
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/delete_order_details', // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        number: JSON.stringify(this.data.number),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data); //res.data就是返回的数据
      }
    })
    wx.switchTab({
      url: '../firstpage/firstpage',
    })
  }

})