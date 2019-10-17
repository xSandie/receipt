// pages/titleDisplay/titleDisplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCompany:true,  //判断是不是公司抬头
    titleId:"发票抬头id",
    title:{
      title:"陕西师范大学（名称）",
      taxNumb:"税号x1231244343423",
      address:"单位地址陕西省西安市长安区吧啦吧啦吧啦",
      companyPhone:"电话号码",
      bank:"开户银行",
      bankAccount:"银行账户11111",
      email:"邮箱345592674@qq.com"
    },
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

  toEdit:function () {
    let that = this
    wx.navigateTo({
      url:"../titleEdit/titleEdit?page_from="+"display&" + "id=" + that.data.titleId
    })
  },
  deleteSelf:function () {
    wx.showModal({
      content:"确定删除此发票抬头？",
      success(res) {
        if (res.confirm){
          //删除此条抬头
        }
      }
    })
  }
})