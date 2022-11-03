import { AuthContext } from "../Context/AuthContext"
import { useAuthContext } from "./useAuthContext"
import { useCoursesContext } from "./useCoursesContext"

export const useLogout = () => {

    const{dispatch} = useAuthContext()
    const{dispatch: coursesDispatch} = useCoursesContext()


    const logout = () => {
        //removee user from stoarge 
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        coursesDispatch({type: 'SET_COURSES', payload: null})



    }
    return {logout}
}