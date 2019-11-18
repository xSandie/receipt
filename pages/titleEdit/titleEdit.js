// pages/titleEdit/titleEdit.js编辑发票抬头
const app = getApp()
const urlModel = require('../../utils/urlSet.js');
const checker = require('../../pkgs/helper/check.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:{
      title:"单位名称（必填）",
      taxNumb:"纳税人识别号（必填）",
      address:"单位地址（专票必填）",
      companyPhone:"单位电话（专票必填）",
      bank:"开户银行（专票必填）",
      bankAccount:"银行账户（专票必填）",
      email:"邮箱（个人抬头必填）",
      name:"姓名（必填）",
    },
    isCompany:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.page_from){
        var from_page = options.page_from
        if (from_page === "display") {
          //从展示页面过来，携带抬头id
          var titleId = options.id
          //todo 请求发票抬头详细信息填充 判断是否是企业抬头

        }else if(from_page === "invoice"){
          var invoiceId = options.id
          //todo json解码发票抬头详情并填充，type，detail

        }else if (from_page === "choose") {
          // 选择抬头页面过来
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addTitle:function (e) {
    let that = this
    //todo 提交添加抬头请求
    console.log(e)
    if (that.data.isCompany){
      var companyName = e.detail.value["name-com"]
      var companyTaxNumb = e.detail.value["taxNumb-com"]
      var companyEmail = e.detail.value["email-com"]
      if (companyName === ""){
        wx.showToast({
          icon:"none",
          title:'请填写企业名称'
        })
        return
      }
      if (companyTaxNumb === "") {
        wx.showToast({
          icon:"none",
          title:'请填写企业税号'
        })
        return
      }
      if (companyEmail) {
        if (!checker.checkEmail(companyEmail)){
          wx.showToast({
            icon:"none",
            title:'邮箱格式有误'
          })
          return;
        }
      }
      //todo 提交公司抬头
      wx.request({
        url: urlModel.url.InvoiceTitleList,
        data: {
          "sessionId":app.globalData.sessionId,
          "titleId":"",
          "type":"company",
          "title":companyName,
          "taxNumb":companyTaxNumb,
          "bankAccount":e.detail.value["bankAccount-com"] || "",
          "bank":e.detail.value["bank-com"] || "",
          "address":e.detail.value["address-com"] || "",
          "companyPhone":e.detail.value["companyPhone-com"] || "",
          "email":companyEmail || ""
        },
        method:"POST",
        success: function(res) {
          // console.log(res)
          if (res.data.code === 0){
            var data = res.data.data
            console.log(data)
          }else{
            //todo 失败
          }
        }
      })

    }else{
      var name = e.detail.value["name-private"]
      var email = e.detail.value["email-private"]
      if (name === "" || email === "") {
        wx.showToast({
          icon:"none",
          title:'请补全信息'
        })
        return;
      }
      //todo 校验邮箱是否正确
      if(!checker.checkEmail(email)){
        wx.showToast({
          icon:"none",
          title:'邮箱格式有误'
        })
        return;
      }
      // todo 提交个人抬头
      wx.request({
        url: urlModel.url.InvoiceTitleList,
        data: {
          "sessionId":app.globalData.sessionId,
          "titleId":"",
          "type":"person",
          "title":name,
          "email":email
        },
        method:"POST",
        success: function(res) {
          // console.log(res)
          if (res.data.code === 0){
            var data = res.data.data
            console.log(data)
          }else{
            //todo 失败
          }
        }
      })

    }
    // 成功，返回上一页
    wx.navigateBack()

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
  },
  useWxHeader:function () {
    // 选择微信抬头
    let that = this
    wx.chooseInvoiceTitle({
      success(res) {
        console.log(res)
        if (res.type == 1){
          //todo 个人抬头
          that.setData({
            isCompany:false,
            "title.name":res
          })
        } else{
          //todo 企业抬头
          that.setData({
            isCompany:true
          })
        }
      }
    })
  },
  submitEditedTitle:function (e) {
    let that = this
    //todo 提交修改抬头请求
    console.log(e)
    if (that.data.isCompany){
      //todo 提交公司抬头
      var companyName = e.detail.value["name-com"]
      var companyTaxNumb = e.detail.value["taxNumb-com"]
      if (companyName === ""){
        wx.showToast({
          icon:"none",
          title:'请填写企业名称'
        })
        return
      }
      if (companyTaxNumb === "") {
        wx.showToast({
          icon:"none",
          title:'请填写企业税号'
        })
        return
      }

    }
    // 成功，返回上一页
    wx.navigateBack()


  }
})