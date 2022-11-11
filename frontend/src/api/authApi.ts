import axios from "axios";

// for get user information or user system config from server
export async function getUser() {
    const response = await axios.post("http://localhost:4000/auth/getUser",
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
    );
    return response 
}

// for sending create user request to server
// no need to require jwt token
export async function createUserAPI(jsonData: any) {
    const response = await axios.post("http://localhost:4000/user/create",
        jsonData,);
    return response
}
