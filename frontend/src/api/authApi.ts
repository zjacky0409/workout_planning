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

export interface createUserJson {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: number;
    emailAddress: string;
    password: string;
    dateOfBirth: string;
    confirmPassword: string;
    age: number;
    role_type: string;
    coach_name: string;
}
export async function createUserAPI(jsonData: createUserJson) {
    const response = await axios.post("http://localhost:4000/user/create",
        jsonData,);
    return response
}

// check the user email address exist or not
export interface checkEmailExistJson {
    emailAddress: string
}
export async function checkEmailExistAPI(jsonData: checkEmailExistJson) {
    const response = await axios.post("http://localhost:4000/user/check_email_duplicate",
        jsonData,);
    return response
}


// check the username exist or not
export interface checkUsernameExistJson {
    username: string
}

export async function checkUsernameExistAPI(jsonData: checkUsernameExistJson) {
    const response = await axios.post("http://localhost:4000/user/check_username_duplicate",
        jsonData,);
    return response
}





