import { LitElement, css, html } from "/js/lit.min.js";
import { store } from "/store.js";

customElements.define("system-selector", class extends LitElement {
    static styles = css`
    `;

    static properties = {
        systems: { type: Array, state: true },
        selectedSystem: { type: String, state: true },
        error: { type: Boolean, state: true }
    };

    constructor() {
        super();
        this.systems = store.systems;
        this.selectedSystem = "";
        this.error = false;
    
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

    render() {
        if (this.error || !this.systems) {
            return html`
                <span id="error">
                    <div>Malformed <strong>systems.json</strong> found.</div>
                    <div>Make sure a correct <strong>systems.json</strong> is present in the same directory.</div>
                </span>
                
                <style>
                    @import url("/css/pico.css");
                </style>
            `;
        }

        return html`
            <div role="group">
                ${Object.keys(this.systems)?.map(systemName => html`
                        <button @click="${() =>  store.selectedSystem = systemName}"
                            style="${systemName === this.selectedSystem ? "opacity: 0.5" : "opacity: 1"}">
                            ${systemName}
                        </button>
                    `
                )}
            </div>

            <style>
                @import url("/css/pico.css");
            </style>
        `;
    }
});
