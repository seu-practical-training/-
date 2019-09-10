//功能：用户账单分析折线图界面
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
import wxCharts from '../../utils/wxcharts-min.js'
const app = getApp();
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inde:3,
    currentTab: 0,
    count:[],
  },
//页面图标点击显示
//作者：赵艺明
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //获取用户账单信息
    //作者：唐余鑫
    console.log(app.globalData.user_id)
    var that = this
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_bill_list', // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
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
          count: res.data.bill_list
        })
      }
    })
   
  },
  //计算月消费平均值，判断消费最高月份
  //作者：赵艺明
  counttotal() {
    let count_n = [];
    for (let i = 0; i < this.data.inde + 1; i++) {
      count_n.push(this.data.count[i])
    }
    for (var i = 0; i < this.data.inde + 1; i++) {
      var tota = 0;
      var max = 0;
      var maxindex = 0;
      for (var t = 0; t < 6; t++) {
        tota += this.data.count[i].cost[t];
        if (this.data.count[i].cost[t] > max) {
          maxindex = t;
          max = 6*this.data.count[i].cost[t]
        }
      };
      count_n[i].ave = Math.round(tota/6);
        if(i%2==1){
          count_n[i].max=7+maxindex
        }else{
          count_n[i].max=1+maxindex
        };}
    this.setData({
      count: count_n
    })
  },
  //看上一半年的消费
  //作者：赵艺明
  lasthalfyear: function (e){
    let inde_n=this.data.inde-1;
    if(inde_n>=0){
    var windowWidth = '', windowHeight = '';
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    let lineChart = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'line',
      categories: this.data.count[inde_n].time,
      animation: true,  //是否开启动画
      series: [{   //具体坐标数据
        name: '月累计消费',  //名字
        data: this.data.count[inde_n].cost,  //数据点
        format: function (val, name) {  //点击显示的数据注释
          return val + '￥';
        }
      }
      ],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '人民币',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 500,   //最小值
        max: 10*this.data.count[inde_n].ave,   //最大值
        gridColor: '#D8D8D8',
      },

      width: windowWidth,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve'  //曲线
      },
      
    });
    this.setData({                               
      inde:inde_n,
    });
    }else{
      wx.showModal({
        title: '提示',
        content: '后面没有啦',
        text: 'center',
      })
    }
  },
  //下一半年点击事件
  //作者：赵艺明
  nexthalfyear: function (e) {
    let inde_n = this.data.inde + 1;
    if(inde_n<=3){
    var windowWidth = '', windowHeight = '';
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    let lineChart = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'line',
      categories: this.data.count[inde_n].time,
      animation: true,  //是否开启动画
      series: [{   //具体坐标数据
        name: '月累计消费',  //名字
        data: this.data.count[inde_n].cost,  //数据点
        format: function (val, name) {  //点击显示的数据注释
          return val + '￥';
        }
      }, 
      ],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '人民币',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 500,   //最小值
        max: 6*this.data.count[inde_n].ave,   //最大值
        gridColor: '#D8D8D8',
      },

      width: windowWidth,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve'  //曲线
      },
    });
    this.setData({
      inde: inde_n,
    });
    }else{
      wx.showModal({
        title: '提示',
        content: '前面没有啦',
        text: 'center',
      })
    }
  },
  alreadyonload(){
    this.counttotal();
    this.makecharts();
  },
  onReady: function () {
  },
  //做图函数
makecharts(){
  let inde_n = this.data.inde;
  var windowWidth = '', windowHeight = '';
  try {
    var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
    windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
    windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
  } catch (e) {
    console.error('getSystemInfoSync failed!');   //如果获取失败
  }
  lineChart = new wxCharts({     //定义一个wxCharts图表实例
    canvasId: 'lineCanvas',     //输入wxml中canvas的id
    type: 'line',
    categories: this.data.count[inde_n].time,
    animation: true,  //是否开启动画
    series: [{   //具体坐标数据
      name: '月累计消费',  //名字
      data: this.data.count[inde_n].cost,  //数据点
      format: function (val, name) {  //点击显示的数据注释
        return val + '￥';
      }
    }, 
    ],
    xAxis: {   //是否隐藏x轴分割线
      disableGrid: true,
    },
    yAxis: {      //y轴数据
      title: '人民币',  //标题
      format: function (val) {  //返回数值
        return val.toFixed(2);
      },
      min: 500,   //最小值
      max: 2*this.data.count[inde_n].ave,   //最大值
      gridColor: '#D8D8D8',
    },
    width: windowWidth,  //图表展示内容宽度
    height: windowHeight,  //图表展示内容高度
    dataLabel: false,  //是否在图表上直接显示数据
    dataPointShape: true, //是否在图标上显示数据点标志
    extra: {
      lineStyle: 'curve'  //曲线
    },
  });
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})