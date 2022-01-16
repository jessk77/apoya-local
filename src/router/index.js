import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Item from '../views/Item.vue'
import Search from '../views/Search.vue'
import Terms from '../views/Terms.vue'
import Posts from '../views/Posts.vue'
import Members from '../views/Members.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
    
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/local/:uid',
    name: 'Item',
    component: Item
  },
  {
    path: '/search/:query?',
    name: 'Search',
    component: Search
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/members',
    name: 'Members',
    component: Members
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
