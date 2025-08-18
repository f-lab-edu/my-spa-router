export default class NavLink {
    constructor(element, router) {
        this.element = element;
        this.router = router;
        this.href = element.dataset.href || element.getAttribute('href');

        this.element.addEventListener('click', this.handleClick.bind(this));
    }
    async handleClick(e) {
        e.preventDefault();
        await this.router.navigate(this.href);
    }
}