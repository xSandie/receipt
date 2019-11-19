// pages/titleDisplay/titleDisplay.js
const urlModel = require('../../utils/urlSet.js');
let app = getApp();
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
      email:"345592674@qq.com" // 为空则无字段
    },
    showChooseBtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 判断是否展示选择按钮
    if (options.from_page){
      if (options.from_page === "choose") {
        //从选择页面过来
        this.setData({
          showChooseBtn:true
        });
        app.globalData.chosenTitle.haveSet = false
      }else {
        this.setData({
          showChooseBtn:false
        })
      }
    }
    //todo 请求发票抬头详细信息
    let titleId = options.id;
    this.setData({
      titleId
    });
    wx.request({
      url: urlModel.url.InvoiceTitleDetail,
      data: {
        "sessionId":app.globalData.sessionId,
        "titleId":titleId
      },
      method:"POST",
      success: function(res) {
        console.log(res);
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data)
        }else{
          //todo 失败
        }
      }
    })
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
    let that = this;
    wx.navigateTo({
      url:"../titleEdit/titleEdit?page_from="+"display&" + "id=" + that.data.titleId
    })
  },
  deleteSelf:function () {
    wx.showModal({
      content:"确定删除此发票抬头？",
      success(res) {
        if (res.confirm){
          //todo 删除此条抬头
          wx.request({
            url: urlModel.url.DeleteInvoiceTitle,
            data: {
              "sessionId":app.globalData.sessionId,
              "titleId":that.data.titleId
            },
            method:"POST",
            success: function(res) {
              // console.log(res)
              if (res.data.code === 0){
                var data = res.data.data;
                console.log(data);
              }else{
                //todo 失败
              }
            }
          })
        }
      }
    })
  },
  chooseTitle:function () {
    //todo 选择抬头，设置全局抬头id
    let that = this;
    Object.keys(that.data.title).forEach((key)=>{
      let data = that.data.title[key];
      app.globalData.chosenTitle[key] = data;
    });
    app.globalData.chosenTitle.titleId = that.data.titleId;
    app.globalData.chosenTitle.haveSet = true;
    app.globalData.chosenTitle.isCompany = that.data.isCompany;
    wx.navigateBack()
  }
});