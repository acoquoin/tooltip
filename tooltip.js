class tooltip {
    /**
     * constructor
     * @param {HTMLElement} element - The element to bind
     * @param {string} name - The tooltip name, append to the id
     */
    constructor(element, name = '') {
        // get the element
        this.element = element;
        // store the data-title and tim it
        this.title = (this.element.dataset.title || '').trim();
        // if the title isn't set or empty, break
        if (this.title.length === 0) {
            return false;
        }
        // add onmouseenter and onmouseleave listerner
        this.element.onmouseenter = this.show.bind(this);
        this.element.onmouseleave = this.hide.bind(this);
        // get the tooltip element
        this.target = document.getElementById(['tooltip', name].filter(String).join('-'));
        // if not, create it
        if (this.target === null) {
            this.target = document.createElement('div');
            this.target.id = ['tooltip', name].filter(String).join('-');
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
        const top = offset.top < window.innerHeight / 2;
        const left = offset.left < window.innerWidth / 2;
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
