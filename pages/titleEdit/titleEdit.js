// pages/titleEdit/titleEdit.js编辑发票抬头
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
        if (options.page_from === "display") {
          //从展示页面过来，携带抬头id
          var titleId = options.id
          //todo 请求发票抬头详细信息填充 判断是否是企业抬头

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
    //todo 提交修改抬头请求
    console.log(e)
  }
})