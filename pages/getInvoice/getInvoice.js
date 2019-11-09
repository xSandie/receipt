// pages/getInvoice/getInvoice.js开发票
Page({

  /**
   * 页面的初始数据
   */
  data: {
      paperFlag:true,//是否纸质发票
    totalMoney:"23.00",
    invoiceMoney:"23.00元",
    title:{
        title: "选择抬头",
      summary:"点此选择、添加或编辑发票抬头",
      id:null
    },
    icon:{
      arrow:"../../images/index/arrow.png"
    },
    hint:{
        paper:"请输入接收发票的地址",
      elect:"请输入接收发票的电子邮箱"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.code){
        //todo 请求开票详细数据

      }
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
  inputMoneyChanged:function (e) {
    console.log(e)
  },
  getInvoice:function (e) {
    console.log(e)
    var that = this
    if (this.data.title.id == null){
      wx.showToast({
        icon:"none",
        title:'请选择发票抬头'
      })
    }
    //todo 开发票，提示请求已提交，然后返回
  },
  chooseTitle:function () {
    //todo 选择抬头
  },
  chooseType:function (e) {
    // 选择纸质发票或者电子发票
    if (e.target.dataset.type == "paper") {
      this.setData({
        paperFlag:true
      })
    }else {
      this.setData({
        paperFlag:false
      })
    }
  }
})