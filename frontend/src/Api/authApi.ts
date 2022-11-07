import axios from "axios";

// A mock function to mimic making an async request for data
export async function getUser() {

    const response = await axios.post("http://localhost:4000/auth/getUser",
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
    );
    return response 
}

export async function createUserAPI(jsonData: any) {

    const response = await axios.post("http://localhost:4000/user/create",
        jsonData,);
    return response
}