import { useEffect } from "react"
import { useCoursesContext} from "../Hooks/useCoursesContext"


//components
import FilterForm from "../Components/FilterForm"
import CoursesTitle from "../Components/CourseTitle"



const TitleCourse = () =>{
    const {courses,dispatch}=useCoursesContext()
    const nuss= '635f9eb3e5c3c676bb7b0a09'
    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch('/courses')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
        }

        fetchCourses()
    }, [dispatch])


    return (
        <div className="home">
    
            <div className="courses">
                {courses && courses.map((course)=>(
                    <CoursesTitle key={course._id} course={course}/>
                ))}
            </div>
        
            <FilterForm/>
        </div>
    )
}

export default TitleCourse