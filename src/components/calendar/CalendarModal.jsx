import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
// import DateAdapter from '@mui/lab/AdapterDateFns'; 
import moment from 'moment';
import Swal from 'sweetalert2';

// Dark theme
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/uiActions';
import { eventStartAddNew, eventStartUpdating, eventUnsetActive } from '../../actions/eventActions';

const style = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    left: '50%',
    p: 3,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // ':hover': {
    //     p: 10
    // },
};

// const prueba = {
//     ':hover': {
//         border: '1px solid red',
//         borderRadius: '5px'
//         // backgroundColor: 'white'
//     }
// }

const initialState = {
    title: '',
    notes: '',
    start: null,
    end: null
}

const KeepMountedModal = () => {
    
    const [uiError, setuiError] = useState({ 
        error: null,
        msg: ''
    });

    const { error, msg } = uiError;

    // valores del formulario
    const [formValues, setFormValues] = useState( initialState );

    const { title, notes, start, end } = formValues;

    const dispatch = useDispatch();
    const { uid, name } = useSelector(state => state.auth);
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector( state => state.calendar );

    useEffect(() => {
        
        if( activeEvent ){
            setFormValues( activeEvent );
        }else{
            setFormValues( initialState );
        }

    }, [ activeEvent, setFormValues ]);
    
    const handleClose = () => {
        // resetear el form
        setFormValues( initialState );

        //resetear evento activo
        dispatch( eventUnsetActive() ); 

        //cerrar el formulario
        dispatch( uiCloseModal());
    };

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });
    };

    const handleStartDate = newDate => {
        setFormValues({
            ...formValues,
            start: newDate?.toDate() || null
        });
    }

    // console.log(startDate);
    // console.log(now.subtract(24, 'hours').toDate());

    const handleEndDate = newDate => {
        setFormValues({
            ...formValues,
            end: newDate?.toDate() || null
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validar formulario
        const momentStart = moment( start );
        const momentEnd = moment( end );

        const customAlert = Swal.mixin({
            background: '#121212',
            target: '.MuiBox-root',
        });


        if(!momentStart.isValid()){
            customAlert.fire( 'Error!', 'Fecha de inicio no valida', 'error' );
            return;
        }

        if(!momentEnd.isValid()){
            customAlert.fire( 'Error!', 'Fecha de fin no valida', 'error' );
            return;
        }

        if(momentEnd.isSameOrBefore( momentStart )){
            customAlert.fire( 'Error!', 'La Fecha de inicio no puede ser mayor que la de fin', 'error' );
            return;
        }

        if(title.trim().length < 2){
            setuiError({
                error: true,
                msg: 'El titulo no puede tener menos de 2 caracteres'
            });
            return;
        }

        if( activeEvent ){
            dispatch( eventStartUpdating({
                ...formValues,
                user: {
                    uid,
                    name
                }
            }));
        }else{
            dispatch( eventStartAddNew(formValues));
        }

        //resetear el formulario
        setFormValues( initialState );

        //si hay errores quitarlos
        setuiError({ error: false, msg: '' });

        //cerrar el modal
        handleClose();

    }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    // const theme = 'black';

    // console.log(startDate);

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <Modal
                    keepMounted
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography style={{
                            color: 'white'
                        }} id="keep-mounted-modal-title" variant="h6" component="h2">
                            {
                                activeEvent ? 'Actualizar Evento' : 'Nuevo evento'
                            }
                            <hr />
                        </Typography>
                        <form 
                            className="container"
                            onSubmit={ handleSubmit }    
                        >
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <div className="form-group">
                                        <DateTimePicker
                                            renderInput={(params) => <TextField {...params} />}
                                            value={start}
                                            label="Fecha y hora de inicio"
                                            onChange={ handleStartDate }
                                            // inputFormat="yyyy-MM-dd hh:mm a"
                                        />
                                </div>

                                <div className="form-group">

                                        <DateTimePicker
                                            renderInput={(params) => <TextField {...params} />}
                                            value={ end }  
                                            label="Fecha y hora fin"
                                            onChange={ handleEndDate }
                                            minDate={ moment( start ) }
                                            // minDateTime={ startDate } // la fecha que se pase como minima tiene que ser der formato del Adapter usado, en este caso el formato de moment
                                            // onError={console.log}
                                        />
                                </div>
                            </LocalizationProvider>
                            {/* <hr /> */}
                            <div className="form-group">
                                <TextField
                                    id="outlined-basic"
                                    label="Titulo y notas"
                                    variant="outlined"
                                    name="title"
                                    value={ title }
                                    onChange={ handleInputChange }
                                    error={ error }
                                    helperText={ msg }
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Informacion Adicional"
                                    multiline
                                    // maxRows={4}
                                    rows={ 3 }
                                    value={ notes }
                                    name="notes"
                                    onChange={ handleInputChange }
                                    // error={ error }
                                    // helperText= { 'no puede ir vacio' }
                                    // color="warning"
                                    // sx={prueba}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-primary btn-block"
                            >
                                <i className="far fa-save"></i>
                                <span> Guardar</span>
                            </button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}

export default KeepMountedModal;