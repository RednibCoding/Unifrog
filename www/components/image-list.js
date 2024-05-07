import {LitElement, css, html} from "/js/lit.min.js";
import { store } from "/store.js";

customElements.define("image-list", class extends LitElement {
    static properties = {
    };

    constructor() {
        super();

        this.systemChangedHandler = () => {
            this.selectedSystem = store.selectedSystem;
        };
    }

    connectedCallback() {
        super.connectedCallback();
        store.subscribe(this.systemChangedHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        store.unsubscribe(this.systemChangedHandler);
    }

    template = html`
        

        <style>
            @import url("/css/pico.css");
        </style>
    `;

    static styles = css`
    `;

    render(){return this.template}
});