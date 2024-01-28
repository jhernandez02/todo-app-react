export interface IAppContext {
	token: string;
	nombre: string; 
	login: (data: any) => void; 
	logout: () => void;
}