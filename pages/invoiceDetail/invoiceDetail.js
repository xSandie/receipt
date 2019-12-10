// pages/invoiceDetail/invoiceDetail.js发票详情
const urlModel = require('../../utils/urlSet.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceId:null, //发票详情id
    title:{
      id:null,
      title1:"陕西师范大学",
      details:["税号：2323523464556456X","开户行：招商银行陕西师大路分行",""]
    },
    icon:{
      arrow:"../../images/index/arrow.png"
    },

    haveImg:false,//是否有发票图片
    invoiceImg:null,//发票图片地址
    paperInvoice:false,//是否纸质发票
    invoice:{
      money:15.00,//发票金额
      address:"深圳市龙华区龙华高级中学",
      expressCode:"SF23423413245",
      email:"345592674@qq.com",
      time:"2019-10-08"
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var invoiceId = options.invoiceId;
    var that = this;
    this.setData({
      invoiceId:invoiceId
    });
    //todo 请求发票详情，修改导航栏文字
    var send_data = {
      "sessionId":app.globalData.sessionId,
      "invoiceId":invoiceId
    }
    console.log(send_data)
    wx.request({
      url: urlModel.url.GetInvoiceDetail,
      data: send_data,
      method:"POST",
      success: function(res) {
        console.log(res)
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data);
          var realType = data.type;
          var realInvoice = data.invoice;
          var realTitle = data.title;

          that.setData({
            invoice:data.invoice,
            title:data.title
          })
          // if (realType === "electronic"){
          //     that.setData({
          //       paperInvoice:false
          //     })
          // }else if (realType === "paper"){
          //     that.setData({
          //       paperInvoice:true
          //     })
          // }

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
  changeTitle:function () {
    //todo 修改抬头
    let that = this;
    wx.navigateTo({
      url:"../titleEdit/titleEdit?page_from="+"invoice&" + "detail=" + JSON.stringify(that.data.title)
    })
  },
  send2mail:function (e) {
    //todo 发送电子发票到邮箱
  },
  copyExpCode:function (e) {
    //todo 长按复制快递单号
    console.log(e)
  },
  refund:function () {
    //todo 退款
  }
});