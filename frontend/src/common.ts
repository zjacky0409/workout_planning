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
    role: string[];
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

export interface ExerciseObject {
    id: number,
    name: string,
    details: string,
    type: "Chest"| "Back"| "Arms"| "Legs"| "Core"| "Shoulder" | "None",
    subtype: string,
    created_at: string,
    updated_at: string,
}

export interface StudentObject {
    id: number,
    display_name: string,
    isVerified: boolean,
}

export const Body_Part = ["Chest", "Back", "Arms", "Legs", "Core", "Shoulder"]

export const Body_Part_Subtype = {
    "None": [],
    'Chest': ["Upper", "Lower", "Middle", "Inner", "Outter"],
    'Back': ["Lat", "Upper", "Trap"],
    'Shoulder': ["Rear Delt", "Side Delt", "Front Delt"],
    "Arms": ["Former", "Tricept", "Bicept"],
    "Legs": ["Quad", "Harmstring", "Hip"],
    "Core": ["Upper", "Lower","Full"]
}