import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'example' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '成绩管理', icon: 'example', roles: ['student'] },
    children: [
      {
        path: 'grade',
        name: 'Grade',
        // hidden: true,
        component: () => import('@/views/class/grade'),
        meta: { title: '成绩管理', icon: 'form' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '证书管理', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: { roles: ['student'] },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '课程表管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/student',
    name: 'Admin',
    meta: { title: '权限管理', icon: 'form', roles: ['admin'] },
    children: [
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/authority/student'),
        meta: { title: '学生管理', icon: 'form' }
      },
      {
        path: 'teach',
        name: 'Teach',
        component: () => import('@/views/authority/teach'),
        meta: { title: '教师管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    meta: { title: '班级管理', icon: 'form', roles: ['teach'] },
    children: [
      {
        path: 'index',
        name: 'Class',
        component: () => import('@/views/class/index'),
        meta: { title: '学生管理', icon: 'form' }
      },
      {
        path: 'course',
        name: 'Course',
        component: () => import('@/views/form/index'),
        meta: { title: '课程表管理', icon: 'form' }
      },
      {
        path: 'grade',
        name: 'Grade',
        hidden: true,
        component: () => import('@/views/class/grade'),
        meta: { title: '成绩管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/teachinfo',
    component: Layout,
    meta: { roles: ['teach'] },
    children: [
      {
        path: 'index',
        name: 'teachInfo',
        component: () => import('@/views/teachinfo/index'),
        meta: { title: '个人信息', icon: 'form' }
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    meta: { roles: ['student'] },
    children: [
      {
        path: 'index',
        name: 'Info',
        component: () => import('@/views/info/index'),
        meta: { title: '个人信息', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
