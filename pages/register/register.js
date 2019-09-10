//注册页面
//作者：郑雅璐、唐余鑫、张皓翔
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    correct: false,
    length: false,
    buttonType: 'default',
    name: "",
    phoneNum: '',
    code: '',
    user_id: 0
  },

// 功能：获取姓名
  inputName: function(e) {
    let name = e.detail.value
    this.setData({
      name: name
    })
    app.globalData.name = name;
  },

// 功能：获取手机号
  inputPhoneNum: function(e) {
    let phoneNum = e.detail.value
    if (phoneNum.length == 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum' + this.data.phoneNum)
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },

// 功能：检查手机号是否符合规范
  checkPhoneNum: function(phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号码不正确'
      })
      return false
    }
  },

// 功能：输入密码
  inputPassword: function(e) {
    let password = e.detail.value
    this.setData({
      password: password
    })
    if (password.length >= 8) {
      console.log('password:' + this.data.password)
      this.setData({
        length: true
      })
    }
  },

// 功能：检查密码
  checkPassword: function(e) {
    let reInput = e.detail.value
    this.setData({
      reInput: reInput
    })
    if (reInput == this.data.password && this.data.length) {
      this.setData({
        correct: true
      })
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        correct: false
      })
      this.setData({
        disabled: true
      })
    }

  },

  showSendMsg: function() {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function() {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },

  sendMsg: function() {
    wx.request({
      url: `${config.api + '/msg'}`,
      data: {
        phoneNum: this.data.phoneNum
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'Post',
      success: function(res) {
        console.log(res)
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },

  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.them((setTimer) => {
      clearInterval(setTimer)
    })
  },

  addCode: function(e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('code' + this.data.code)
  },

  activeButton: function() {
    let {
      phoneNum,
      code,
      otherInfo
    } = this.data
    console.log(code)
    if (phoneNum && code) {
      this.setData({
        disabled: false,
        buttonType: 'default'
      })
    }
  },

  navigate() {
    var that = this;
    if (this.data.phoneNum == "") {
      wx.showToast({
        title: '手机号码不正确'
      })
    } else {
      //发送用户姓名手机号密码注册
      wx.request({
        url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_and_set_phone_and_name_and_password',
        // ip、端口和路由名
        // 在data中以键值对的方式传数据
        data: {
          name: JSON.stringify(this.data.name),
          phoneNum: JSON.stringify(this.data.phoneNum),
          password: JSON.stringify(this.data.password)
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        success: function(res) {
          console.log(res.data); //  返回用户ID

          that.setData({
            user_id: res.data
          })
          wx.navigateTo({
            url: '/pages/collect/collect?temp=' + that.data.user_id
          })
          // console.log(this.data.id); //  返回用户ID
          wx.showToast({
            title: String(res.data),
            icon: 'success',
            duration: 1000
          })
        }
      })
    }
  }

})