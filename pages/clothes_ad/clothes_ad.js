//功能：首页衣服商品广告页面
//作者：郑雅璐、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    indicatorDots: true, //设置是否显示面板指示点
    autoplay: true, //设置是否自动切换
    interval: 3000, //设置自动切换时间间隔,3s
    duration: 1000, //  设置滑动动画时长1s
    imgUrls: [
      "https://tva1.sinaimg.cn/large/006y8mN6ly1g6omm1wemsj31ej0u0jwe.jpg",
      "https://tva1.sinaimg.cn/large/006y8mN6ly1g6ommi2u9ij31ee0u048n.jpg",
      "https://tva1.sinaimg.cn/large/006y8mN6ly1g6ommsxahlj31g70ozgr1.jpg"
    ],
    // 实时热销榜
    goodsHotItems:[],
    // 福利专场
    goodsWelfareItems:[]

  },

  // 生命周期函数--监听页面加载，从服务器数据库中获取衣服商品数据
  // 作者：唐余鑫
  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_clothes_goods',
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
          goodsHotItems: res.data.clothes_list
        })        
      }
    })
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_clothes_goods1',
      // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
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
          goodsWelfareItems: res.data.clothes_list
        })

      }
    })
  }
})