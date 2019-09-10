//购物车功能的实现
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    obj: {
      name: "hello"
    }
  },

  onShow() {
    var that = this
    // console.log(this.data.user_id)
    //从服务器数据库中获取购物车数据
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_shoppingcar_goods',
       // ip、端口和路由名
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
          hasList: true,
          carts: res.data.shopping_goods_list,
          selectAllStatus: false, // 全选状态，默认全不选
          totalPrice: 0
        })
      }
    })
    this.getTotalPrice();
  },
  // 当前商品选中事件
  //作者：赵艺明
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  //删除购物车当前商品
  //作者：唐余鑫
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/delete_shoppingcar_goods', 
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        goods_id: JSON.stringify(carts[index].goods_id)
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
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  // 购物车全选事件
  //作者：赵艺明
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  // 绑定加数量事件
  //作者：赵艺明
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/add_shoppingcar_goods_count', 
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        goods_id: JSON.stringify(carts[index].goods_id),
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

    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  // 绑定减数量事件
  //作者：赵艺明
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;

    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/sub_shoppingcar_goods_count', 
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        goods_id: JSON.stringify(carts[index].goods_id),
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

    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  // 计算总价
  //作者：赵艺明
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].num * carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
//下单
//作者：唐余鑫
  toOrder() {
    let carts = this.data.carts;
    let total = 0;
    var selected_id = [];
    var j = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].num * carts[i].price; // 所有价格加起来
        selected_id[j] = carts[i].goods_id;
        j++;
      }
    }
    console.log(selected_id)
    wx.navigateTo({
      url: '../order/order?temp=' + total + '&temp1=' + selected_id,
    })
  }

})