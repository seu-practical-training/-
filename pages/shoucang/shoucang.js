//收藏页面
//作者：唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    shoucang_list: [],
    thumb: '',
    nickname: '',
    hasAddress: false,
    address: {},
    goods_id:''
  },
  onShow: function (options) {
    //从服务器数据库中获取用户收藏得商品数据
    console.log(app.globalData.user_id)
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_shoucang', // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          shoucang_list: res.data.shoucang_list
        })
      }
    })
  },

  cancelshoucang(e){
    this.setData({
      goods_id: e.target.dataset.index
    })
    console.log(this.data.goods_id)
    console.log(app.globalData.user_id)
    var that = this
    //用户取消收藏该商品
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/cancel_shoucang', // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        goods_id:JSON.stringify(this.data.goods_id)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data); //res.data就是返回的数据
        that.onShow()
      }
    })
  }
})