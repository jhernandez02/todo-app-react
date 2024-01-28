import { useState, useEffect } from "react";
import { ITask } from "../types/TaskType";
import { 
	allTaskService, 
	createTaskService, 
	showTaskService, 
	updateTaskService,
	deleteTaskService
} from "../services/TaskService";
import HeaderComponent from "./HeaderComponent";
import StateComponent from "./StateComponent";
import { Modal, Spinner, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const initData:ITask = {
    id: 0,
    title: "",
    description: "",
    completed: 0,
};
 
function TaskPage(){

	const [tituloModal, setTituloModal] = useState("Nueva Tarea");
    const [lista, setLista] = useState([]);
    const [datos, setDatos] = useState(initData);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
		setShowModal(false);
		setTituloModal('Nueva Tarea');
        setDatos(initData);
        
    };

    const listar = async () => {
        const res = await allTaskService();
        setLista(res.data);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        let nDatos = {...datos, [name]: value};
        setDatos(nDatos);
    }

    const handleData = async (id: number) => {
        setTituloModal("Editar Tarea");
        const res = await showTaskService(id);
        setDatos(res.data);
        handleShowModal();
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(datos.id){
            await updateTaskService(datos.id, datos);
        }else{
            await createTaskService(datos);
        }
        await listar();
        handleCloseModal();
    }

    const handleDelete = (task:ITask) => {
		Swal.fire({
            title: `¿Estás seguro de eliminar la tarea "${task.title}" de la lista?`,
            text: "¡Esta acción no se podrá revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "¡Sí, eliminar la tarea!",
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteTaskService(task.id);
				listar();
                Swal.fire({
                    icon: 'success',
                    text: "¡Tarea eliminada!",
                    title: `Se ha eliminado la tarea "${task.title}" de la lista`,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                });
            }
        });
    }

    useEffect(() =>{
        listar();
    },[]);


	return(
    	<>
			<HeaderComponent />
			<div className="container mt-3">
				<div className="d-flex justify-content-between">
					<h1>Tareas</h1>
					<span>
						<button onClick={handleShowModal} className="btn btn-primary">Nuevo</button>
					</span>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th>Título</th>
							<th>Descripción</th>
							<th>Estado</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
					{lista.length>0 ? (
						lista.map((item:any)=>(
							<tr key={item.id}>
								<td>{item.title}</td>
								<td>{item.description}</td>
								<td>
									<StateComponent value={item.completed} />
								</td>
								<td>
									<button onClick={()=>handleData(item.id)} className="btn btn-info me-2 btn-sm" title="Editar"><i className="bi bi-pencil-square"></i></button> 
									<button onClick={()=>handleDelete(item)} className="btn btn-danger btn-sm" title="Eliminar"><i className="bi bi-trash-fill"></i></button> 
								</td>
							</tr>
						))
					):(
						<tr>
							<td colSpan={4} className="text-center">
								<span className="me-2">Cargando...</span> 
								<Spinner animation="border" variant="secondary" size="sm" />
							</td>
						</tr>
					)}
					</tbody>
				</table>
				<Modal show={showModal} onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>{tituloModal}</Modal.Title>
					</Modal.Header>
					<form onSubmit={handleSubmit}>
						<Modal.Body>
							<div className="mb-3">
								<label className="form-label">Título</label>
								<input type="text" onChange={handleChange} className="form-control" name="title" value={datos.title} required />
							</div>
							<div className="mb-3">
								<label className="form-label">Descripción</label>
								<input type="text" onChange={handleChange} className="form-control" name="description" value={datos.description} required />
							</div>
							<div className="mb-3">
								<label className="form-label">Estado</label>
								<select onChange={handleChange} className="form-select" name="completed" value={datos.completed} required >
									<option value="">Seleccione una opción</option>
									<option value="0">Pendiente</option>
									<option value="1">Completado</option>
								</select>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseModal}>
								Cancelar
							</Button>
							<Button type="submit" variant="primary">
								Guardar
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			</div>
		</>
	);
}

export default TaskPage;