//搜索页面，实现收索和分类功能
//作者：唐余鑫、郑雅璐
//创建时间：2019.8.21
//最终更新时间：2019.9.9
let timeId = null;
const app = getApp()
Page({
  data: {
    goods_directory: [],
    search_str: "",
    result: [],
    value: '',
    showResult: false,
    showButton:false,
    curNav: 1,
    curIndex: 0,
    screenId: 0,
    currentTab: 1
  },

  //事件处理函数 
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值 
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index 
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  searchInput(e) {
    this.setData({
      search_str: e.detail.value,
      showButton:true
    })
    console.log(this.data.search_str)
  },

  onLoad() {
    var that = this
    //获取商品分类数据
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_goods_directory', // ip、端口和路由名
      // 在data中以键值对的方式传数据
      data: {},
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          goods_directory: res.data.goods_directory
        })
      }
    })
  },
  
  // 搜索栏回车或者点击确定触发的事件
  confirmSearch: function(e) {
    var that = this
    //获取用户搜索商品结果
    wx.request({
      url: 'http://' + app.globalData.realm_name + ':' + app.globalData.port + '/get_search_result', 
      // ip、端口和路由名（必须唯一，最好用收发什么数据命名）
      // 在data中以键值对的方式传数据
      data: {
        search: JSON.stringify(this.data.search_str),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data); //res.data就是返回的数据
        that.setData({
          result: res.data.result,
          showResult:true
        })
      }
    })
  },

  cancelSearch() {
    this.setData({
      showResult: false,
      value: ''
    })
  },

  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function() {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function() {
      self.setData({
        isScroll: false
      })
    }, 1)

  },

  navbarTap: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,
      //按钮CSS变化      
      screenId: e.currentTarget.dataset.screenid - 1,
      scrollTop: 0,
      //切换导航后，控制右侧滚动视图回到顶部    
    })
  }

})