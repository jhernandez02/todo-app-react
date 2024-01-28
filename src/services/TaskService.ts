import { SERVER_API } from "../helpers/Config";
import { Api } from "../helpers/Api";
import { ITask } from "../types/TaskType";

export const allTaskService = async ()=>{
    const response = await Api().get(`${SERVER_API}/api/v1/tasks`);
    return response;
};

export const createTaskService = async (data:ITask)=>{
    const response = await Api().post(`${SERVER_API}/api/v1/tasks`, data);
    return response;
};

export const showTaskService = async (id:number)=>{
    const response = await Api().get(`${SERVER_API}/api/v1/tasks/${id}`);
    return response;
};

export const updateTaskService = async (id:number, data:ITask)=>{
    const response = await Api().put(`${SERVER_API}/api/v1/tasks/${id}`, data);
    return response;
};

export const deleteTaskService = async (id:number)=>{
    const response = await Api().delete(`${SERVER_API}/api/v1/tasks/${id}`);
    return response;
};