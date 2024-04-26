import { Navigate, Outlet } from 'react-router-dom'
import { getSessionCookie } from './session'


const PrivateRoutes = () => {
  let auth = getSessionCookie();
return (
    auth ? <Outlet/> : <Navigate to='/'/>
  )
}


export default PrivateRoutes;