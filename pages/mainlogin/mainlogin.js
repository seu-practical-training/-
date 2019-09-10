// 登陆，注册，扫脸登陆总页面
//作者：郑雅璐、唐余鑫、张皓翔，赵艺明
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    phoneNum: '',
    password: '',
    result: "",
    user_id: '',
    user_info: []
  },

  // 功能：设置手机号
  phoneInput: function(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  
  // 功能：设置密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 功能：登陆
  login: function() {
    var that = this
    console.log(app.globalData.realm_name)
    console.log(app.globalData.port)
    console.log(this.data.phoneNum)
    console.log(this.data.password)
    //向服务端发送登陆信息，返回识别后结果
    wx.request({
      // ip、端口和路由名
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_and_check_phone_and_password',
      // 在data中以键值对的方式传数据
      data: {
        phoneNum: JSON.stringify(this.data.phoneNum),
        password: JSON.stringify(this.data.password)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        //返回登陆的用户id以及是否登陆成功
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          user_info: res.data.user_info_list,
          user_id: res.data.user_info_list[0].user_id,

        })
        //将user_id赋值给全局变量
        var app = getApp()
        app.globalData.user_id = that.data.user_id
        app.globalData.phoneNumber = res.data.user_info_list[0].phone_number
        console.log(app.globalData.user_id)
        console.log(app.globalData.phoneNumber)
        console.log(that.data.user_info)
        if (that.data.user_info[0].result == "success") {
          wx.showToast({
            title: "登陆成功",
            icon: 'success',
            duration: 1000
          })
          wx.switchTab({
            url: '../firstpage/firstpage',
          })
        } else if (that.data.user_info[0].result == "number not exit!")
        {
          wx.showToast({
            title: '手机号或密码错误！',
            icon: 'loading',
            duration: 2000
          })
        } else if (that.data.user_info[0].result == "wrong password") {
          wx.showToast({
            title: '手机号或密码错误！',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },

  // 功能：扫脸登陆
  scanninglogin: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },

// 功能：注册
  register: function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
})