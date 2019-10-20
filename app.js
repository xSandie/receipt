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
      haveSet:false,
      isCompany:false, //判断是否是企业抬头
      id:1,
      title:"抬头陕师大",
      sum:"邮箱"
    },//选择的发票抬头
  }
})