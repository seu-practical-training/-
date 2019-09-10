//首页功能实现，包括搜索框，首页广告，相似推荐，热销排行榜等事件的触发
//作者：郑雅璐、赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    fashion_list: [
      { src:"https://tva1.sinaimg.cn/large/006y8mN6ly1g6omntec42j30ku0auq4a.jpg", url:"../clothes_ad/clothes_ad"} ,
      { src:"https://tva1.sinaimg.cn/large/006y8mN6ly1g6omo4aojqj30ku0autb3.jpg",url:"../autumn/autumn"},
      { src:"https://tva1.sinaimg.cn/large/006y8mN6ly1g6omod5n72j30ku0au40y.jpg",url:"../food/food"} 
    ],
    recommend_list: [],
    page_id: 1,
    shop_traverse: 0,
    list: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  // 功能：从服务器数据库中获取商品数据
  onLoad: function() {
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_goods',
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
      success: function(res) {
        console.log("recommend", res.data); //res.data就是返回的数据
        that.setData({
          recommend_list: res.data.goods_list
        })
        // 从recommend_list中取6个显示出来
        that.setData({
          list: that.data.recommend_list.slice(that.data.shop_traverse, that.data.shop_traverse + 5),
          shop_traverse: that.data.shop_traverse + 5
        })
        console.log("onload", that.data.list)
      }
    })
  },

  // 功能：触底加载
  onReachBottom: function() {
    this.setData({
      list: this.data.list.concat(this.data.recommend_list.slice(this.data.shop_traverse, this.data.shop_traverse + 5)),
      shop_traverse: this.data.shop_traverse + 5
    })
  },

  // 功能：返回顶部
  // 作者：赵艺明
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  }

})