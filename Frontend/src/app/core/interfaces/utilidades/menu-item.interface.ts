export interface MenuItem {
    level: number;
    title: string;
    icon?: string;
    open?: boolean;
    routerLink?: string;
    children?: MenuItem[];
    accesoRol?: number[];
}