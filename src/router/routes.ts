import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/sidepanel'
  },
  {
    path: '/sidepanel',
    component: () => import('layouts/SidePanelLayout.vue'),
    children: [{path: '', component: () => import('pages/SidePanelPage.vue')}],
  },
  {
    path: '/sidepanel/welcome',
    component: () => import('layouts/SidePanelLayout.vue'),
    children: [{path: '', component: () => import('pages/sidepanel/WelcomePage.vue')}],
  },
  {
    path: '/mainpanel/settings',
    component: () => import('layouts/PlainWithRightDrawerLayout.vue'),
    children: [{path: '', component: () => import('pages/SettingsPage.vue')}],
  },
  {
    path: '/mainpanel/features/:feature',
    component: () => import('layouts/PlainWithRightDrawerLayout.vue'),
    children: [{path: '', component: () => import('src/features/pages/FeaturesPage.vue')}],
  },
  {
    path: '/features/:feature',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [{path: '', component: () => import('src/features/pages/FeaturesPage.vue')}],
  },
  {
    path: '/sidepanel/mdManager',
    component: () => import('layouts/SidePanelLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/SidePanelMasterDataPage.vue')}],
  },
  {
    path: '/mainpanel/md/:mdId', // editorjs setup cannot toggle between readonly/write mode
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelMasterDataPage.vue')}],
  },
  {
    path: '/mainpanel/md/:mdId/items',
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelMasterDataItemPage.vue')}],
  },
  {
    path: '/mainpanel/md/:mdId/items/:itemId',
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelMasterDataItemPage.vue')}],
  },
  {
    path: '/sidepanel/entityManager',
    component: () => import('layouts/SidePanelLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/SidePanelEntitiesPage.vue')}],
  },
  {
    path: '/sidepanel/apiManager',
    component: () => import('layouts/SidePanelLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/SidePanelApisPage.vue')}],
  },
  {
    path: '/mainpanel/entities/:entityId', // editorjs setup cannot toggle between readonly/write mode
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelEntityPage.vue')}],
  },
  {
    path: '/mainpanel/entities/:entityId/views/table', // editorjs setup cannot toggle between readonly/write mode
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelEntitiesAsTablePage.vue')}],
  },
  {
    path: '/mainpanel/entities/:entityId/items',
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelEntityItemPage.vue')}],
  },
  {
    path: '/mainpanel/entities/:entityId/items/:itemId',
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelEntityItemPage.vue')}],
  },

  {
    path: '/mainpanel/apis/:apiId', // editorjs setup cannot toggle between readonly/write mode
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelApiPage.vue')}],
  },
  {
    path: '/mainpanel/apis/:apiId/endpoints',
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelApiEndpointPage.vue')}],
  },
  {
    path: '/mainpanel/apis/:apiId/endpoints/:endpointId',
    component: () => import('layouts/PlainLayout.vue'),
    children: [{path: '', component: () => import('src/apps/pages/MainPanelApiEndpointPage.vue')}],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
