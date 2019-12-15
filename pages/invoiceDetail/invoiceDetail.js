// pages/invoiceDetail/invoiceDetail.js发票详情
import {checkEmail} from "../../pkgs/helper/check";
const hints = require('../../pkgs/helper/hint.js');
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
      title1:"未知抬头",
      details:["税号：xxxxxxxxxxxx","开户行：xxxxxxxxxxxxx"]
    },
    icon:{
      arrow:"../../images/index/arrow.png"
    },

    haveImg:false,//是否有发票图片
    invoiceImg:null,//发票图片地址
    paperInvoice:false,//是否纸质发票
    invoice:{
      money:18.88,//发票金额
      address:"xxxxxxxxxxxx",
      expressCode:"xxxxxxxxxxxx",
      email:null,
      time:"2018-08-08"
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
    this.onPullDownRefresh(invoiceId)
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
  onPullDownRefresh: function (invoiceId) {
    var that = this;
    if (!invoiceId){
      var invoiceId = this.data.invoiceId
    }
    var send_data = {
      "sessionId":app.globalData.sessionId,
      "invoiceId":invoiceId
    };
    console.log(send_data);
    wx.request({
      url: urlModel.url.GetInvoiceDetail,
      data: send_data,
      method:"POST",
      success: function(res) {
        console.log(res);
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data);
          var realType = data.type;
          var realInvoice = data.invoice;
          var realTitle = data.title;

          that.setData({
            invoice:data.invoice,
            title:data.title
          });
          // hints.operSuccess("请求成功")
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
          hints.returnError()
        }
      },
      fail : function(res) {
          hints.networkError()
      }
    })
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
      url:"../titleEdit/titleEdit?page_from="+"invoice&" + "detail="
          + JSON.stringify(that.data.title)+"&id="+that.data.invoiceId
    })
  },
  send2mail:function (e) {
    //todo 发送电子发票到邮箱
    var that = this;
    console.log(e.detail.value.receiveEmail);
    var email = e.detail.value.receiveEmail;
    if (!email && !this.data.invoice.email){
      hints.inputError();
      return
    }else if (!email){
      email = this.data.invoice.email;
    }

    if (checkEmail(email)){
      var send_data = {
        "sessionId":app.globalData.sessionId,
        "invoiceId":this.data.invoiceId,
        "email":email
      } ;
      //todo 请求发送邮件，并修改发票对应的邮箱
      console.log(send_data);
      wx.request({
        url: urlModel.url.PostInvoiceEmail,
        data: send_data,
        method:"POST",
        success: function(res) {
          console.log(res);
          if (res.data.code === 0){
            var data = res.data.data;
            console.log(data);
            hints.operSuccess("发送成功")
            that.onPullDownRefresh()
          }else{
            //todo 失败
          }
        }
      })

    }else {
        //todo 邮箱格式有误
      hints.inputError("邮箱格式有误")
    }

  },
  copyExpCode:function (e) {
    //todo 长按复制快递单号
    console.log(e)
  },
  refund:function () {
    //todo 退款
    var that = this;
    var send_data = {
      "sessionId":app.globalData.sessionId,
      "invoiceId":that.data.invoiceId
    };
    console.log(send_data);
    wx.request({
      url: urlModel.url.RefundInvoice,
      data: send_data,
      method:"POST",
      success: function(res) {
        console.log(res);
        if (res.data.code === 0){
          var data = res.data.data;
          console.log(data);
          hints.operSuccess("发票冲红成功")
        }else{
          //todo 失败
          hints.returnError()
        }
      },fail(res) {
        hints.networkError()
      }
    })
  }
});