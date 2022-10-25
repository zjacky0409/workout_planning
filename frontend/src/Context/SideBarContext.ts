import { createContext } from "react";


interface SideBarElement {
    path: string,
    name: string,
    icon: string
  }


  interface SideBarStructure {
    sideContent: SideBarElement[];
    setSideContent: Function
}


export const SideBarContext = createContext<SideBarStructure | null>(null);
