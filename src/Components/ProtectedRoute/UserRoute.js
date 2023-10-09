import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuthContext } from '../../Context/UserContext/UserContext';
import Loader from '../Loader/Loader';

const UserRoute = ({ children }) => {
    const { user, loadingUserProtected } = useContext(UserAuthContext);
    let location = useLocation();
    // if (!user) return <Backdrop
    //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //     open={user}
    // >
    //     <CircularProgress color="inherit" />
    // </Backdrop>
    // console.log("load", loadingUserProtected);
    if (loadingUserProtected) {
        return <Loader />
    }
    else {

        if (!user) {
            if (loadingUserProtected) {
                return <Loader />
            }
            else {
                return <Navigate to="/" state={{ from: location }} replace />;
            }
        }
        else if (user.role === "user") {
            return children;
        }
    }

};

export default UserRoute;