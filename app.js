//app.js
const urlModel = require('utils/urlSet.js');
App({
  onLaunch: function () {
    this.login()
  },
  login:function(){
    var app = this
    // 登录
    wx.login({
      success: res => {
        // todo 登陆，发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: urlModel.url.Login,
          data: {
            "code": res.code
          },
          method:"POST",
          success: function(res) {
            // console.log(res)
            if (res.data.code === 0){
              var data = res.data.data
              console.log(data)
              app.globalData.sessionId = data.sessionid
            }else{
              //todo 登陆失败
            }
          }
        })
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
    sessionId:""//用户标识符
  }
})