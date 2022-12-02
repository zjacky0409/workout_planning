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

export interface FoodObject {
    id: number,
    name: string,
    carbs: number,
    protein: number,
    fat: number,
    created_at: string,
    updated_at: string,
    comment: string;
    recommendation: string;
}