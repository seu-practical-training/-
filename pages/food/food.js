// 首页顶部的生鲜广告页面
//作者：郑雅璐、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    goodsWelfareItems:[],
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_food_goods',
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        userID: app.globalData.user_id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          goodsWelfareItems: res.data.food_list
        })
      }
    })
  },
})