import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LeavePaperView from '../views/LeavePaperView.vue'
import LogInView from '../views/LogInView.vue'
import RequestView from '../views/RequestView.vue'
import SignupStudentView from '../views/SignupStudentView.vue'
import SignupTeacherView from '../views/SignupTeacherView.vue'
import TestRequestView from '../views/TestRequestView.vue'
import TestJew from '../views/test/TestJew.vue'
import TestParn from '../views/test/TestParn.vue'
import TestParn2 from '../views/test/TestParn2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Product
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
    // TESTS 
    {
      path: '/testParn2',
      name: 'TestParn2',
      component: TestParn2
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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/testChangePassword',
      name: 'testChangePassword',
      component: () => import('../views/test/TestChangePassword.vue')
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('../views/test/Sandbox.vue')
    }
  ]
})

export default router
