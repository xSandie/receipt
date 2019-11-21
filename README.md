# 发票小程序 接口需求文档

[TOC]

## 一、登陆 GET ✅

### 1. 请求参数

| 参数 | 可空  | 类型   | 描述                         |
| ---- | ----- | ------ | ---------------------------- |
| code | False | String | 微信换openid等信息的登陆code |

### 2. 返回数据

```python
{
	"code": 0,
	"msg": "成功",
	"data": {
        "sessionId":"用户标识符"
  }	
}
```

## 二、请求发票抬头列表（分页一页20个）GET ✅

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述        |
| --------- | ----- | ------ | ----------- |
| sessionId | False | String | 用户标识符  |
| page      | False | Int    | 页数从1开始 |

### 2. 返回数据

```python
{
	"code": 0,
	"msg": "成功",
	"data": {
        "titles":[{
          "id":"该条title对应的id，如201",  
          "title":"发票抬头，如陕西师范大学",
          "detail":"个人则展示邮箱，企业则展示税号"
        },{
          "id":"该条title对应的id，如203",  
          "title":"发票抬头，如陕西师范大学",
          "detail":"个人则展示邮箱，企业则展示税号"
        }]
  }	
}
```

> 说明：抬头展示的顺序为 **新添加** 的在前

## 三、请求发票抬头详细信息 GET 

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述       |
| --------- | ----- | ------ | ---------- |
| sessionId | False | String | 用户标识符 |
| titleId   | False | String | 发票抬头id |

### 2. 返回数据

- 企业抬头 ✅

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
    	"isCompany":true, #是否是企业抬头，是则为true
        "title":{
    	    // 企业抬头展示的信息
            "id":"该条title对应的id，如201",  
            "title":"发票抬头，如陕西师范大学",
            "taxNumb":"x1231244343423",//税号
            //以下为可选参数
            "address":"单位地址陕西省西安市长安区吧啦吧啦吧啦",
            "companyPhone":"电话号码",
            "bank":"开户银行",
            "bankAccount":"银行账户11111",
        }
  }	
}
```

- 个人抬头

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
    	    "isCompany":false, //是否是企业抬头，是则为true
            "title":{
                //个人抬头展示的信息
                "id":"该条title对应的id，如201",  
                "title":"发票抬头，如陕西师范大学",
                "email":"邮箱345592674@qq.com"
            }
  }	
}
```

## 四、修改抬头 POST ✅

> 说明：此处与发票详情页面的修改抬头不同

### 1. 请求参数

- 企业抬头

| 参数         | 可空  | 类型   | 描述                                         |
| ------------ | ----- | ------ | -------------------------------------------- |
| sessionId    | False | String | 用户标识符                                   |
| titleId      | True  | String | 抬头id，若为新增抬头，则此参数为空字符串，"" |
| type         | False | String | 可选值 company \| person                     |
| title        | False | String | 发票抬头（名称）                             |
| taxNumb      | False | String | 税号                                         |
| bankAccount  | True  | String | 银行账户，为空时传空字符串，""               |
| bank         | True  | String | 开户银行，为空时传空字符串，""               |
| address      | True  | String | 单位地址，为空时传空字符串，""               |
| companyPhone | True  | String | 单位电话，为空时传空字符串，""               |
| email        | True  | String | 邮箱，为空时传空字符串，""                   |

- 个人抬头

| 参数      | 可空  | 类型   | 描述                                         |
| --------- | ----- | ------ | -------------------------------------------- |
| sessionId | False | String | 用户标识符                                   |
| titleId   | True  | String | 抬头id，若为新增抬头，则此参数为空字符串，"" |
| type      | False | String | 可选值 company \| person                     |
| title     | False | String | 发票抬头（名称）                             |
| email     | False | String | 邮箱，不可不填                               |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {	
  }	
}
```

## 五、请求发票详情 GET

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述       |
| --------- | ----- | ------ | ---------- |
| sessionId | False | String | 用户标识符 |
| invoiceId | False | String | 发票id     |

### 2. 返回数据

- 企业发票

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
            "type":"paper | electronic", // 纸质发票或电子发票
            "title":{
                      "title":"陕西师范大学",
                      "details":{
                            "taxNumb":"2323523464556456X",
                            //以下字段为空时，填空字符串
                            "bankAccount":"银行账户",
                            "bank":"开户行",
                            "address":"单位地址",
                            "companyPhone":"单位电话",
                            "email":"邮箱",
                      }
                    },
            "invoice":{
                      "money":15.00,//发票金额
                      "time":"2019-10-08", //申请开票时间
                      //纸质发票有以下两个字段
                      "address":"深圳市龙华区龙华高级中学", //发票邮寄地址
                      "expressCode":"SF23423413245", //快递单号，若无则为"暂无"
                      //电子发票有以下一个字段
                      "mail":"345592674@qq.com"  //接收邮箱
            }
  }	
}
```

