//参数校验相关函数

function checkEmail(email) {
    var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
    if (!reg.test(email)) { //正则验证不通过，格式不对
        return false
    }
    return true
}

exports.checkEmail = checkEmail