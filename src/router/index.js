import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LeavePaperView from '../views/LeavePaperView.vue'
import LogInView from '../views/LogInView.vue'
import SignupStudentView from '../views/SignupStudentView.vue'
import SignupTeacherView from '../views/SignupTeacherView.vue'
import TestJew from '../views/TestJew.vue'
import TestParn from '../views/TestParn.vue'
import RequestView from '../views/RequestView.vue'
import TestRequestView from '../views/TestRequestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signupStudent',
      name: 'SignupStudent',
      component: SignupStudentView
    },
    {
      path: '/login',
      name: 'Login',
      component: LogInView
    },
    {
      path: '/testJew',
      name: 'TestJew',
      component: TestJew
    },
    {
      path: '/signupTeacher',
      name: 'SignupTeacher',
      component: SignupTeacherView
    },
    {
      path: '/leavePaper',
      name: 'LeavePaperView',
      component: LeavePaperView
    },
    {
      path: '/testParn',
      name: 'TestParn',
      component: TestParn
    },
    {
      path: '/request',
      name: 'RequestView',
      component: RequestView
    },
    {
      path: '/testRequest',
      name: 'testRequestView',
      component: TestRequestView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
