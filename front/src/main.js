import Router from './components/Router.js';
import NavLink from "./components/NavLink.js";

const routes = [
    {
        id: "home",
        path: '/',
        component: () => import('./views/Home.js')
    },
    {
        id: "posts",
        path: '/posts',
        component: () => import('./views/Posts.js')
    },
    {
        id: "settings",
        path: '/settings',
        component: () => import('./views/Settings.js')
    }
];

export const router = new Router({ outlet: '#app', routes });
for (const route of routes) {
    new NavLink(document.getElementById(route.id), router);
}