import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/eventActions";

const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {

        // TODO: elmininar de la base de datos
        dispatch( eventDeleted() );

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