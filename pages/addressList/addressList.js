//功能：显示用户地址信息表
//作者：郑雅璐、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    //获取用户地址信息
    //作者：唐余鑫
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_address', 
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          addressList: res.data.address_list
        })
      }
    })  
    
  },

  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },
  
  //删除用户地址信息
  //作者：唐余鑫
  delAddress: function (e) {
    const index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/delete_address', 
      // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {
        user_id: JSON.stringify(app.globalData.user_id),
        consignee: JSON.stringify(this.data.addressList[index].consignee)
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

    addressList.splice(index, 1);
    this.setData({
      addressList: addressList
    })

    
  }
})