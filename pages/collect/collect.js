//功能：用户注册时收集人脸信息
//作者：唐余鑫、张皓翔
//创建时间：2019.8.21
//最终更新时间：2019.9.9
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: '',
    src: '', 
    token: "24.2289840d3c758d6e288b2079ebd8593c.2592000.1568941024.282335-17051910",//access_token
    base64: '',
    msg: "",
    timer_number: 0,
    over_timer_number: 0
  },

  onLoad: function(options) {
    var that = this;
    this.setData({
      nickName: options.temp
    })
    console.log(this.data.nickName)
    var temp_timer_number = setInterval(this.takePhoto, 1000);
    this.setData({
      timer_number: temp_timer_number
    })
    console.log('timer: ' + this.data.timer_number)
    var temp_over_timer_number = setTimeout(function() {
      console.log('clear timer' + that.data.timer_number);
      clearInterval(that.data.timer_number);
      wx.navigateTo({
        url: '../mainlogin/mainlogin',
      })
      wx.showToast({
        title: '识别超时！',
        icon: 'loading',
        duration: 500
      })
    }, 5000);
    this.setData({
      over_timer_number: temp_over_timer_number
    })

  },

  //功能：拍照
  takePhoto() {
    console.log("拍照！！！");
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath //获取图片
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            })
          }
        })
      } //拍照成功结束
    }) //调用相机结束

    //上传人脸进行注册-----test
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + this.data.token,
      method: 'POST',
      data: {
        image: encodeURI(this.data.base64),
        image_type: 'BASE64',
        group_id: 'item', //自己建的用户组id
        user_id: this.data.nickName //这里获取用户昵称
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          msg: res.data.error_msg
        })
        console.log(that.data.msg)
        //做成功判断
        if (that.data.msg == 'SUCCESS') { //微信js字符串请使用单引号
          wx.redirectTo({
            url: '../mainlogin/mainlogin'
          })
          wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            }),
            clearInterval(that.data.timer_number);
          console.log('clear over timer' + that.data.over_timer_number);

          clearTimeout(that.data.over_timer_number);

        } else if (that.data.msg == 'face is already exist') {
          wx.redirectTo({
            url: '../mainlogin/mainlogin'
          })
          wx.showToast({
            title: '该人脸信息已存在，请直接登录!',
            icon: "loading",
            duration: 500,
          })
          clearInterval(that.data.timer_number);
          console.log('clear over timer' + that.data.over_timer_number);

          clearTimeout(that.data.over_timer_number);
        } else {
          wx.showToast({
            title: '正在识别，请勿移动手机！',
            icon: "loading",
            duration: 500,
          })
        }

      }
    })

  },
  error(e) {
    console.log(e.detail)
  },

  onHide: function() {
    console.log('clear timer' + this.data.timer_number);
    clearInterval(this.data.timer_number);
  }

})