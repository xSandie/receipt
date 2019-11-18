// pages/chooseTitle/chooseTitle.js选择发票抬头
// todo 1.时间降序排列抬头 2.每次显示重新请求抬头 3.下拉刷新
const app = getApp()
const urlModel = require('../../utils/urlSet.js');
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
      id:"zwk",  //根据type判断js添加啥字样
      title:"向书晗陕西师范大学陕西师范大学陕西师范大学陕西师范大学",
      detail:"邮箱：345592674@qq.com"  //太长做截取处理
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //todo 分页请求抬头列表
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
  addTitle:function () {
    wx.navigateTo({
      url:"../titleEdit/titleEdit?from_page=choose"
    })
  },
  toTitleDisplay: function (e) {
    var titleId = e.currentTarget.dataset.id
    console.log(e,titleId)
    wx.navigateTo({
      url:"../titleDisplay/titleDisplay?id="+titleId+"&from_page=choose"
    })
  },
})