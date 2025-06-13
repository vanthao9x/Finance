import axios from "axios";
import { handleError } from "../components/Helper/ErrorHandler";
import { UserProfileToken } from "../components/Model/User";

const api = "http://localhost:5169/api";
export const loginAPI = async (username : string, password : string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}/Account/login`, {username, password});
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const registerAPI = async (email : string, username : string, password : string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}/Account/register`, {email, username, password});
        return data;
    } catch (error) {
        handleError(error);
    }
};