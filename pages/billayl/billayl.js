//功能：用户消费分类分析饼状图
//作者：赵艺明、唐余鑫
//创建时间：2019.8.21
//最终更新时间：2019.9.9
import wxCharts from '../../utils/wxcharts-min.js'
var app = getApp();
var pieChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inde: 3,
    count: [{
      name: "2019年6月",
      tot: 0,
      max: " ",
      cost: [5400, 4300, 4320, 2800, 3400, 2800, 4500, 2310]
    },
    {
      name: "2019年7月",
      tot: 0,
      max: " ",
      cost: [5700, 5320, 4500, 5498, 4782, 1821, 6700, 5600]
    },
    {
      name: "2019年8月",
      tot: 0,
      max: " ",
      cost: [5400, 4320, 5367, 1253, 4382, 3862, 6790, 5409],
    }, {
      name: "2019年9月",
      tot: 0,
      max: " ",
      cost: [4500, 5240, 2437, 6400, 4530, 6309, 5400, 3400]
    },
    ]
  },
  onLoad: function(e) {
    //获取用户分类消费数据信息
    //作者：唐余鑫
    var that = this;
    // 向数据库请求消费分类分析
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/send_and_set_kind_buy_analysis',
      // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        name: JSON.stringify(app.globalData.user_id)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data);

        if (res.data == 'no data!') {
          wx.showToast({
            title: String(res.data),
            icon: 'success',
            duration: 1000
          })
        } else {
          that.data.count[3].cost = res.data;
          console.log(that.data.count);
          that.counttotal();
          that.makecharts();
        }

      }
    })

  },
  //上个月消费
  //作者：赵艺明
  lastmonth: function(e) {
    let inde_n = this.data.inde - 1;
    if (inde_n >= 0) {
      var windowWidth = '';
      try {
        var res = wx.getSystemInfoSync(),
          windowWidth = res.windowWidth / 750 * 690;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
          name: '食品',
          color: '#ff7f7f',
          data: this.data.count[inde_n].cost[0],
        }, {
          name: '女装',
          color: '#ff7fbf',
          data: this.data.count[inde_n].cost[1],
        }, {
          name: '美妆',
          color: '#ff7fff',
          data: this.data.count[inde_n].cost[2],
        }, {
          name: '运动',
          color: '#bf7fff',
          data: this.data.count[inde_n].cost[3],
        }, {
          name: '电器',
          color: '#7fffff',
          data: this.data.count[inde_n].cost[4],
        }, {
          name: '男装',
          color: '#7f7fff',
          data: this.data.count[inde_n].cost[5],
        }, {
          name: '数码',
          color: '#7fbfff',
          data: this.data.count[inde_n].cost[6],
        }, {
          name: '洗护',
          color: '#7fffbf',
          data: this.data.count[inde_n].cost[7],
        }, {
          name: '中秋',
          color: '#FFD700',
          data: this.data.count[inde_n].cost[8],
        }, {
          name: '生鲜',
          color: '#FF0000',
          data: this.data.count[inde_n].cost[9],
        }],
        width: windowWidth,
        height: 300,
        dataLabel: true,
      });
      this.setData({
        inde: inde_n,
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '后面没有啦',
        text: 'center',
      })
    }
  },
  //下一个月消费分析
  //作者：赵艺明
  nextmonth: function(e) {
    let inde_n = this.data.inde + 1;
    if (inde_n <= 3) {
      var windowWidth = '';
      try {
        var res = wx.getSystemInfoSync(),
          windowWidth = res.windowWidth / 750 * 690;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      pieChart = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas',
        type: 'pie',
        series: [{
          name: '食品',
          color: '#ff7f7f',
          data: this.data.count[inde_n].cost[0],
        }, {
          name: '女装',
          color: '#ff7fbf',
          data: this.data.count[inde_n].cost[1],
        }, {
          name: '美妆',
          color: '#ff7fff',
          data: this.data.count[inde_n].cost[2],
        }, {
          name: '运动',
          color: '#bf7fff',
          data: this.data.count[inde_n].cost[3],
        }, {
          name: '电器',
          color: '#7fffff',
          data: this.data.count[inde_n].cost[4],
        }, {
          name: '男装',
          color: '#7f7fff',
          data: this.data.count[inde_n].cost[5],
        }, {
          name: '数码',
          color: '#7fbfff',
          data: this.data.count[inde_n].cost[6],
        }, {
          name: '洗护',
          color: '#7fffbf',
          data: this.data.count[inde_n].cost[7],
        }, {
          name: '中秋',
          color: '#FFD700',
          data: this.data.count[inde_n].cost[8],
        }, {
          name: '生鲜',
          color: '#FF0000',
          data: this.data.count[inde_n].cost[9],
        }],
        width: windowWidth,
        height: 300,
        dataLabel: true,
      });
      this.setData({
        inde: inde_n,
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '前面没有啦',
        text: 'center',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  touchHandler: function(e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
//分析最高消费项目
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
      for (var t = 0; t < 8; t++) {
        tota += this.data.count[i].cost[t];
        if (this.data.count[i].cost[t] > max) {
          maxindex = t;
          max = this.data.count[i].cost[t]
        }
      };
      count_n[i].tot = tota;
      if (maxindex == 0) {
        count_n[i].max = "食品"
      }
      if (maxindex == 1) {
        count_n[i].max = "女装"
      }
      if (maxindex == 2) {
        count_n[i].max = "美妆"
      }
      if (maxindex == 3) {
        count_n[i].max = "运动"
      }
      if (maxindex == 4) {
        count_n[i].max = "电器"
      }
      if (maxindex == 5) {
        count_n[i].max = "男装"
      }
      if (maxindex == 6) {
        count_n[i].max = "数码"
      }
      if (maxindex == 7) {
        count_n[i].max = "洗护"
      }
      if (maxindex == 8) {
        count_n[i].max = "中秋"
      }
      if (maxindex == 9) {
        count_n[i].max = "生鲜"
      }
    }
    this.setData({
      count: count_n
    })
  },
  //页面初始作图加载
  //作者：赵艺明
  makecharts() {
    var windowWidth = '';
    try {
      var res = wx.getSystemInfoSync(),
        windowWidth = res.windowWidth / 750 * 690;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '食品',
        color: '#ff7f7f',
        data: this.data.count[this.data.inde].cost[0],
      }, {
        name: '女装',
        color: '#ff7fbf',
        data: this.data.count[this.data.inde].cost[1],
      }, {
        name: '美妆',
        color: '#ff7fff',
        data: this.data.count[this.data.inde].cost[2],
      }, {
        name: '运动',
        color: '#bf7fff',
        data: this.data.count[this.data.inde].cost[3],
      }, {
        name: '电器',
        color: '#7fffff',
        data: this.data.count[this.data.inde].cost[4],
      }, {
        name: '男装',
        color: '#7f7fff',
        data: this.data.count[this.data.inde].cost[5],
      }, {
        name: '数码',
        color: '#7fbfff',
        data: this.data.count[this.data.inde].cost[6],
      }, {
        name: '洗护',
        color: '#7fffbf',
        data: this.data.count[this.data.inde].cost[7],
      }, {
        name: '中秋',
        color: '#FFD700',
        data: this.data.count[this.data.inde].cost[8],
      }, {
        name: '生鲜',
          color: '#FF0000',
        data: this.data.count[this.data.inde].cost[9],
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    })
  },
})