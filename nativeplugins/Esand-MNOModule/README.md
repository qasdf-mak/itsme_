## 商品地址

https://market.aliyun.com/products/57126001/cmapi00044151.html

## 产品介绍

本接口提供一键登录(一键取号)，本机号码认证功能

## 使用方式

### 1. 将插件Esand-MNOModule放入项目根目录下的nativeplugins文件夹下

### 2. 导入插件

### 3. 到商品地址购买免费套餐（不用花钱!!!!!）

### 4. 替换自己的appcode

### 5. 申请secretKey

### 6. 调用插件

``` 
<template>
    <view>
        <button v-on:click="sAuth()">一键登入</button>
    </view>
</template>
<script>
        var MNOModule = uni.requireNativePlugin("Esand-MNOModule")
            //阿里云市场appcode
        let appcode = ""
            //申请生成密钥
        let secretKey = ""
            //客制化界面 ios和android 制定界面参数不同，详情参考客制化界面文档
        let authUIConfigJson = ""
    export default {
        data() {
            return {
            }

        },
        methods: {
            sAuth: function(e) {
                let platform=uni.getSystemInfoSync().platform
                if(platform=='ios'){
                    authUIConfigJson = "{\"prefersStatusBarHidden\":true,\"logoImage\":\"logo\",\"checkBoxIsChecked\":true,\"logoWidth\":10.11123,\"logoHeight\":11.11,\"logoTopOffetY\":10.123,\"numberColor\":\"0x0000FF\",\"navTitle\":\"cscscscscs\",\"navTitleColor\":\"0x0000FF\",\"navTitleFont\":20}"
                    secretKey = ""
                }else if(platform=='android'){
                    authUIConfigJson = "{\n" +
                            "    \"privacyState\":true,\n" +
                            "    \"logoImgPath\":\"cscs\"\n" +
                            "}"
                    secretKey = ""
                }
                MNOModule.getPhoneNum({
                    'secretKey': secretKey,
                    'authUIConfigJson': authUIConfigJson
                }, (ret) => {
                    if (ret.code == '0') {
                        let dataBody = ret.data
                        let dataBodyJson = JSON.parse(dataBody)
                        uni.request({
                            url: 'http://edismno.market.alicloudapi.com/mno/getMobile',
                            method: 'POST',
                            data: {
                                'deviceModel': dataBodyJson.deviceModel,
                                'packageId':dataBodyJson.packageId,
                                'platform':dataBodyJson.platform,
                                'token':dataBodyJson.token,
                                'transId':dataBodyJson.transId,
                                'appName':dataBodyJson.appName,
                                'phoneNum':dataBodyJson.phoneNum
                            },
                            header: {
                                'Authorization': 'APPCODE '+appcode,
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            },
                            success: (res) => {
                                console.log('网络请求成功' + JSON.stringify(res.data))
                                uni.showModal({
                                    title: "获取结果成功",
                                    content: JSON.stringify(res.data),
                                })
                            }
                        })
                    }
                })
            },
        }
    }
</script>
<style>
</style>
```

### 7. 客制化界面
参考
https://esandinfo.yuque.com/yv6e1k/caebif/xry7vk

# Q&A

客服联系方式：

* QQ群 --1145603428
* 售前服务--18643777712
* 技术支持2--17604027801
* 技术支持1--18513625590

--- 

有使用上的问题可以随时联系，谢谢

 [1]: http://static.zybuluo.com/745479540/9q3ukxbdevqsnqmmk3vqnatl/Screenshot_2020-06-11-21-32-58-005_com.esandinfo.zim.jpg
  [2]: http://static.zybuluo.com/745479540/f1mad7gglaxkgs8my6rnexi8/Screenshot_2020-06-11-21-33-33-221_com.esandinfo.zim.jpg
