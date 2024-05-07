import LitStore from '/js/lit-store.js';

class Store extends LitStore {
    constructor() {
        super();
        this.data = { 
            selectedSystem: "",
            systems: []
        };
    }

    get selectedSystem() {
        return this.data.selectedSystem;
    }

    set selectedSystem(system) {
        this.data.selectedSystem = system;
        this.notify();  // Notify subscribers about the change
    }

    get systems() {
        return this.data.systems;
    }

    set systems(systems) {
        this.data.systems = systems;
        this.notify();
    }
}

export const store = new Store();