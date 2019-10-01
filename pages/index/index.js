const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:{
      scan:"../../images/index/scan.png",
      history:"../../images/index/history.png",
      add:"../../images/index/add.png",
      arrow:"../../images/index/arrow.png"
    },
    titles:[{
      id:"1",  //根据type判断js添加啥字样
      title:"向书晗",
      detail:"邮箱：345592674@qq.com"  //太长做截取处理
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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

  toTitleDisplay: function (e) {
    var titleId = e.currentTarget.dataset.id
    console.log(e,titleId)
    wx.navigateTo({
      url:"../titleDisplay/titleDisplay"
    })
  },
  addTitle:function () {
    wx.navigateTo({
      url:"../titleEdit/titleEdit"
    })
  }
})