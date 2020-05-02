import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ScheduleSession from '@/components/ScheduleSession'
import SessionEnd from '@/components/SessionEnd'
import ScheduleConfirmation from '@/components/ScheduleConfirmation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/scheduleSession',
      name: 'ScheduleSession',
      component: ScheduleSession
    },
    {
      path: 'scheduleConfirmation',
      name: 'ScheduleConfirmation',
      component: ScheduleConfirmation
    },
    {
      path: 'sessionEnd',
      name: 'SessionEnd',
      component: SessionEnd
    }
  ]
})
