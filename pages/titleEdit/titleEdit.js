// pages/titleEdit/titleEdit.js编辑发票抬头
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:{
      title:"陕西师范大学（名称）",
      taxNumb:"税号x1231244343423",
      address:"单位地址陕西省西安市长安区吧啦吧啦吧啦",
      companyPhone:"电话号码",
      bank:"开户银行",
      bankAccount:"银行账户11111",
      email:"邮箱345592674@qq.com"
    },
    isCompany:true
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
  addTitle:function (e) {
    console.log(e)

  },
  chooseType:function (e) {
    var tabId = e.target.dataset.id
    console.log(e, tabId)
    if (tabId === "private"){
      this.setData({
        isCompany:false
      })
    } else if (tabId === "company"){
      this.setData({
        isCompany:true
      })
    }
  }
})