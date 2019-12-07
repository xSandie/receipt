// pages/historyReceipt/historyReceipt.js历史发票
const app = getApp();
const urlModel = require('../../utils/urlSet.js');
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
    date:"选择日期"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //todo 动态加载dateArray
    let that = this;
    wx.request({
      url: urlModel.url.HistoryInvoicePeriod,
      data: {
        "sessionId":app.globalData.sessionId,
      },
      method:"POST",
      success: function(res) {
        // console.log(res)
        if (res.data.code === 0){
          var data = res.data.data;
          // console.log(data);
          var tmpArray = ["不限日期"];
          data.years.forEach(((value, index) => {
            tmpArray.push(value+"年")
          }));
          that.setData({
            "dateArray[0]":tmpArray
          })
        }else{
          //todo 失败
        }
      }
    });
    wx.request({
      url: urlModel.url.HistoryInvoiceList,
      data: {
        "sessionId":app.globalData.sessionId,
        "year":'',
        "month":"",
        "type":""
      },
      method:"POST",
      success: function(res) {
        // console.log(res)
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data);
          that.setData({
            invoiceList:data.invoiceList
          })
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
    this.onLoad()
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
    let that = this;
    var value = e.detail.value;
    var realValue = that.data.typeArray[value];
    console.log(realValue);
    this.setData({
      receiptType:realValue
    });
    var queryValue = that.convertType(realValue);
    console.log(queryValue);
    //todo 发起请求
    wx.request({
      url: urlModel.url.HistoryInvoiceList,
      data: {
        "sessionId":app.globalData.sessionId,
        "year":'',
        "month":"",
        "type":queryValue
      },
      method:"POST",
      success: function(res) {
        // console.log(res)
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data);
          that.setData({
            invoiceList:data.invoiceList
          })
        }else{
          //todo 失败
        }
      }
    })

  },
  changeDate:function (e) {
    // 筛选发票月份
    let that = this;
    var value = e.detail.value;
    console.log(value);
    if (value[0] == 0){ //选择了不限日期
      this.setData({
        date:that.defaultData.date
      })
    } else {
      var newDate = that.data.dateArray[0][value[0]]+that.data.dateArray[1][value[1]];
      this.setData({
        date:newDate
      })
      //todo 发起请求
    }
    var queryValue = that.convertType(that.data.receiptType);
    var queryYear = that.convertYear(that.data.dateArray[0][value[0]]);
    if (queryYear !== ""){
      var queryMonth = that.convertMonth(that.data.dateArray[1][value[1]]);
    } else {
      queryMonth = ""
    }
    console.log(queryYear, queryMonth);
    wx.request({
      url: urlModel.url.HistoryInvoiceList,
      data: {
        "sessionId":app.globalData.sessionId,
        "year":queryYear,
        "month":queryMonth,
        "type":queryValue
      },
      method:"POST",
      success: function(res) {
        // console.log(res)
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data);
          that.setData({
            invoiceList:data.invoiceList
          })
        }else{
          //todo 失败
        }
      }
    })

  },
  toDetail:function (e) {
    console.log(e);
    //todo 查看发票详情
    let receiptId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:"../invoiceDetail/invoiceDetail?invoiceId="+receiptId
    })
  },
  convertType:function (value) {
    //转换发票类型
    var queryValue = "";
    if (value === "全部发票"){

    } else if (value === "电子发票"){
      queryValue = "electronic"
    }else if (value === "纸质发票"){
      queryValue = "paper"
    }
    return queryValue
  },
  convertMonth:function (value) {
    //转换月份
    return value.slice(0,-1)
  },
  convertYear:function (value) {
    //转换年份
    var queryValue = "";
    if (value === "不限日期"){
      //未筛选年月
    } else {
      queryValue = value.slice(0,-1)
    }
    return queryValue
  }
});