import axios from "axios";


export interface createExerciseJson {
    name: string;
    type: string;
    subtype: string;
    details: string;
}
export async function createExerciseAPI(jsonData: createExerciseJson) {
    const response = await axios.post("http://localhost:4000/exercise/create",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}


export interface updateExerciseJson {
    id: number;
    name: string;
    type: string;
    subtype: string;
    details: string;
}
export async function updateExerciseAPI(jsonData: updateExerciseJson) {
    const response = await axios.post("http://localhost:4000/exercise/update",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

export async function deleteExerciseAPI(exerciseId: number) {
    const response = await axios.post("http://localhost:4000/exercise/delete",
       {exerciseId: exerciseId}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

export async function getExerciseAPI() {
    const response = await axios.get("http://localhost:4000/exercise",
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}