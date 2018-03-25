class tooltip {
    constructor(element) {
        this.element = element;
        this.init();
        this.setListeners();
    }
    init() {
        this.title = (this.element.title || this.element.getAttribute('title') || '').trim();
        if (this.title.length === 0) {
            return false;
        }
        this.target = document.getElementById('tooltip');
        if (this.target === null) {
            this.target = document.createElement('div');
            this.target.id = 'tooltip';
            document.body.appendChild(this.target);
        }
    }
    toggle(state = true) {
        if (state === true) {
            this.element.removeAttribute('title');
            this.target.innerHTML = this.title;
            this.setPosition();
            this.target.style.opacity = 1;
        } else {
            this.target.style.opacity = 0;
            this.element.setAttribute('title', this.title);
            this.target.removeAttribute('class');
            this.target.removeAttribute('style');
        }
    }
    setPosition() {
        var offset = this.element.getBoundingClientRect();
        var of = {top: 0, left: 0};
        of.top = offset.top + (window.pageYOffset || document.documentElement.scrollTop);
        of.left = offset.left + (window.pageXOffset || document.documentElement.scrollLeft);

        var left = of.left + (this.element.offsetWidth / 2) - (this.target.offsetWidth / 2);
        var top = of.top - this.target.offsetHeight - 10;

        if (left < 0) {
            left = of.left + (this.element.offsetWidth / 2) - 15;
            this.target.classList.add('left');
        }
        if (left + this.target.offsetWidth > window.innerWidth) {
            left = of.left - this.target.offsetWidth + (this.element.offsetWidth / 2) + 20;
            this.target.classList.add('right');
        }
        if (top < 0) {
            top = of.top + this.element.offsetHeight + 5;
            this.target.classList.add('top');
        }
        this.target.style.left = left + 'px';
        this.target.style.top = top + 'px';
    }
    setListeners() {
        this.element.onmouseenter = this.toggle.bind(this, true);
        this.element.onmouseleave = this.toggle.bind(this, false);
        this.element.onclick = this.toggle.bind(this, false);
    }
}
