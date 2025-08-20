export default class Router {
    constructor({ outlet, routes}) {
        this.routes = routes;
        this.currentPath = '';
        this.container = typeof outlet === 'string' ? document.querySelector(outlet) : outlet;

        document.addEventListener('popstate', async () => {
            await this.#render(location.pathname);
        });

        this.#render(location.pathname);
    }

    async #render(path) {
        const match = this.routes.find(r => r.path === path);

        if (match) {
            const componentModule = await match.component();
            const ComponentClass = componentModule.default || componentModule;

            const html = await ComponentClass.render();
            this.container.innerHTML = html;
        } else {
            this.container.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    async navigate(path) {
        if (this.currentPath !== path) {
            window.history.pushState({}, '', path);
            await this.#render(path);
        }
    }
}