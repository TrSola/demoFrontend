import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
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