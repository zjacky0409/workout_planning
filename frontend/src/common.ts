export interface SideBarObject {
    path: string,
    name: string,
    icon: string
}

export interface PageObject {
    path: string,
    name: string,
    icon: string,
    children?: SideBarObject[]
}