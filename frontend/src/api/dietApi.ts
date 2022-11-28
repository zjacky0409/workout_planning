import axios from "axios";


// for sending create user request to server
// no need to require jwt toke

export interface createFoodJson {
    name: string;
    carbs: number;
    protein: number;
    fat: number
}
export async function createFoodAPI(jsonData: createFoodJson) {
    const response = await axios.post("http://localhost:4000/food/create",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}


export interface updateFoodJson {
    id: number
    name: string;
    carbs: number;
    protein: number;
    fat: number
}
export async function updateFoodAPI(jsonData: updateFoodJson) {
    const response = await axios.post("http://localhost:4000/food/update",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

export async function getFoodListAPI() {
    const response = await axios.get("http://localhost:4000/food/get",
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
    return response
}






