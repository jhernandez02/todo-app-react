import { useContext } from "react";
import { IAppContext } from "../types/AppType";
import { AppContext } from "../contexts/AppContext";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function HeaderComponent(){
    
	const { nombre, logout } = useContext(AppContext) as IAppContext;

	const handleLogout = ()=>{
    	logout();
	};

	return(
    	<Navbar bg="light" expand="lg">
        	<Container>
            	<span className="navbar-brand mb-0 h1">TodoApp</span>
            	<Navbar.Toggle aria-controls="navbarScroll" />
            	<Navbar.Collapse id="navbarScroll">
                	<Nav
                    	className="me-auto my-2 my-lg-0"
                    	style={{ maxHeight: '100px' }}
                    	navbarScroll
                	>
                    	<a className="nav-link" href="/">Inicio</a>
                	</Nav>
                	<NavDropdown align="end" title={nombre} id="navbarScrollingDropdown">
                    	<NavDropdown.Item href="#">Cuenta</NavDropdown.Item>
                    	<NavDropdown.Item href="#">Configuración</NavDropdown.Item>
                    	<NavDropdown.Divider />
                    	<NavDropdown.Item onClick={handleLogout}>Salir</NavDropdown.Item>
                	</NavDropdown>
            	</Navbar.Collapse>
        	</Container>
    	</Navbar>
	);
}

export default HeaderComponent;