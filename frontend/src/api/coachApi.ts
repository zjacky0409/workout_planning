import axios from "axios";

export interface updateStudentJson {
    id: number;
    display_name: string;
    isVerified: boolean;
}
export async function updateStudentAPI(jsonData: updateStudentJson) {
    const response = await axios.post("http://localhost:4000/coach/update_student",
        jsonData, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
    return response
}

export async function getStudentListAPI() {
    const response = await axios.post("http://localhost:4000/coach/get_student",
        {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
    return response
}






