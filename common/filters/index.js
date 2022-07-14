import Vue from 'vue'
import { formatImage, formatDate, formatTimeIndex, formatTimeLife, formatTaskType, formatTaskCost,formatNumber,formatAvatar } from 'common/utils/common-methods'

Vue.filter('indexTimeFilter', formatTimeIndex)
Vue.filter('lifeTimeFilter', formatTimeLife)
Vue.filter('imageFilter', formatImage)
Vue.filter('dateFilter', formatDate)
Vue.filter('taskTypeFilter', formatTaskType)
Vue.filter('taskCostFilter', formatTaskCost)
Vue.filter('numberFilter', formatNumber)
Vue.filter('avatarFormat', formatAvatar)
