import axios from "axios";

// for creating exericse
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

// for updating exericse
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

// for deleting an exercise
// exerciseId is the id of an exercise
export async function deleteExerciseAPI(exerciseId: number) {
    const response = await axios.post("http://localhost:4000/exercise/delete",
        { exerciseId: exerciseId }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

// for getting all exericses
export interface getExerciseJson {
    type: string; // 'Chest', 'Back', 'Arms', 'Legs', 'Core', 'Shoulder'
    subtype: string;
    // subtype'value must based on the type's value
    // Chest: 'Upper', 'Lower', 'Middle', 'Inner', 'Outter'
    // Back: 'Lat', 'Upper', 'Trap'
    // Shoulder: 'Rear Delt', 'Side Delt', 'Front Delt'
    // Arms: 'Former', 'Tricept', 'Bicept'
    // Legs: 'Quad', 'Harmstring', 'Hip'
    // Core: 'Upper', 'Lower', 'Full'
}
export async function getExerciseAPI(jsonData: getExerciseJson) {
    const response = await axios.post("http://localhost:4000/exercise/getExercise",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}