import {LitElement, html} from "/js/lit.min.js";
import { store } from "/store.js";

customElements.define("main-app", class extends LitElement {
    static properties = {
        selectedSystem: { type: String, state: true },
        systems: { type: Array, state: true },
        error: { type: Boolean, state: true }
    };

    constructor() {
        super();

        this.loadSystems();

        this.systemChangedHandler = () => {
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

    async loadSystems() {
        try {
            const response = await fetch("/systems.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const systems = await response.json();

            store.systems = systems;  // Update the store's systems
            store.selectedSystem = Object.keys(store.systems)?.[0];

            if (!store.systems || !store.selectedSystem) {
                this.error = true;
                return;
            }

            this.error = false;
        } catch (error) {
            this.error = true;
            console.error("Failed to load systems:", error);
        }
    }
    

    render(){
        if (!this.error) {
            return html`
                <div class="container" style="margin-top: 12px">
                    <tool-header></tool-header>
                    <system-selector></system-selector>
                </div>
                
                <style>
                    @import url("/css/pico.css");
                </style>
            `;
        }

        return html`
            <div class="container" style="margin-top: 12px">
                <div>Failed to load <strong>systems.json</strong>.</div>
                <div>Make sure a <strong>systems.json</strong> is present in the same directory.</div>
            </div>
            
            <style>
                @import url("/css/pico.css");
            </style>
        `;
    }
});