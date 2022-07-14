import ajax from '../utils/ajax.js'
import $jsonurl from '../config/api-url.js'

class TaskService {
	// Me约选项
	taskselect(params) {
		return ajax($jsonurl.task.taskselect, 'POST', false, params)
	}
	// 发布Me约
	publishtask(params) {
		return ajax($jsonurl.task.publishtask, 'POST', false, params)
	}
	// Me约验证
	publishcheck(params) {
		return ajax($jsonurl.task.publishcheck, 'POST', false, params)
	}
	// Me约匹配列表
	taskmatchlist(params) {
		return ajax($jsonurl.task.taskmatchlist, 'POST', false, params)
	}
	// 发布中的Me约
	publishingcheck(params) {
		return ajax($jsonurl.task.publishingcheck, 'POST', false, params)
	}
	// 打招呼
	taskmatchhello(params) {
		return ajax($jsonurl.task.taskmatchhello, 'POST', false, params)
	}
	// Me约详情
	taskinfo(params) {
		return ajax($jsonurl.task.taskinfo, 'POST', false, params)
	}
	// 判断Me约是否可报名和邀请
	taskstatecheck(params) {
		return ajax($jsonurl.task.taskstatecheck, 'POST', false, params)
	}
	// 确认Me约执行人
	taskmatchuser(params) {
		return ajax($jsonurl.task.taskmatchuser, 'POST', false, params)
	}
	// 删除Me约报名和邀请人
	taskmatchuserdel(params) {
		return ajax($jsonurl.task.taskmatchuserdel, 'POST', false, params)
	}
	//Me约发布中验证返回匹配和进行中
	publishingcheckallstate(params) {
		return ajax($jsonurl.task.publishingcheckallstate, 'POST', false, params)
	}
	// Me约类型
	tasktypelist(params) {
		return ajax($jsonurl.task.tasktypelist, 'POST', false, params)
	}
	// Me约列表
	tasklistinfo(params) {
		return ajax($jsonurl.task.tasklistinfo, 'POST', false, params)
	}
	// 已发布Me约列表
	tasklistpublish(params) {
		return ajax($jsonurl.task.tasklistpublish, 'POST', false, params)
	}
	// 已接受Me约列表
	tasklistaccept(params) {
		return ajax($jsonurl.task.tasklistaccept, 'POST', false, params)
	}
	// Me约匹配用户列表
	taskmatchuserlist(params) {
		return ajax($jsonurl.task.taskmatchuserlist, 'POST', false, params)
	}
	// 完成Me约
	tasksuccess(params) {
		return ajax($jsonurl.task.tasksuccess, 'POST', false, params)
	}
	// 点击邀请推送后台消息
	tasksay(params) {
		return ajax($jsonurl.task.tasksay, 'POST', false, params)
	}
}

export default new TaskService()
