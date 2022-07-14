import UserService from '../../common/service/user-service.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
	computed: {
		...mapGetters(['token'])
	},
  methods: {
		...mapActions(['USER']),
    loginExpire () {
      return new Promise((resolve, reject) => {
        if (!this.token) {
        	resolve(false)
        } else {
        	UserService.getuserinfo().then(res => {
        		if (res.code === 1) {
        			this.USER(res.data)
        			resolve(true)
        		} else {
        			this.USER(null)
							resolve(false)
        		}
        	})
        }
      })
    }
  }
}
