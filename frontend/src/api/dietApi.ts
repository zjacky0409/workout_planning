import axios from "axios";


// for creating food
export interface createFoodJson {
    name: string;
    carbs: number;
    protein: number;
    fat: number
    comment: string;
    recommendation: string;
    // base64string: string; // ready for files/photos/videos
}
export async function createFoodAPI(jsonData: createFoodJson) {
    const response = await axios.post("http://localhost:4000/food/create",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

// for updating food
export interface updateFoodJson {
    id: number
    name: string;
    carbs: number;
    protein: number;
    fat: number;
    comment: string;
    recommendation: string;
    // base64string: string;
}
export async function updateFoodAPI(jsonData: updateFoodJson) {
    const response = await axios.post("http://localhost:4000/food/update",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

// for delete food
// toBeDelete: the id of the food
export async function deleteFoodAPI(toBeDelete: number) {
    const response = await axios.post("http://localhost:4000/food/delete",
        { toBeDelete: toBeDelete }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

// for getting the food list
export async function getFoodListAPI() {
    const response = await axios.get("http://localhost:4000/food/get",
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
    return response
}






