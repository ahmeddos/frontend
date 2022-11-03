import { Link } from "react-router-dom"


const CoursesTitle = ({ course }) => {

    return (
        <div className="course-details">
            <Link to="/">
            <h4>{course.title}</h4>
            </Link>
            <p><strong>Instructor: </strong>{course.instructor}</p>
            <p><strong>id: </strong>{course._id}</p>
        </div>
    )

}

export default CoursesTitle