import {LitElement, css, html} from "/js/lit.min.js";
import { store } from "/store.js";

customElements.define("tool-header", class extends LitElement {
    static properties = {
        selectedSystem: { type: String, state: true },
        systems: { type: Array, state: true },
    };
  
    constructor() {
        super();

        this.systemChangedHandler = () => {
            this.selectedSystem = store.selectedSystem;
            this.systems = store.systems;
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

    render(){
        return html`
        <header>
            <hgroup>
                <h1>${this.selectedSystem || "Unifrog"}</h1>
                <p>Select a system </p>
            </hgroup>

            </header>
            <style>
                @import url("/css/pico.css");
            </style>
        `;
    }
});