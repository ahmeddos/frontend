import { useState } from "react"
import { useCoursesContext } from "../Hooks/useCoursesContext"
import { useAuthContext } from "../Hooks/useAuthContext"

const CourseForm = () => {
  const {dispatch} = useCoursesContext()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [length, setLength] = useState('')
    const [instructor, setInstructor] = useState('')
    const [subtitles, setSubtitles] = useState('')
    const [summary, setSummary] = useState('')
    const [subject, setSubject] = useState('')
    const [rating,setRating] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const user = useAuthContext()


    const handleSubmit = async (e) => {
       e.preventDefault()

       if(!user){
           setError('you must be logged in')
           return
       }

       const Course = {title, length, price,instructor,subtitles,summary,subject}

       const response = await fetch('/api/courses', {
           method: 'POST',
           body: JSON.stringify(Course),
           headers:{
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${user.token}`
         
           }
       })
       const json = await response.json()

       if(!response.ok){
    setError(json.error)
    setEmptyFields(json.emptyFields)
       }

       if(response.ok){
        setEmptyFields([])
        setError(null)
        setTitle('')
        setLength('')
        setInstructor('')
        setSubtitles('')
        setSubject('')
        setSummary('')
        setPrice('')
        
        console.log('new course added', json)
        dispatch({type:'CREATE_COURSE', payload:json})
        
       }
    }

    return(
     <form className="create" onSubmit={handleSubmit}>
         <h3>Add a new Course</h3>
         <label>Course Title:</label>
         <input
         type="text"
         onChange={(e) => setTitle(e.target.value)}
         value={title}
         className={emptyFields.includes('title') ? 'error' : ''}
         />


         <label>Length (weeks):</label>
         <input
         type="number"
         onChange={(e) => setLength(e.target.value)}
         value={length}
         className={emptyFields.includes('length') ? 'error' : ''}
         />
        

         <label>Price:</label>
         <input
         type="number"
         onChange={(e) => setPrice(e.target.value)}
         value={price}
         className={emptyFields.includes('price') ? 'error' : ''}
         />

        <label>Instructor</label>
         <input
         type="text"
         onChange={(e) => setInstructor(e.target.value)}
         value={instructor}
         className={emptyFields.includes('instructor') ? 'error' : ''}
         />


        <label>Subtitles</label>
         <input
         type="text"
         onChange={(e) => setSubtitles(e.target.value)}
         value={subtitles}
         
         />

         <label>Course Summary</label>
         <input
         type="text"
         onChange={(e) => setSummary(e.target.value)}
         value={summary}
         
         />


        <label>Subject</label>
         <input
         type="text"
         onChange={(e) => setSubject(e.target.value)}
         value={subject}
         className={emptyFields.includes('subject') ? 'error' : ''}
         />

         <button>Add Course</button>
     {error && <div className="error">{error}</div>}

     </form>

    )
}

export default CourseForm