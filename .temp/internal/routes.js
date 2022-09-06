/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "C:\\Users\\Karry_Liao\\Desktop\\blog\\studyblog.github.io\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-9d4b429c",
    path: "/Components/CpNet/base.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-9d4b429c").then(next)
    },
  },
  {
    name: "v-8dd857e0",
    path: "/Components/javascript/base.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-8dd857e0").then(next)
    },
  },
  {
    name: "v-1916dd18",
    path: "/Components/md_interview/Interview.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1916dd18").then(next)
    },
  },
  {
    name: "v-e4900cdc",
    path: "/Components/react/base.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-e4900cdc").then(next)
    },
  },
  {
    name: "v-6014b0d0",
    path: "/Components/static/Button.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6014b0d0").then(next)
    },
  },
  {
    name: "v-7c5113b0",
    path: "/Components/md_view/vue.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-7c5113b0").then(next)
    },
  },
  {
    name: "v-15746658",
    path: "/Components/base/introduce.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-15746658").then(next)
    },
  },
  {
    name: "v-80886510",
    path: "/Components/static/MagnifyingGlass.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-80886510").then(next)
    },
  },
  {
    name: "v-30441f42",
    path: "/Components/static/Icon.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-30441f42").then(next)
    },
  },
  {
    name: "v-0efb07f8",
    path: "/Components/base/start.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0efb07f8").then(next)
    },
  },
  {
    name: "v-d4b03610",
    path: "/Components/static/Message.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-d4b03610").then(next)
    },
  },
  {
    name: "v-226832f2",
    path: "/Components/vue/base.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-226832f2").then(next)
    },
  },
  {
    name: "v-2194adc3",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2194adc3").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    path: '*',
    component: GlobalLayout
  }
]