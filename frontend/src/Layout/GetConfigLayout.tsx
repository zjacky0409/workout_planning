import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
import { selectCount } from "../store/counterSlice";
import { selectAuth, selectUserId, clearAuthentication, setUsername, setUserId } from "../store/authSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

interface PropsType {
    children: JSX.Element;
}

const GetConfigLayout = (props: PropsType) => {
    const auth = useAppSelector(selectAuth);
    const userId = useAppSelector(selectUserId)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchData() {

            const loginInPromise = new Promise((resolve, reject) => {
                axios.post("http://localhost:4000/auth/getUser", {}, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }).then(function (response) {
                    return resolve(response)
                })
                    .catch(function (error) {
                        return reject(error)
                    });;
            })
            let result: any
            try {
                result = await loginInPromise
                console.log('result == ', result)
                dispatch(setUsername(result.data.username))
                dispatch(setUserId(result.data.userId))
                
            } catch (e) {
                console.log(e)
                dispatch(clearAuthentication())
            }

        }

        if (auth && userId < 0) {
            fetchData();
        }
    }, [auth, navigate]);

    return <>{props.children}</>;
}
export default GetConfigLayout;
