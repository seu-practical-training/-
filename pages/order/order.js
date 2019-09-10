//购物车跳转的下单页面
//作者：赵艺明、唐余鑫，郑雅璐
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
var action = '';
var moveY = 200;
var animation = animation = wx.createAnimation({
  transformOrigin: "50% 50%",
  duration: 400,
  timingFunction: "ease",
  delay: 0
})
animation.translateY(moveY + 'vh').step();
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: [],
    selected_id: [],
    str: '',
    show: false,
    backgroundVisible: false,
    animation: animation,
    bg: 'background',
    phone:''
  },

  onLoad(options) {
    var that = this
    that.setData({
      total: options.temp,
      selected_id: options.temp1.split(","),
      phone: app.globalData.phoneNumber
    })
    console.log(that.data.total)
    console.log(that.data.selected_id)
    console.log(typeof(that.data.selected_id))
  },

//数据导入
//作者：唐余鑫
  onShow: function() {
    var that = this
    //从服务器数据库中获取购物车数据
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_shoppingcar_goods_pay',
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        selected_goods_id: JSON.stringify(this.data.selected_id),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          // hasList: true,
          orders: res.data.shopping_goods_list
        })

      }
    })

    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })

  },

  // 计算总价
  //作者：赵艺明
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  //移动按钮点击事件
  showModel: function(e) {
    moveY = 0;
    action = 'show';
    animationEvents(this, moveY, action);
  },

  //隐藏弹窗浮层
  //作者：郑雅璐
  hidden(e) {
    moveY = 200;
    action = 'hide';
    animationEvents(this, moveY, action);
  },
//返回到数据库
//作者：唐余鑫
  return: function(e) {
    var myDate = new Date();
    var str1 = (myDate.getFullYear()).toString() + (myDate.getMonth() + 10).toString() + (myDate.getDate() + 10).toString() + (myDate.getHours() + 10).toString() + (myDate.getMinutes() + 10).toString() + (myDate.getSeconds() + 10).toString();
    parseInt(Math.random() * (99 - 10 + 1) + 10, 10);
    str1 += (Math.floor(Math.random() * (99 - 10 + 1) + 10)).toString();
    str1 += app.globalData.user_id

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var str2 = Y + M + D

    //向服务器数据库中增加未付款的订单数据
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_shopping_record_unpay',
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        order_number: JSON.stringify(str1),
        order_time: JSON.stringify(str2),
        totalprice: JSON.stringify(this.data.total),
        order_list: JSON.stringify(this.data.orders),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
      }
    })

    wx.redirectTo({
      url: '../ordersUnpay/ordersUnpay',
    })

  },

  paynow: function(e) {
    var myDate = new Date();
    var str1 = (myDate.getFullYear()).toString() + (myDate.getMonth() + 10).toString() + (myDate.getDate() + 10).toString() + (myDate.getHours() + 10).toString() + (myDate.getMinutes() + 10).toString() + (myDate.getSeconds() + 10).toString();
    parseInt(Math.random() * (99 - 10 + 1) + 10, 10);
    str1 += (Math.floor(Math.random() * (99 - 10 + 1) + 10)).toString();
    str1 += app.globalData.user_id

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var str2 = Y + M + D

    console.log(this.data.orders)
    //向服务器数据库中增加已下单的订单数据
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_shopping_record',
      // ip、端口和路由名）
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        order_number: JSON.stringify(str1),
        order_time: JSON.stringify(str2),
        totalprice: JSON.stringify(this.data.total),
        order_list: JSON.stringify(this.data.orders),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据

        wx.showToast({
          title: "付款成功",
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: '../historicalorders/historicalorders',
        })

      }
    })
  }
})

//动画事件 底部的弹出，背景层通过切换不同的class，添加一个transition的效果，使之有一个渐变的感觉。
//作者：郑雅璐
function animationEvents(that, moveY, action) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  if (action == 'show') {
    that.setData({
      animation: that.animation.export(),
      show: true,
      backgroundVisible: true,
      bg: 'bg',
      disableScroll: 'disableScroll'
    });
  } else if (action == 'hide') {
    that.setData({
      animation: that.animation.export(),
      show: false,
      backgroundVisible: false,
      bg: 'background',
      disableScroll: ''
    });
  }
}