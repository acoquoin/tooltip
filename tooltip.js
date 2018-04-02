class Tooltip {
    /**
     * constructor
     * @param {HTMLElement} element - The element to bind
     * @param {string} title - The tooltip callback
     * @param {string} selector - The tooltip selector, append to the id
     */
    constructor(element, title, selector = null) {
        // get the element
        this.element = element;
        // store the data-title or the title callback
        this.title = 'function' === typeof title ? title() : this.element.dataset.title;
        // if the title isn't set or empty, break
        if (this.title.length === 0) {
            return false;
        }
        // add onmouseenter and onmouseleave listerner
        this.element.onmouseenter = this.show.bind(this);
        this.element.onmouseleave = this.hide.bind(this);
        // get the tooltip element
        selector = ['tooltip', selector].filter(String).join('-');
        this.target = document.getElementById(selector);
        // if not, create it
        if (this.target === null) {
            this.target = document.createElement('div');
            this.target.id = selector;
            document.body.appendChild(this.target);
        }
    }
    /**
     * show the tooltip
     */
    show() {
        // set the title into the tooltip
        this.target.innerHTML = this.title;
        // get the element offset relative to the client window
        const offset = this.element.getBoundingClientRect();
        // check the top and left position
        let top = offset.top < window.innerHeight / 2,
            left = offset.left < window.innerWidth / 2;
        // add some classes
        this.target.classList.add(top ? 'top' : 'bottom');
        this.target.classList.add(left ? 'left' : 'right');
        // set positions
        this.target.style.top = (top ? offset.bottom : offset.top - this.target.offsetHeight) + 'px';
        this.target.style.left = (left ? offset.left : offset.right - this.target.offsetWidth) + 'px';
        // display
        this.target.style.opacity = 1;
    }
    /**
     * hide the tooltip
     */
    hide() {
        // remove classes
        this.target.removeAttribute('class');
        this.target.removeAttribute('style');
    }
}
