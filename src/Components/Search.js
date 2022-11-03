import { useState, useEffect } from "react"
//import CourseDetails from "./CourseDetails"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export default function Search(){
    const [searchResult, setSearchResult] = useState([])
    const [key, setKey] = useState([])
    useEffect(() => {
   const search = async () => {
       try{
      if(!key.trim()){
      setSearchResult([])
      return
       }
       const courses = await fetch('/api/courses')
       const response = await ({courses}) 
       
       setSearchResult(response.data)
       console.log(response)  
    }
       catch(error){ 
      console.log(error)
       }
    }
search()
    }, [key])
    return(
     <form>
         <div className="search-wrapper"> 
       
         <div className="form-group">
             <input
                 type = "text"
                 className = "form-control" 
                 placeholder= "Search.."
                 value = {key}
                 onChange={(e) => setKey(e.target.value)}
                  />
         </div>
         <button className="material-symbols-outlined">search</button>
         {searchResult && searchResult.length > 0 && (
             <div className=" search-result">
             {searchResult.map(course =>(
             <div className="resultItem" key={course._id}> 
             <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Length (weeks): </strong>{course.length}</p>
            <p><strong>Price: </strong>{course.price}</p>
            <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            </div>

             </div>
             ))}
             </div>
         )}
         </div>
     </form>

    )
}

