//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    chosenTitle:{
      haveSet:false, //判断是否设置过发票抬头了
      isCompany:false, //判断是否是企业抬头
      titleId:1,
      title:"发票抬头",
      sum:"点击选择发票抬头"
    },//选择的发票抬头
  }
})