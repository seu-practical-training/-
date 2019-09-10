//猜你喜欢页面
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
var animation = wx.createAnimation({})
var i = 1;
var t = 7; 
Page({
  data: {
    proList: [],
    giftNo: 1,
    donghua: true,
    donghua1: true,
    left1: Math.floor(Math.random() * 305 + 1),
    left2: Math.floor(Math.random() * 305 + 1),
    left3: Math.floor(Math.random() * 305 + 1),
    left4: Math.floor(Math.random() * 305 + 1),
    left5: Math.floor(Math.random() * 305 + 1),
    left6: Math.floor(Math.random() * 305 + 1),
    left7: Math.floor(Math.random() * 305 + 1),
    left8: Math.floor(Math.random() * 305 + 1),
    left9: Math.floor(Math.random() * 305 + 1),
    left10: Math.floor(Math.random() * 305 + 1),
    left11: Math.floor(Math.random() * 305 + 1),
    left12: Math.floor(Math.random() * 305 + 1),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //从服务器数据库中获取推荐商品数据
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_recommend_goods',
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
        console.log(res.data)
        that.setData({
          proList: res.data.goods_list
        })
        console.log(that.data.proList)
      }
    })
  },
  //点击喜欢后的动画效果
//作者：赵艺明
  donghua: function () {
    var that = this;
    setTimeout(function () {
      animation.opacity(0.3).translateY(604).step({
        duration: 1000
      })
      that.setData({
        ["animationData" + i]: animation.export()
      })
      i++;
    }.bind(that), 100)
    if (i < 7) {
      setTimeout(function () {
        that.donghua()
      }.bind(that), 100)
    } else {
      i = 1;
      animation.opacity(0.3).translateY(-604).step({
        duration: 5
      })
      setTimeout(function () {
        for (var y = 0; y < 7; y++) {
          that.setData({
            ["animationData" + y]: animation.export()
          })
          that.setData({
            ["animationData" + y + '.actions[0].animates[0].args[0]']: 0
          })
        }
      }.bind(that), 1000)
    }
  },
//点击不喜欢的动画效果
//作者：赵艺明
  donghua1: function () {
    var that = this;
    setTimeout(function () {
      animation.opacity(0.3).translateY(604).step({
        duration: 1000
      })
      that.setData({
        ["animationData" + t]: animation.export()
      })
      t++;
    }.bind(that), 100)
    if (t < 13) {
      setTimeout(function () {
        that.donghua1()
      }.bind(that), 100)
    } else {
      t = 7;
      animation.opacity(0.3).translateY(-604).step({
        duration: 5
      })
      setTimeout(function () {
        for (var y = 7; y < 13; y++) {
          that.setData({
            ["animationData" + y]: animation.export()
          })
          that.setData({
            ["animationData" + y + '.actions[0].animates[0].args[0]']: 0
          })
        }
      }.bind(that), 1000)
    }
  },
  //滑动获取选中商品
  //作者：唐余鑫
  getSelectItem: function(e) {
    var that = this;
    var itemWidth = e.detail.scrollWidth/that.data.proList.length; 
    var scrollLeft = e.detail.scrollLeft; //滚动宽度
    var curIndex = Math.round(scrollLeft / itemWidth); //通过Math.round方法对滚动大于一半的位置进行进位
    for (var i = 0, len = that.data.proList.length; i < len; ++i) {
      that.data.proList[i].selected = false;
    }
    that.data.proList[curIndex].selected = true;
    that.setData({
      proList: that.data.proList,
      giftNo: this.data.proList[curIndex].proID
    });
  },
//喜欢bindtap
  likeit() {
    this.donghua()
    console.log(this.data.giftNo)
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/increase_interest', // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        goods_id: JSON.stringify(this.data.giftNo)
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
  },
//不喜欢bindtap
  hateit() { 
    this.donghua1()
    console.log(this.data.giftNo)
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/decrease_interest', // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        goods_id: JSON.stringify(this.data.giftNo)
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
  } 
})