
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'map', component: () => import('src/pages/Map/Index.vue') },
      { path: 'instruments', component: () => import('src/pages/Heading/Index.vue') },
      { path: 'radio', component: () => import('pages/Radio/Index.vue') },
      { path: 'avionics', component: () => import('src/pages/Avionics/Index.vue') },
      { path: 'settings', component: () => import('src/pages/Settings/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
