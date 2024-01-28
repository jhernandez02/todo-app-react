import { Badge } from "react-bootstrap";

const data:any = {
    0: {
        style: "danger",
        text: "Pendiente",
    },
    1: {
        style: "primary",
        text: "Completado",
    }
};

function StateComponent(props:any){
    const { value } = props;
    
    return <Badge bg={data[value].style}>{data[value].text}</Badge>;
}

export default StateComponent;