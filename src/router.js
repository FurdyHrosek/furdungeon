import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Slave from './components/Slave.vue';
import Obligations from './components/Obligations.vue';
import Conflicts from './components/Conflicts.vue';
import Duels from './components/Duels.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { fireauth } from './firebase.js';
import { removeOverlay } from './helpers/Modal.js';

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/',
    },
    {
        name: 'Login',
        component: Login,
        path: '/login',
    },
    {
        name: 'Slave',
        component: Slave,
        path: '/slave',
    },
    {
        name: 'Obligations',
        component: Obligations,
        path: '/obligations',
    },
    {
        name: 'Conflicts',
        component: Conflicts,
        path: '/conflicts',
    },
    {
        name: 'Duels',
        component: Duels,
        path: '/duels',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login' && fireauth.currentUser) {
        next(false);
    } else {
        next();
    }
});

/**
 * Init routing to unique paths (non-current).
 */
router.afterEach((to, from) => {
    if (to.name !== from.name) {
        removeOverlay();
    }
});


export default router;