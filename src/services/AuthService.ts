import axios from "axios";
import { SERVER_API } from "../helpers/Config";


export const LoginService = async (data:any)=>{
    const response = await axios.post(`${SERVER_API}/api/v1/login`, data);
    return response;
};