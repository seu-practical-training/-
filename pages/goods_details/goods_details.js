//商品详情页面
//作者：郑雅璐、唐余鑫、周威屹
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
  shoucang_list: [],
  data: {
    num: 1,
    number: "",
    user_id: '',
    minusStatus: 'disable',
    list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showPop: false,
    animationData: {},
    show: false,
    backgroundVisible: false,
    animation: animation,
    bg: 'background',
    total: 0,
    shoucang:'../images/shoucang1.png'
  },

  previewImage: function(e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
    })

  },
  gouwuche: function() {
    moveY = 200;
    action = 'hide';
    animationEvents(this, moveY, action);
    this.setData({
      showPop: true
    })
  },
  back: function() {
    wx.redirectTo({
      url: '../firstpage'
    })
  },
  /*点击减号*/
  bindMinus: function() {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
    this.getTotalPrice();
  },
  /*点击加号*/
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
    this.getTotalPrice();
  },
  /*输入框事件*/
  bindManual: function(e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
    this.getTotalPrice();
  },

  getTotalPrice() {
    let total = 0;
    total += this.data.num * this.data.list[0].pricetext;
    this.setData({
      total: total
    })
  },

  addtocar: function() {
    // user_id = app.globalData.user_id
    console.log(this.data.user_id)
    console.log(this.data.number)
    console.log(this.data.num)
    //将商品id和购买数量发送至后端
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_goods_want_buy',
      // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        number: JSON.stringify(this.data.number),
        num: JSON.stringify(this.data.num),
        goods_title: JSON.stringify(this.data.list[0].nametext),
        goods_url: JSON.stringify(this.data.list[0].navimg),
        goods_price: JSON.stringify(this.data.list[0].pricetext),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        wx.switchTab({
          url: '../shoppingcart/shoppingcart',
        })

      }
    })
  },
  search() {
    console.log("nbcs")
    console.log(this.data.shoucang_list.length)
    for(var i=0;i<this.data.shoucang_list.length;i++){
      console.log("nbcs")
      var goods=this.data.shoucang_list[i]
    if(goods.id==this.data.number){
    this.setData({
    shoucang: '../images/shoucang.png'
    });
    break;
    };
  }
},

  onLoad: function(options) {
    var that = this
    that.setData({
      number: options.temp
    })
    console.log(app.globalData.user_id)
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
        that.search()
      }
    })
    //从服务器数据库中获取商品详情信息
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_goods_details',
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
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
          list: res.data.goods_details_list
        })
      }
    })
  },

  // 显示底部弹层
  showModal: function() {
    var _this = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
      showPop: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export()
      })
    }.bind(_this), 50)
  },
  // 隐藏底部弹层
  hideModal: function() {
    var _this = this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export(),
        showPop: false
      })
    }.bind(this), 200)
  },

  //移动按钮点击事件
  showModel: function(e) {
    moveY = 0;
    action = 'show';
    animationEvents(this, moveY, action);
    this.getTotalPrice();
  },

  //隐藏弹窗浮层
  hidden(e) {
    moveY = 200;
    action = 'hide';
    animationEvents(this, moveY, action);
  },

  return: function(e) {
    wx.switchTab({
      url: '../firstpage/firstpage',
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
    console.log(this.data.list)
    //向服务器数据库中增加已下单的订单数据
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_shopping_record_paynow',
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        order_number: JSON.stringify(str1),
        order_time: JSON.stringify(str2),
        totalprice: JSON.stringify(this.data.total),
        num: JSON.stringify(this.data.num),
        order_list: JSON.stringify(this.data.list),
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
          duration: 1000
        })
        wx.redirectTo({
          url: '../historicalorders/historicalorders',
        })
      }
    })
  },

  shoucang() {
    var that = this;
    this.setData({
      shoucang:'../images/shoucang.png'
    });
    //添加该商品进收藏夹
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_shoucang', // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        number: JSON.stringify(that.data.number),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        wx.showToast({
          title: res.data,
          duration: 1000
        })
      }

    })
  }
})

//动画事件 底部的弹出，背景层通过切换不同的class，添加一个transition的效果，使之有一个渐变的感觉。
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