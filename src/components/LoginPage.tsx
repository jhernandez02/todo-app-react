import { useState, useContext } from "react";
import { IAppContext } from '../types/AppType';
import { AppContext } from "../contexts/AppContext";
import { LoginService } from "../services/AuthService";
import Swal from "sweetalert2";

const initData = {
	user: "",
	password: "",
};

function LoginPage(){
	const { login } = useContext(AppContext) as IAppContext;
	const [credenciales, setCredenciales] = useState(initData);

	const handleChange = (e:any)=>{
    	const { name, value } = e.target;
		const nData:any = {...credenciales, [name]:value};
    	setCredenciales(nData);
	};

	const handleSubmit = async (e:any)=>{
    	e.preventDefault();
    	try {
        	const { data } = await LoginService(credenciales);
        	login(data);
    	} catch (error) {
        	Swal.fire(
            	'Error',
            	'Error inesperado',
            	'error'
        	);
    	}
	}

	return (
    	<section className="h-100">
        	<div className="container h-100">
            	<div className="row justify-content-sm-center h-100">
                	<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                    	<div className="text-center mt-5 mb-3">
                        	<img src="https://www.grupocobra.com//wp-content/uploads/2016/06/logo_h100.png" alt="logo" width="220" />
                    	</div>
                    	<div className="card shadow-lg">
                        	<div className="card-body p-5">
                            	<h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                            	<form onSubmit={handleSubmit} autoComplete="off">
                                	<div className="mb-3">
                                    	<label className="mb-2 text-muted" htmlFor="email">Nombre</label>
                                    	<input id="email" type="email" onChange={handleChange} className="form-control" name="user" required autoFocus />
                                	</div>

									<div className="mb-3">
                                    	<label className="mb-2 text-muted" htmlFor="password">Contraseña</label>
                                    	<input id="password" type="password" onChange={handleChange} className="form-control" name="password" required />
                                	</div>

                                	<div className="d-flex align-items-center">
                                    	<div className="form-check">
                                        	<input type="checkbox" name="remember" id="remember" className="form-check-input" />
                                        	<label htmlFor="remember" className="form-check-label">Recordarme</label>
                                    	</div>
                                    	<button type="submit" className="btn btn-primary ms-auto">
                                        	Ingresar
                                    	</button>
                                	</div>
                            	</form>
                        	</div>
                    	</div>
                    	<div className="text-center mt-5 text-muted">
                        	Copyright &copy; 2023 &mdash; Cobra Perú
                    	</div>
                	</div>
            	</div>
        	</div>
    	</section>
	);
}

export default LoginPage;
