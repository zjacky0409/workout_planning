import { createContext } from "react";
interface SideBarStructure {
    name: string;
    path: string
}


export const SideBarContext = createContext<any>(null);
