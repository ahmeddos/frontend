import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'
import { useAuthContext } from './Hooks/useAuthContext';

//Pages and Components 
import Home from './pages/Home'
import NavBar from './Components/Navbar'
import Signup from './pages/Signup';
import Login from './pages/Login';
import TitleCourse from './pages/TitleCourse';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
     <BrowserRouter>
     <NavBar/>
     <div className="pages">
       <Routes>
         <Route
           path="/"
           element={user ? <Home /> : <Navigate to='/login'/>}
           element2 = { <div>
            <Link to = {'/instructorHome'}><button>Instructor</button></Link>
            <button>Individual Trainee</button>
            <button>Corporate Trainee</button>
            <button>Guest</button>
            <button>Admin</button>
            </div>}
            />
           
         <Route
           path="/login"
           element={!user ? <Login /> : <Navigate to = '/'/>}>
         </Route>
         <Route
           path="/signup"
           element={!user ? <Signup /> : <Navigate to = '/'/>}>
         </Route>
         <Route
            path="/course"
            element={<TitleCourse/>}
          />
            <Route
           path='/addCourse'
           element={
            <div className = "view" ><h2>Courses Available:</h2>
           <Home />
           </div>}>
         </Route>

<Route 
   path = '/instructorHome'
   element = { <div>

    <Link to = {'/viewCoursesINS'}><button>View my Courses</button></Link>
    <Link to = {'/addCourse'}><button>Add a new Course</button></Link>
   </div>
   }>
   </Route>


<Route 
   path='/viewCourses'
   element = { <div className = "viewMyCourse">
             <label>Please Enter Instructor's Name</label>
         <input
         type="text"
         //onChange={}
         //value={title}
         //className={emptyFields.includes('title') ? 'error' : ''}
         />

         <button>View my Courses</button>
    
    </div>} >
      </Route>

       </Routes>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
