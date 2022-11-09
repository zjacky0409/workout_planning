// To define different interface that are used in different file

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

export interface NavObject {
    name: string;
    path: string;
    icon: string;
    children: PageObject[];
}