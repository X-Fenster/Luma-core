// 📌 Komponenten-Registry
const components: Record<string, ComponentOptions> = {};

// 📌 Typen für Komponenten-Definition
interface ComponentOptions {
  template: string;
  styles?: string;
  props?: Record<string, string>;
}

// 📌 Typen für das Routing
interface RouteDefinition {
  component: (params?: Record<string, string>) => string;
  params?: Record<string, string>;
}

const routes: Record<string, (params?: Record<string, string>) => string> = {};

// 📌 Komponente definieren
export function defineComponent(name: string, options: ComponentOptions): void {
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

      // 🔹 Ersetze {{ prop }} durch Werte aus Attributen oder Defaults
      Object.keys(options.props || {}).forEach((prop) => {
        const value = this.getAttribute(prop) || options.props![prop];
        template = template.replaceAll(`{{ ${prop} }}`, value);
      });

      this.shadowRoot!.innerHTML = template;
      this.applyStyles();
    }

    applyStyles() {
      if (options.styles) {
        const style = document.createElement("style");
        style.textContent = options.styles;
        this.shadowRoot!.appendChild(style);
      }
    }
  }

  customElements.define(name, CustomElement);
}

// 📌 Routing-System mit History API
export function defineRoute(
  path: string,
  component: (params?: Record<string, string>) => string
): void {
  routes[path] = component;
}

export function navigateTo(path: string, event?: Event) {
  if (event) event.preventDefault();

  const matched = matchRoute(path);
  if (matched) {
    history.pushState({ path }, "", path);
    document.getElementById("app")!.innerHTML = matched.component(
      matched.params
    );
  } else {
    document.getElementById("app")!.innerHTML =
      "<h1>404 - Seite nicht gefunden</h1>";
  }
}

// 🔹 Route mit dynamischen Parametern erkennen
function matchRoute(path: string): RouteDefinition | null {
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
    } else if (route === path) {
      return { component: routes[route] };
    }
  }
  return null;
}

// 🔹 Event für Zurück-Navigation
window.addEventListener("popstate", (event) => {
  if (event.state?.path) navigateTo(event.state.path);
});
