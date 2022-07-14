function quitApp() {
	switch (uni.getSystemInfoSync().platform) {
		case 'android':
			plus.runtime.quit();
			break;
		case 'ios':
			plus.ios.import('UIApplication').sharedApplication().performSelector('exit');
			break;
	}
}

	export {
		quitApp
	}
