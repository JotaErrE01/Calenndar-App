import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [ dispatch ]); //el start checking no se pone como dependencia porque se encuentra fuera del componente del approuter

    //No quiero mostrar nada hasta que se termine el checkeo
    if(checking){
        return <h1>Loading...</h1>
    }

    return (
        <Router>
            <Switch>
                <PublicRoute exact path='/login' component={ LoginScreen } isAuthenticated={!!uid} />
                <PrivateRoute exact path='/' component={ CalendarScreen } isAuthenticated={!!uid}/>
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default AppRouter;