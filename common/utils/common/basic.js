export default {
	// 发布Me约字段
  baseTask: {
		publish_type: 1,
		type_id: '',
		type_name: '',
		name: '',
		address: '中山公园',
		lng: '116.394394',
		lat: '39.910702',
		start_time: null,
		end_time: null,
		content: '',
		url: '',
		cost_type: 1,
		qwdx: '',
		qwdx_name: '',
		xgyq: '',
		xgyq_name: '',
		worth: 0,
		worth_start: 80,
		worth_end: 5000,
		age: 0,
		age_start: 18,
		age_end: 80,
		others: 0,
		others_num: 1,
		expect_region: '',
		expect_region_pname: '',
		expect_region_pid: '',
		expect_region_cid: '',
		expect_region_cname: '',
		other_demand: '',
		is_gift: 1,
		gift: ''
	},
	// 身高选项
	heightList: ['请选择',150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199],
	// 体重选项
	weightList: ['请选择',35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53 , 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
	// 用户默认信息
	// 男
	baseUserBoy: {
		avatar: '/uploads/20210325/D4BB3E320646424CA4FA60A5AB1514A6.png', // 头像
		cover_photo: '/uploads/20210325/D4BB3E320646424CA4FA60A5AB1514A6.png', // 封面照片
		birthday: '2000-01-01', // 生日
		height: 180, // 身高
		weight: 60 // 体重
	},
	// 女
	baseUserGirl: {
		avatar: '/uploads/20210325/D4BB3E320646424CA4FA60A5AB1514A6.png', // 头像
		cover_photo: '/uploads/20210325/D4BB3E320646424CA4FA60A5AB1514A6.png', // 封面照片
		birthday: '2000-01-01', // 生日
		height: 170, // 身高
		weight: 45 // 体重
	}
}
