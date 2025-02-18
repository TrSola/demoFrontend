import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/LoginView.vue'),
    children: [
    ]
  },
  {
    path: '/register',
    component: () => import('../views/RegisterView.vue'),
    children: [
    ]
  },
  {
    path: '/userInfo',
    component: () => import('../views/UserInfoView.vue'),
    children: [
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundView.vue')
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router