import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ScheduleSession from '@/components/ScheduleSession'
import SessionEnd from '@/components/SessionEnd'
import ScheduleConfirmation from '@/components/ScheduleConfirmation'
import AppointmentLanding from '@/components/AppointmentLanding'
import WaitingRoom from '@/components/WaitingRoom'
import Call from '@/components/Call'

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
      path: '/scheduleConfirmation',
      name: 'ScheduleConfirmation',
      component: ScheduleConfirmation
    },
    {
      path: '/appointmentLanding',
      name: 'AppointmentLanding',
      component: AppointmentLanding
    },
    {
      path: '/waitingRoom',
      name: 'WaitingRoom',
      component: WaitingRoom
    },
    {
      path: '/sessionEnd',
      name: 'SessionEnd',
      component: SessionEnd
    },
    {
      path: '/call',
      name: 'Call',
      component: Call,
      props: true
    }
  ]
})
