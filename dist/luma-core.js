"use strict";
const components = {};
const routes = {};
function defineComponent(name, options) {
    components[name] = options;
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
        static get observedAttributes() {
            return Object.keys(options.props || {});
        }
        connectedCallback() {
            this.render();
        }
        attributeChangedCallback() {
            this.render();
        }
        render() {
            let template = options.template;
            Object.keys(options.props || {}).forEach((prop) => {
                const value = this.getAttribute(prop) || options.props[prop];
                template = template.replaceAll(`{{ ${prop} }}`, value);
            });
            this.shadowRoot.innerHTML = template;
            this.applyStyles();
        }
        applyStyles() {
            if (options.styles) {
                const style = document.createElement("style");
                style.textContent = options.styles;
                this.shadowRoot.appendChild(style);
            }
        }
    }
    customElements.define(name, CustomElement);
}
function defineRoute(path, component) {
    routes[path] = component;
}
function navigateTo(path, event) {
    if (event)
        event.preventDefault();
    const matched = matchRoute(path);
    if (matched) {
        history.pushState({ path }, "", path);
        document.getElementById("app").innerHTML = matched.component(matched.params);
    }
    else {
        document.getElementById("app").innerHTML =
            "<h1>404 - Seite nicht gefunden</h1>";
    }
}
function matchRoute(path) {
    for (const route in routes) {
        const paramMatch = route.match(/:([^\\/]+)/);
        if (paramMatch) {
            const regex = new RegExp(`^${route.replace(/:[^\\/]+/, "([^\\/]+)")}$`);
            const match = path.match(regex);
            if (match) {
                return {
                    component: routes[route],
                    params: { [paramMatch[1]]: match[1] },
                };
            }
        }
        else if (route === path) {
            return { component: routes[route] };
        }
    }
    return null;
}
window.addEventListener("popstate", (event) => {
    if (event.state?.path)
        navigateTo(event.state.path);
});
