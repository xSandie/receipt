// pages/titleEdit/titleEdit.js编辑发票抬头
const app = getApp();
const urlModel = require('../../utils/urlSet.js');
const checker = require('../../pkgs/helper/check.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:{
      id:"",
      title:"单位名称（必填）",
      taxNumb:"纳税人识别号（必填）",
      address:"单位地址（专票必填）",
      companyPhone:"单位电话（专票必填）",
      bank:"开户银行（专票必填）",
      bankAccount:"银行账户（专票必填）",
      email:"邮箱（个人抬头必填）",
      name:"姓名（必填）",
    },
    isCompany:true,
    adding:true,//判断是在编辑 还是在添加
  },
  defaultData:{
    wxTitle:{
      title: "单位名称（必填）",
      taxNumb: "纳税人识别号（必填）",
      address: "单位地址（专票必填）",
      companyPhone: "单位电话（专票必填）",
      bank: "开户银行（专票必填）",
      bankAccount: "银行账户（专票必填）",
      email: "邮箱（个人抬头必填）",
      name: "姓名（必填）",
    },
    title:{//用来判断表单是否填写过
      title:"单位名称（必填）",
      taxNumb:"纳税人识别号（必填）",
      address:"单位地址（专票必填）",
      companyPhone:"单位电话（专票必填）",
      bank:"开户银行（专票必填）",
      bankAccount:"银行账户（专票必填）",
      email:"邮箱（个人抬头必填）",
      name:"姓名（必填）",
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      if (options.page_from){
        var from_page = options.page_from;
        if (from_page === "display") {
          //从展示页面过来，携带抬头id
          var titleId = options.id;
          //禁止使用微信抬头，以免造成混乱
          this.setData({
            adding:false
          })
          //todo 请求发票抬头详细信息填充 判断是否是企业抬头

        }else if(from_page === "invoice"){
          //从发票详情过来
          var invoiceId = options.id;
          //禁止使用微信抬头，以免造成混乱
          this.setData({
            adding:false
          })
          //todo json解码发票抬头详情并填充，type，detail

        }
      } else{
        //添加页面过来
        this.setData({
          adding:true
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
    let that = this;
    //todo 提交添加抬头请求
    console.log(e);

    if (that.defaultData.wxTitle.title !== that.defaultData.title.title){
      //todo 使用微信抬头填充e.detail.value
      that.fill2fullTitleWithWx(e.detail.value)
    }

    if (that.data.isCompany){
      var companyName = e.detail.value["name-com"];
      var companyTaxNumb = e.detail.value["taxNumb-com"];
      var companyEmail = e.detail.value["email-com"];
      if (companyName === ""){
        wx.showToast({
          icon:"none",
          title:'请填写企业名称'
        });
        return
      }
      if (companyTaxNumb === "") {
        wx.showToast({
          icon:"none",
          title:'请填写企业税号'
        });
        return
      }
      if (companyEmail) {
        if (!checker.checkEmail(companyEmail)){
          wx.showToast({
            icon:"none",
            title:'邮箱格式有误'
          });
          return;
        }
      }
      //todo 提交公司抬头
      wx.request({
        url: urlModel.url.InvoiceTitleChange,
        data: {
          "sessionId":app.globalData.sessionId,
          "titleId":that.data.title.id,
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
            var data = res.data.data;
            console.log(data)
          }else{
            //todo 失败
          }
        }
      })

    }else{
      var name = e.detail.value["name-private"];
      var email = e.detail.value["email-private"];
      if (name === "" || email === "") {
        wx.showToast({
          icon:"none",
          title:'请补全信息'
        });
        return;
      }
      //todo 校验邮箱是否正确
      if(!checker.checkEmail(email)){
        wx.showToast({
          icon:"none",
          title:'邮箱格式有误'
        });
        return;
      }
      // todo 提交个人抬头
      wx.request({
        url: urlModel.url.InvoiceTitleList,
        data: {
          "sessionId":app.globalData.sessionId,
          "titleId":that.data.title.id,
          "type":"person",
          "title":name,
          "email":email
        },
        method:"POST",
        success: function(res) {
          // console.log(res)
          if (res.data.code === 0){
            var data = res.data.data;
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
    var tabId = e.target.dataset.id;
    console.log(e, tabId);
    //todo 禁止编辑抬头时切换
    if (!this.data.adding) {
      wx.showToast({
        icon:"none",
        title:'若要更改抬头类型，请在首页点击 添加发票抬头'
      });
      return
    }
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
    let that = this;
    wx.chooseInvoiceTitle({
      success(res) {
        console.log(res);
        if (res.type == 1){
          //todo 个人抬头
          that.setData({
            isCompany:false,
            "title.name":res.title
          });
          that.defaultData.wxTitle.title = res.title
        } else{
          //todo 企业抬头
          that.setData({
            isCompany:true,
          });
          that.defaultData.wxTitle.bank = res.bankName;
          that.defaultData.wxTitle.bankAccount = res.bankAccount;
          that.defaultData.wxTitle.taxNumb = res.taxNumber;
          that.defaultData.wxTitle.title = res.title;
          that.defaultData.wxTitle.address = res.companyAddress;
          that.defaultData.wxTitle.companyPhone = res.telephone;
          that.setData({
            title: that.defaultData.wxTitle
          })
        }
      }
    })
  },
  submitEditedTitle:function (e) {
    let that = this;
    // 提交修改抬头请求
    // console.log(e);
    var tmp = {
      detail:{
        value:{}
      }
    };
    tmp.detail.value = that.fill2fullTitle(e.detail.value);
    that.addTitle(tmp)
  },
  fill2fullTitle:function (values) {
    //values:表单提交上来的对象
    let that =this;
    //todo 根据原有信息填充表单，并返回
    var returnValue = {};
    if (that.data.isCompany) {
      //todo 填充公司
      Object.keys(values).forEach((key)=>{
        if (key === "name-com") {
          if (values[key] === ""){
            returnValue[key] = that.data.title.title
          }else{
            returnValue[key] = values[key]
          }
        }
        if (key === "taxNumb-com"){
          if (values[key] === ""){
            returnValue[key] = that.data.title.taxNumb
          }else{
            returnValue[key] = values[key]
          }
        }
        //以上两个字段如果为空则直接通过已经获取到的title进行填充
        //以下则需要判断data中的title字段值是否与默认值相同
        if (key === "address-com"){
          if (values[key] === "" &&
              that.data.title.address !== that.defaultData.title.address){
            returnValue[key] = that.data.title.address
          }else{
            returnValue[key] = values[key]
          }
        }
        if (key === "companyPhone-com"){
          if (values[key] === "" &&
              that.data.title.companyPhone !== that.defaultData.title.companyPhone){
            returnValue[key] = that.data.title.companyPhone
          }else{
            returnValue[key] = values[key]
          }
        }
        if (key === "bank-com"){
          if (values[key] === "" &&
              that.data.title.bank !== that.defaultData.title.bank){
            returnValue[key] = that.data.title.bank
          }else{
            returnValue[key] = values[key]
          }
        }
        if (key === "bankAccount-com"){
          if (values[key] === "" &&
              that.data.title.bankAccount !== that.defaultData.title.bankAccount){
            returnValue[key] = that.data.title.bankAccount
          }else{
            returnValue[key] = values[key]
          }
        }
        if (key === "email-com"){
          if (values[key] === "" &&
              that.data.title.email !== that.defaultData.title.email){
            returnValue[key] = that.data.title.email
          }else{
            returnValue[key] = values[key]
          }
        }
      })
    }else {
      //todo 填充个人
      Object.keys(values).forEach((key)=>{
        if (key === "name-private") {
          if (values[key] === ""){
            returnValue[key] = that.data.title.name
          }else{
            returnValue[key] = values[key]
          }
        }
        if (key === "email-private"){
          if (values[key] === ""){
            returnValue[key] = that.data.title.email
          }else{
            returnValue[key] = values[key]
          }
        }
      })
    }
    console.log(returnValue);
    return returnValue
  },
  fill2fullTitleWithWx:function (values) {
    //todo 使用微信抬头填充，并返回
    var returnValue = {}
    if (this.data.isCompany){
      //公司抬头
      if (values["name-com"] === ""){
        values["name-com"] = this.defaultData.wxTitle.title
      }
      if (values["taxNumb-com"] === "" &&
          this.defaultData.wxTitle.taxNumb !== this.defaultData.title.taxNumb){
        values["taxNumb-com"] = this.defaultData.wxTitle.taxNumb
      }
      if (values["address-com"] === "" &&
          this.defaultData.wxTitle.address !== this.defaultData.title.address){
        values["address-com"] = this.defaultData.wxTitle.address
      }
      if (values["companyPhone-com"] === "" &&
          this.defaultData.wxTitle.companyPhone !== this.defaultData.title.companyPhone){
        values["companyPhone-com"] = this.defaultData.wxTitle.companyPhone
      }
      if (values["bank-com"] === "" &&
          this.defaultData.wxTitle.bank !== this.defaultData.title.bank){
        values["bank-com"] = this.defaultData.wxTitle.bank
      }
      if (values["bankAccount-com"] === "" &&
          this.defaultData.wxTitle.bankAccount !== this.defaultData.title.bankAccount){
        values["bankAccount-com"] = this.defaultData.wxTitle.bankAccount
      }
      if (values["email-com"] === "" &&
          this.defaultData.wxTitle.email !== this.defaultData.title.email){
        values["email-com"] = this.defaultData.wxTitle.email
      }
    }
    else {
      //个人抬头
      if (values["name-private"] === "" &&
          this.defaultData.wxTitle.title !== this.defaultData.title.title){
        values["name-private"] = this.defaultData.wxTitle.title
      }
    }

  }
});