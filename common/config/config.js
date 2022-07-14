//https://client.shiwoaapp.com
export default {
	// #ifdef H5
	            service: process.env.NODE_ENV === 'production' ? 'https://v2client.shiwoaapp.com/api' : '/api',
	uploadimg: process.env.NODE_ENV === 'production' ? 'https://v2client.shiwoaapp.com/addons' : '/addons',
	// #endif
	// #ifdef APP-PLUS
	service: process.env.NODE_ENV === 'production' ? 'https://v2client.shiwoaapp.com/api' :
		'https://v2client.shiwoaapp.com/api',
	uploadimg: process.env.NODE_ENV === 'production' ? 'https://v2client.shiwoaapp.com/addons' :
		'https://v2client.shiwoaapp.com/addons'
	// #endif
}
// http://192.168.0.108   https://v2client.shiwoaapp.com