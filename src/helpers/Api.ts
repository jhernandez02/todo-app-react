import axios from 'axios';
import { SERVER_API } from './Config';

export const Api = ()=>{
	const token = localStorage.token;
	const apiAxios = axios.create({
    	baseURL: SERVER_API,
    	headers: {
        	Accept: 'application/json',
        	"Content-Type": 'application/json',
        	Authorization: `Bearer ${token}`
    	}
	});
	return apiAxios;
};