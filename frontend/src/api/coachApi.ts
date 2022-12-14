import axios from "axios";

// for update student personal information by coach
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

// to get all students of a coach
export async function getStudentListAPI() {
    const response = await axios.post("http://localhost:4000/coach/get_student",
        {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
    return response
}