- 个人发票

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
            "type":"paper | electronic", // 纸质发票或电子发票
            "title":{
              "title":"向书晗",
              "details":{
                  "mail":"345592674@qq.com"
              }
            },
            "invoice":{
                  "money":15.00, //发票金额
                  "time":"2019-10-08", //申请开票时间
                  //纸质发票有以下两个字段
                  "address":"深圳市龙华区龙华高级中学", //发票邮寄地址
                  "expressCode":"SF23423413245", //快递单号，若无则为"暂无"
                  //电子发票有以下一个字段
                  "mail":"345592674@qq.com"  //接收邮箱
            }
  }	
}
```

## 六、历史发票中，请求可供筛选的年数组 GET

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述       |
| --------- | ----- | ------ | ---------- |
| sessionId | False | String | 用户标识符 |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
    	    "years":["2019年","2018年"] //年
    }
  }	
}
```

## 七、历史发票列表筛选 GET

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述                                                         |
| --------- | ----- | ------ | ------------------------------------------------------------ |
| sessionId | False | String | 用户标识符                                                   |
| year      | True  | String | 筛选的年份，未筛选时为空字符串""                             |
| month     | True  | String | 筛选的月份，未筛选时为空字符串""                             |
| type      | True  | String | 筛选电子发票或纸质发票，可选值paper \| electronic，未筛选时为空字符串"" |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
            "invoiceList":[{
                "id":"发票id",
                "receiptTitle":"陕西师范大学", //发票抬头
                "receiptMoney":"11.00", //开票金额
                "buildTime":"2019-10-14", //申请时间
                "status":"已开票", //状态 已开票 | 未开票
                "type":"纸质", //类型 纸质 | 电子
                "content":"发票详细信息，如税号（企业）或者 邮箱（个人）" 
        }]
    }
  }	
}
```

## 八、请求可开票的详细数据，如金额 GET ✅

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述             |
| --------- | ----- | ------ | ---------------- |
| sessionId | False | String | 用户标识符       |
| code      | False | String | 扫码后拿到的编码 |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {
            "totalMoney":"23.00", //订单金额
            "invoiceMoney":"23.00", //可开票金额
    }
  }	
}
```



## 九、开票接口 POST ✅

### 1. 请求参数

> 说明：开票时，不允许用户单独为发票设置新抬头，只允许直接选择抬头或者添加抬头后选择抬头（允许用户后来更改抬头，设计数据库时建议发票表也带上抬头的字段可设置成jsonb字段）

- 纸质发票

| 参数         | 可空  | 类型   | 描述                                          |
| ------------ | ----- | ------ | --------------------------------------------- |
| sessionId    | False | String | 用户标识符                                    |
| type         | False | String | 电子发票或纸质发票，可选值paper \| electronic |
| titleId      | False | String | 抬头id                                        |
| sendAddress  | False | String | 寄送地址                                      |
| invoiceMoney | False | Float  | 开票金额                                      |
| code         | False | String | 绑定的订单编码                                |

- 电子发票

| 参数         | 可空  | 类型   | 描述                                          |
| ------------ | ----- | ------ | --------------------------------------------- |
| sessionId    | False | String | 用户标识符                                    |
| type         | False | String | 电子发票或纸质发票，可选值paper \| electronic |
| titleId      | False | String | 抬头id                                        |
| sendMail     | False | String | 接收发票的邮箱                                |
| invoiceMoney | False | Float  | 开票金额                                      |
| code         | False | String | 绑定的订单编码                                |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {}
  }	
}
```



## 十、发票详情页面修改抬头 POST

### 1. 请求参数

- 企业抬头

| 参数         | 可空  | 类型   | 描述                                         |
| ------------ | ----- | ------ | -------------------------------------------- |
| sessionId    | False | String | 用户标识符                                   |
| invoiceId    | True  | String | 抬头id，若为新增抬头，则此参数为空字符串，"" |
| type         | False | String | 可选值 company \| person                     |
| title        | False | String | 发票抬头（名称）                             |
| taxNumb      | False | String | 税号                                         |
| bankAccount  | True  | String | 银行账户，为空时传空字符串，""               |
| bank         | True  | String | 开户银行，为空时传空字符串，""               |
| address      | True  | String | 单位地址，为空时传空字符串，""               |
| companyPhone | True  | String | 单位电话，为空时传空字符串，""               |
| email        | True  | String | 邮箱，为空时传空字符串，""                   |

- 个人抬头

| 参数      | 可空  | 类型   | 描述                     |
| --------- | ----- | ------ | ------------------------ |
| sessionId | False | String | 用户标识符               |
| invoiceId | False | String | 绑定的发票id             |
| type      | False | String | 可选值 company \| person |
| title     | False | String | 发票抬头（名称）         |
| email     | False | String | 邮箱，不可不填           |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {	
  }	
}
```

# 十一、删除发票抬头 POST ✅

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述       |
| --------- | ----- | ------ | ---------- |
| sessionId | False | String | 用户标识符 |
| titleId | False | String | 发票id     |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {	
  }	
}
```

# 十二、退款

### 1. 请求参数

| 参数      | 可空  | 类型   | 描述       |
| --------- | ----- | ------ | ---------- |
| sessionId | False | String | 用户标识符 |
| invoiceId | False | String | 发票id     |

### 2. 返回数据

```json
{
	"code": 0,
	"msg": "成功",
	"data": {	
  }	
}
```
