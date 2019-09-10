// 开屏动画页面
//作者：赵艺明
//创建时间：2019.8.21
//最终更新时间：2019.9.9
Page({
  data: {
  },
  //动画加载
  onLoad(){
    var animation1 = wx.createAnimation({
      duration: 30000,
      timingFunction: 'ease',
      delay: 500
    });
    var animation2 = wx.createAnimation({
      duration: 24000,
      timingFunction: 'ease',
      delay: 500
    });
    animation1.opacity(0.2).translate(100, -100).step()
    animation2.opacity(0.2).translate(0, -100).step()
    this.setData({
      ani1: animation1.export(),
      ani2: animation2.export()
    })
  },
  //点击后进入主界面
  click(e){
   wx.redirectTo({
     url: '../mainlogin/mainlogin',
   })
  }

})