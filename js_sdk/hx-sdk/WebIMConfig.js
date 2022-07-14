let location = {
  protocol: "https"
};
let config = {
  xmppURL: 'wss://im-api-wechat-31.easemob.com/websocket', //小程序3.0 server 线上 小程序和原生客户端使用这个
  apiURL: "https://a31.easemob.com",
  appkey: "1160210719152968#itsme",
  https: false,
  isMultiLoginSessions: false,
  isWindowSDK: false,
  isSandBox: false,
  isDebug: false,
  autoReconnectNumMax: 15,
  autoReconnectInterval: 2,
  isWebRTC: false,
  isAutoLogin: true
};
export default config;