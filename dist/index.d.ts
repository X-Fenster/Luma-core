declare const components: Record<string, ComponentOptions>;
interface ComponentOptions {
    template: string;
    styles?: string;
    props?: Record<string, string>;
}
interface RouteDefinition {
    component: (params?: Record<string, string>) => string;
    params?: Record<string, string>;
}
declare const routes: Record<string, (params?: Record<string, string>) => string>;
declare function defineComponent(name: string, options: ComponentOptions): void;
declare function defineRoute(path: string, component: (params?: Record<string, string>) => string): void;
declare function navigateTo(path: string, event?: Event): void;
declare function matchRoute(path: string): RouteDefinition | null;
