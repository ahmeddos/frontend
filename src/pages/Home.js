import { useEffect } from "react"
import { useCoursesContext } from "../Hooks/useCoursesContext"
import { useAuthContext } from "../Hooks/useAuthContext"

//Components
import CourseDetails from '../Components/CourseDetails'
import CourseForm from '../Components/CourseForm'
import FilterForm from "../Components/FilterForm"


const Home = () => {
const {courses, dispatch} = useCoursesContext()
const {user} = useAuthContext()

useEffect(() => {
const fetchCourses = async () => {
    const response = await fetch('/api/courses', {
        headers:{
           'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if(response.ok){
   dispatch({type:'SET_COURSES',payload: json})
     }
}
if(user){
fetchCourses()

}
}, [dispatch, user])
    return (
        <div className="home">
            <div className="courses">
                {courses && courses.map((course) =>
               (
            <CourseDetails key={course._id} course={course} />
            ))}
            </div>
            <CourseForm/>
            <FilterForm/>
        </div>
    )
}
export default Home