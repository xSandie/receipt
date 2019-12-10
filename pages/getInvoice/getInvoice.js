// pages/getInvoice/getInvoice.js开发票
const app = getApp();
const urlModel = require('../../utils/urlSet.js');
const hints = require('../../pkgs/helper/hint.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",//绑定的订单
      paperFlag:false,//是否纸质发票
    totalMoney:"23.00",
    invoiceMoney:"23.00",
    sendInvoiceMoney:23.00,
    title:{
        title: "选择抬头",
      summary:"点此选择、添加或编辑发票抬头",
      id:null //需要传给后端
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
      var that = this;
      if (options.code){
        let order_code = "9000000011420792020181213170006";//todo 改
        this.setData({
          code:order_code
        });
        //todo 请求开票详细数据
        wx.request({
          url: urlModel.url.GetTranDetail,
          data: {
            "sessionId":app.globalData.sessionId,
            "code":order_code
          },
          method:"POST",
          success: function(res) {
            // console.log(res)
            if (res.data.code === 0){
              var data = res.data.data;
              console.log(data);
              that.setData({
                invoiceMoney:data.invoiceMoney+"元",
                totalMoney:data.totalMoney,
              })
            }else{
              //todo 失败
            }
          }
        })

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
      if (app.globalData.chosenTitle.haveSet){
        //todo 填充字段
        let that = this;
        if (app.globalData.chosenTitle.isCompany){
          this.setData({
            'title.title':app.globalData.chosenTitle.title,
            "title.summary":app.globalData.chosenTitle.taxNumb,
            "title.id":app.globalData.chosenTitle.titleId
          })
        } else {
          this.setData({
            'title.title':app.globalData.chosenTitle.title,
            "title.summary":app.globalData.chosenTitle.mail,
            "title.id":app.globalData.chosenTitle.titleId
          })
        }

      }
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
    // console.log(e);
    var that = this;
    if (this.data.title.id == null){
      wx.showToast({
        icon:"none",
        title:'请选择发票抬头'
      });
      return
    }
    if (that.data.paperFlag && e.detail.value.address === ""){
      wx.showToast({
        icon:"none",
        title:'请补全地址信息'
      });
      return;
    }
    if (!that.data.paperFlag && e.detail.value.email === ""){
      wx.showToast({
        icon:"none",
        title:'请补全邮箱信息'
      });
      return;
    }

    let money = e.detail.value.money;
    if(money === ""){
      money = that.data.invoiceMoney //如果没有修改开票金额，填充默认
    }
    //todo 开发票，提示请求已提交，清空抬头，然后返回
    if (that.data.paperFlag){
      //todo 纸质发票

      let address = e.detail.value.address
      var send_data = {
        "sessionId":app.globalData.sessionId,
        "code":that.data.code,
        "type":0,
        "titleId":that.data.title.id,
        "invoiceMoney":money,
        "sendAddress":address
      }
      console.log(send_data)
      wx.request({
        url: urlModel.url.CreateInvoice,
        data: send_data,
        method:"POST",
        success: function(res) {
          console.log(res)
          if (res.data.code === 0){
            var data = res.data.data;
            // console.log(data);
            hints.operSuccess()
            setTimeout(()=>{
              wx.reLaunch({
                url:"../index/index"
              })
            },1000)
          }else{
            //todo 失败
          }
        }
      })

    }else{
      //todo 电子发票
      let mail = e.detail.value.email
      var send_data={
        "sessionId":app.globalData.sessionId,
        "code":that.data.code,
        "type":1,
        "titleId":that.data.title.id,
        "invoiceMoney":money,
        "sendMail":mail
      }
      console.log(send_data)
      wx.request({
        url: urlModel.url.CreateInvoice,
        data: send_data,
        method:"POST",
        success: function(res) {
          console.log(res)
          if (res.data.code === 0){
            var data = res.data.data;
            // console.log(data);
            hints.operSuccess()
            setTimeout(()=>{
              wx.reLaunch({
                url:"../index/index"
              })
            },1000)
          }else{
            //todo 失败
          }
        }
      })

    }

  },
  chooseTitle:function () {
    // 选择抬头
    wx.navigateTo({
      url:"../chooseTitle/chooseTitle"
    })
  },
  chooseType:function (e) {
    // 选择纸质发票或者电子发票
    if (e.target.dataset.type == "paper") {
      hints.returnError("暂不支持开具纸质发票")
      return
      // this.setData({
      //   paperFlag:true
      // })
    }else {
      this.setData({
        paperFlag:false
      })
    }
  }
});