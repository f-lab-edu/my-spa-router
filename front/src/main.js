import Home from './views/Home.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

document.body.addEventListener('click', async e => {
    if (e.target.matches('[data-link]')) {
        // 동작 멈춤
        e.preventDefault();
        let path = e.target.href;
        history.pushState(null, null, path);
        await router();
    }
})

window.addEventListener('popstate', async () => {
    await router();
});

async function router(){
    const routes = [
        { path: '/', view: Home },
        { path: '/posts', view: Posts },
        { path: '/settings', view: Settings },
    ]

    const match = routes.find(route => route.path === location.pathname);
    const app = document.querySelector('#app');
    if (!match) {
        app.innerHTML = '<h1>404 Error</h1>';
        return;
    }

    const html = await match.view.render();
    app.innerHTML = html;
}

// 초기 진입
await router();
