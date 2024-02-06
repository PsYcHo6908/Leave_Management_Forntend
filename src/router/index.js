import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LeavePaperView from '../views/LeavePaperView.vue'
import LogInView from '../views/LogInView.vue'
import RequestView from '../views/RequestView.vue'
import SignupView from '../views/SignupView.vue'
import SignupTeacherView from '../views/SignupTeacherView.vue'
import TestRequestView from '../views/TestRequestView.vue'
import TestJew from '../views/test/TestJew.vue'
import TestParn from '../views/test/TestParn.vue'
import TestParn2 from '../views/test/TestParn2.vue'
import AddSubject from '../views/AddSubject.vue'

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
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'Login',
      component: LogInView
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
      path: '/addSubject',
      name: 'AddSubject',
      component: AddSubject
    },
    {
      path: '/request',
      name: 'RequestView',
      component: RequestView
    },
    // TESTS 
    {
      path: '/testParn',
      name: 'TestParn',
      component: TestParn
    },
    {
      path: '/testJew',
      name: 'TestJew',
      component: TestJew
    },
    {
      path: '/testParn2',
      name: 'TestParn2',
      component: TestParn2
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
