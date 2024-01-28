import React, { createContext, useState, useEffect } from 'react';
import { IAppContext } from '../types/AppType';

const AppContext = createContext<IAppContext | null>(null);

const { Provider } = AppContext;

function AppProvider({children}:React.PropsWithChildren<{}>){
	const [nombre, setNombre] = useState(localStorage.nombre);
    const [token, setToken] = useState(localStorage.token);

	function login(data:any){
    	const { user, token } = data;
        setNombre(user.name);
    	setToken(token);
        localStorage.nombre = user.name;
    	localStorage.token = token;
	}

	function logout(){
        setNombre(null);
    	setToken(null);
        localStorage.removeItem('nombre');
    	localStorage.removeItem('token');
	}

	useEffect(()=>{
    	if(token){
        	try {
            	setNombre(nombre);
        	} catch (error) {
            	console.log('Token invalido');
        	}
    	}
	}, []);

	return(
    	<Provider value={{token, nombre, login, logout}}>
        	{children}
    	</Provider>
	);
}

export { AppProvider, AppContext };