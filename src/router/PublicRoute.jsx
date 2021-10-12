import { Redirect, Route } from "react-router";


const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={ props => (
            !isAuthenticated ? 
                <Component { ...props } />
            :
                <Redirect to='/' />
        ) }
    />
)

export default PublicRoute;