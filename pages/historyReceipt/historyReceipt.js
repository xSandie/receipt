// pages/historyReceipt/historyReceipt.js历史发票
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceList:[{
      id:"zwk",
      receiptTitle:"陕西师范大学",
      receiptMoney:"11.00",
      buildTime:"2019-10-14",
      status:"已开票",
      type:"纸质",
      content:"一个讨人厌的张文柯"
    },],
    icon:{
      triangle:"../../images/historyReceipt/arrow.png"
    },
    dateArray:[["不限日期","2018年","2019年"],["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]],
    date:"选择日期",
    typeArray:["全部发票","电子发票","纸质发票"],
    receiptType:"全部发票",
  },
  defaultData:{
    date:"选择日期",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //todo 动态加载dateArray
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
  changeType:function (e) {
    // 筛选发票类型
    let that = this
    var value = e.detail.value
    var realValue = that.data.typeArray[value]
    console.log(realValue)
    this.setData({
      receiptType:realValue
    })
    //todo 发起请求
  },
  changeDate:function (e) {
    // 筛选发票月份
    let that = this
    var value = e.detail.value
    console.log(value)
    if (value[0] == 0){ //选择了不限日期
      this.setData({
        date:that.defaultData.date
      })
    } else {
      var newDate = that.data.dateArray[0][value[0]]+that.data.dateArray[1][value[1]]
      this.setData({
        date:newDate
      })
      //todo 发起请求
    }
  },
  toDetail:function (e) {
    console.log(e)
    //todo 查看发票详情
    let receiptId = e.currentTarget.dataset.id
    wx.navigateTo({
      url:"../invoiceDetail/invoiceDetail?invoiceId="+receiptId
    })
  }
})