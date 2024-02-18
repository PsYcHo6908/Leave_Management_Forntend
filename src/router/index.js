import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '../views/LogInView.vue'
//student
import LeavePaperView from '../views/LeavePaperView.vue'
import RequestView from '../views/RequestView.vue'
//admin
import SignupView from '../views/admin/SignupView.vue'
import SignupTeacherView from '../views/admin/SignupTeacherView.vue'
import AddSubject from '../views/admin/AddSubject.vue'
//test
import TestRequestView from '../views/TestRequestView.vue'
import TestJew from '../views/test/TestJew.vue'
import TestParn from '../views/test/TestParn.vue'
import TestParn2 from '../views/test/TestParn2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // All Roles
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: LogInView
    },
    // Admin
    {
      path: '/homeAdmin',
      name: 'homeAdmin',
      component: () => import('../views/admin/HomeAdmin.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/addSubject',
      name: 'AddSubject',
      component: AddSubject
    },
    {
      path: '/addFaculty',
      name: 'addFaculty',
      component: () => import('../views/admin/AddFacultyView.vue')
    },
    {
      path: '/addDepartment',
      name: 'addDepartment',
      component: () => import('../views/admin/AddDepartmentView.vue')
    },
    {
      path: '/signupTeacher',
      name: 'SignupTeacher',
      component: SignupTeacherView
    },
    //students
    {
      path: '/leavePaper',
      name: 'LeavePaperView',
      component: LeavePaperView
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
    },
    {
      path: '/dupInput',
      name: 'dupInput',
      component: () => import('../views/test/TestDuplicateInput.vue')
    }
  ]
})

export default router
