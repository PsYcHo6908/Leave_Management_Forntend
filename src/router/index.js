import { createRouter, createWebHistory } from 'vue-router'

// system
import DeletedPage from '../views/DeletedPage.vue'
import LogInView from '../views/LogInView.vue'
//student
import RequestView from '../views/RequestView.vue'
//admin
import AddSubject from '../views/admin/AddSubject.vue'
import SignupTeacherView from '../views/admin/SignupTeacherView.vue'
import SignupView from '../views/admin/SignupView.vue'
//teacher
import RequestTeacherView from '../views/teacher/RequestTeacherView.vue'
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
    {
      path: '/deleted-page',
      name: 'DeletedPage',
      component: DeletedPage // Use the imported component for the deleted page
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
      component: () => import('../views/student/LeavePaperView.vue')
    },
    {
      path: '/request',
      name: 'RequestView',
      component: RequestView
    },
    {
      path: '/details/:id',
      name: 'DetailPage',
      component: () => import(/* webpackChunkName: "details" */ '../views/student/DetailPage.vue')
    },
    {
      path: '/requestTeacher',
      name: 'RequestTeacherView',
      component: RequestTeacherView
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


//"When this comment is open, it will not navigate to other pages when not authenticated.

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   userStore.initStore()
//   const isAuthenticated = !!userStore.user.access;

//   if (to.name !== 'Login' && !isAuthenticated) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });


export default router
