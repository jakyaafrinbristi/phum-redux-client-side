import OfferedCourse from "../pages/Student/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentPaths = [
    {
        name:'Dashboard',
        path:'dashboard',
        element:<StudentDashboard></StudentDashboard>
    },
     {
        name:'Offered Course',
        path: 'offered-course',
        element:<OfferedCourse></OfferedCourse>
     }

]