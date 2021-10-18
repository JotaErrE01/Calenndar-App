import { useDispatch } from "react-redux";
import { EventStartDelete } from "../../actions/eventActions";

const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        
        dispatch( EventStartDelete() );

    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
        >
            <i className='fas fa-trash'></i> Borrar Evento
        </button>
    )
}

export default DeleteEventFab;