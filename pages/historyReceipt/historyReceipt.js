// pages/historyReceipt/historyReceipt.js历史发票
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceList:[{
      receiptTitle:"陕西师范大学",
      receiptMoney:"11.00",
      buildTime:"2019-10-14",
      status:"已开票",
      type:"纸质"
    },],
    receiptType:"全部发票",
    icon:{
      triangle:""
    }
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
  changeType:function () {
    //todo 筛选发票类型
  },
  changeDate:function () {
    //todo 筛选发票日期
  }
})