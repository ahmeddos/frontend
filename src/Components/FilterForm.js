import { useState } from "react"
import { useCoursesContext} from "../Hooks/useCoursesContext"


const FilterForm = () => {
    const {dispatch} = useCoursesContext()
    const [lowprice, setlowPrice] = useState('0')
    const [highprice, sethighPrice] = useState('1000')
    const [rating,setRating] = useState('')
    const [error, setError] = useState(null)
    //const [rating,setRating] = useState('')
    //const [subject,setSubject] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const course = { "price": { "$gte": lowprice,"$lte":highprice }}
        console.log(course)                
        const response = await fetch('/filtercourse',{
            method: "POST",
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
           setError(null)
           console.log('Filtered Course',json)
            dispatch({type: 'SET-COURSES', payload: json})
        }
    }
    return (
        <form className='filter' onSubmit={handleSubmit}>
            <h3>Filter Courses</h3>
            <label>Min Price</label>
            <input
                type="number"
                onChange={(e) => setlowPrice(e.target.value)}
                value={lowprice}
            />
            <label>Max Price</label>
            <input
                type="number"
                onChange={(e) => sethighPrice(e.target.value)}
                value={highprice}
            />
            <button>Filter by price</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default FilterForm