import createRouter from './createRouter.js';
import NavLink from './components/NavLink.js';
import Home from './views/Home.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

const router = createRouter({
    initialRoutes: [
        { path: '/', view: Home },
        { path: '/posts', view: Posts },
        { path: '/settings', view: Settings },
    ],
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#main-nav a[href]').forEach(el => new NavLink(el, router));
});