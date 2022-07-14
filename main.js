/** ========================分         割         线==================
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *     永无BUG 裴志丹 专用签名
 **/
import Vue from 'vue'
import App from './App'
import store from 'store/index'
import {
	getCurrentPageUrlWithArgs
} from 'common/utils/common-methods.js'
// 枚举
import $jsonBasic from 'common/utils/common/basic'
import 'common/utils/extends'
import uView from 'uview-ui'
import 'common/filters'
import validate from 'common/utils/ys-validate.js'
import SDK from "js_sdk/hx-sdk/wxsdk3.5.1.js";
import config from "js_sdk/hx-sdk/WebIMConfig.js";
// 全局mixins
import commonMixin from 'common/mixins/common.js'
// 全局组件引用
import customPop from 'components/common/custompop.vue'
import customPicker from 'components/common/custompicker.vue'
import memberPop from 'components/common/memberPop.vue'
import giftPop from 'components/common/giftPop.vue'
import customNav from 'components/common/customnav.vue'
import customTop from 'components/common/customtop.vue'
import customToast from 'components/common/customtoast.vue'
import emptyTip from 'components/common/empty.vue' // 空数据提示
import unifyPop from 'components/common/unifyPop.vue' // 统一弹框
import newUnifyPop from 'components/common/newUnifyPop.vue' // 新版统一弹框
import perfectPop from 'components/common/perfectpop.vue' // 资料弹框
import memberPay from 'components/common/memberPay.vue' // 会员充值弹框
import redPacket from 'components/common/redPacket.vue' // 顶部弹出会员券
// 注册缓存器
Vue.component('custom-picker', customPicker)
Vue.component('custom-pop', customPop)
Vue.component('member-pop', memberPop)
Vue.component('gift-pop', giftPop)
Vue.component('custom-nav', customNav)
Vue.component('custom-top', customTop)
Vue.component('custom-toast', customToast)
Vue.component('empty-tip', emptyTip)
Vue.component('unify-pop', unifyPop)
Vue.component('new-unify-pop', newUnifyPop)
Vue.component('perfect-pop', perfectPop)
Vue.component('member-pay', memberPay)
Vue.component('red-packet', redPacket)
Vue.prototype.$jsonBasic = $jsonBasic
// vuex
Vue.prototype.$store = store
// 表单验证
Vue.prototype.$validate = validate
// 获取当前页带参数的url及参数
Vue.prototype.$getCurrentPageUrlWithArgs = getCurrentPageUrlWithArgs
//环信
const WebIM = wx.WebIM = SDK;
WebIM.config = config
WebIM.conn = new WebIM.connection({
	isMultiLoginSessions: false, //是否可以登录多个，并在所有端上接收消息
	appKey: WebIM.config.appkey, //必须。
	https: false, //是否使用HTTPS 
	url: WebIM.config.xmppURL, // socket server (3.0 SDK)
	apiUrl: WebIM.config.apiURL, // rest server
	heartBeatWait: 10000, //心跳间隔
	autoReconnectNumMax: 2, //自动重连次数
	useOwnUploadFun: false, // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）
	open(opt) {
		this.curOpenOpt = opt;
		WebIM.conn.open(opt);
		this.closed = false;
	},
	reopen() {
		if (this.closed) {
			this.open(this.curOpenOpt);
			WebIM.conn.open(this.curOpenOpt);
			this.closed = false;
		}
	}
});

Vue.prototype.$WebIM = WebIM;

Vue.mixin(commonMixin)
Vue.config.productionTip = false

// 注册缓存器

App.mpType = 'app'
Vue.use(uView)

const app = new Vue({
	...App
})
app.$mount()
