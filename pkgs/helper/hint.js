//提示类方法

function returnError(text="出错了",icon="none") {
    //返回数据有误
    wx.showToast({
        icon:icon,
        title:text
    })
}

function networkError(text="请检查网络连接",icon="none") {
    //网络有误
    wx.showToast({
        icon:icon,
        title:text
    })
}

function inputError(text="输入有误",icon="none") {
    //输入有误
    wx.showToast({
        icon:icon,
        title:text
    })
}

function operSuccess(text="操作成功", icon="success") {
    wx.showToast({
        icon:icon,
        title:text
    })
}

exports.operSuccess = operSuccess;
exports.networkError = networkError;
exports.returnError = returnError;
exports.inputError = inputError;