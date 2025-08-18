export default function createRouter({ rootSelector = '#app', initialRoutes = [] } = {}) {
    let routes = initialRoutes;
    const root = () => document.querySelector(rootSelector);
    const resolve = (path) => routes.find(r => r.path === path) || null;

    const render = async (path) => {
        const match = resolve(path);
        if (!match) { root().innerHTML = '<h1>404</h1>'; return; }
        const html = await match.view.render();
        root().innerHTML = html;
        if (typeof match.view.mounted === 'function') match.view.mounted();
    };

    const navigate = async (path) => {
        if (location.pathname !== path) history.pushState({}, '', path);
        await render(path);
    };

    const setRoutes = (r) => { routes = r; };

    // 브라우저 이동 처리
    window.addEventListener('popstate', () => render(location.pathname));
    document.addEventListener('DOMContentLoaded', () => render(location.pathname));

    return { navigate, render, resolve, setRoutes };
}