import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        login_email: '',
        login_password: ''
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        register_name: '',
        register_email: '',
        register_password: '',
        register_password2: ''
    });

    const { register_name, register_email, register_password, register_password2 } = formRegisterValues;

    const { login_email, login_password } = formLoginValues;

    const handleLogin = e => {
        e.preventDefault();
        dispatch( startLogin( login_email, login_password ) );
    }

    const handleRegister = e => {
        e.preventDefault();

        // validar contraseñas
        if( register_password !== register_password2 ){
            return Swal.mixin({
                background: '#fff',
                title: '#000',
                customClass: {
                    title: 'colorLoginSwal',
                    htmlContainer: 'colorLoginSwal',
                }
            }).fire( 'Error!', 'Las contraseñas no coinciden', 'error' );
        }

        dispatch( startRegister({ name: register_name, email: register_email, password: register_password }) );

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form
                        action="/api/auth"
                        onSubmit={ handleLogin }
                    >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="login_email"
                                value={login_email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="login_password"
                                value={login_password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form
                        onSubmit={ handleRegister }
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="register_name"
                                value={ register_name }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="register_email"
                                value={ register_email }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="register_password"
                                value={ register_password }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="register_password2"
                                value={ register_password2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;