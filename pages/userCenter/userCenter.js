//用户个人主页，可实现跳转到订单信息，地址管理等功能的页面
//作者：周威屹、唐余鑫，赵艺明
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../images/ad1.jpg',
      '../images/ad2.png',
      '../images/ad3.png'
    ]
  },

  //事件处理函数
  bindShezhi: function() {
    wx.reLaunch({
      url: '../openshow/openshow',
    })
  },

  change: function()
  {
    wx.navigateTo({
      url: '../change_info_collect/change_info_collect',
    })
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  address: function() {
    wx.navigateTo({
      url: '../addressList/addressList'
    });
  },

  toOrder: function() {
    wx.navigateTo({
      url: '../historicalorders/historicalorders',
    })
  },

  bill: function() {
    wx.navigateTo({
      url: '../bill/bill',
    })
  },

  toOrdersUnpay() {
    wx.navigateTo({
      url: '../ordersUnpay/ordersUnpay',
    })
  },

  billayl() {
    wx.navigateTo({
      url: '../billayl/billayl',
    })
  },

  star(){
    wx.navigateTo({
      url: '../shoucang/shoucang',
    })
  }

})