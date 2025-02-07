
import CreateAdmin from "../pages/Admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/userManagement/CreateStudent";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AcademicSemester from "../pages/Admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/Admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/Admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/Admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/Admin/academicManagement/AcademicDepartment";
import StudentData from "../pages/Admin/userManagement/StudentData";
import StudentDetails from "../pages/Admin/userManagement/StudentDetails";

 
// type TRoute ={
//     path:string,
//     element:ReactNode
// };
// type TSidebarItem ={
//     key: string,
//     label:ReactNode,
//     children?:TSidebarItem[]
// }

export const  adminPaths =[
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard/>,
      },
      {
        name:'Academic Management',
        children:[
            {
                name:'Create A. Semester',
                path:'create-academic-semesters',
                element:<CreateAcademicSemester></CreateAcademicSemester>
            },
            {
                name:'Academic Semester',
                path:'academic-semesters',
                element:<AcademicSemester></AcademicSemester>
            },
            {
                name:'Create A. Faculty',
                path:'create-academic-faculty',
                element:<CreateAcademicFaculty></CreateAcademicFaculty>
            },
            {
                name:'Academic Faculty',
                path:'academic-faculty',
                element:<AcademicFaculty></AcademicFaculty>
            },
            {
                name:'Create A. Department',
                path:'create-academic-department',
                element:<CreateAcademicDepartment></CreateAcademicDepartment>
            },
            {
                name:'Academic Department',
                path:'academic-department',
                element:<AcademicDepartment></AcademicDepartment>
            }
           
        ]
      },
    {
        name:'User Management',
        children:[
            {
                name:'Create Student',
                path:'create-student',
                element:<CreateStudent></CreateStudent>
            },
            {
                name:'Students',
                path:'student-data',
                element:<StudentData></StudentData>
            },
            {
           
                path:'student-data/:studentId',
                element:<StudentDetails></StudentDetails>
            },
            {
                name:'Create Admin',
                path:'create-admin',
                element:<CreateAdmin></CreateAdmin>
            },
            {
                name:'Create Faculty',
                path:'create-faculty',
                element:<CreateFaculty></CreateFaculty>
            },
           
        ]
    }
];
//  export const adminSidebarItems = adminPaths.reduce((acc : TSidebarItem[],item)=>{
//     if(item.path && item.name){
//         acc.push({
//             key:item.name,
//             label:<NavLink to={`/admin/${item.path}`}>{item.name}</NavLink> 
//         })
//     }
//     if(item.children){
 
//             acc.push({
//                 key:item.name,
//                 label: item.name, 
//                 children:item.children.map((child)=>({
//                     key:child.name,
//                     label:<NavLink to={`/admin/${child.path}`}>{child.name}</NavLink> 

//                 }))
//             })

       
//     }

//     return acc;
// },[])

// export const adminRoutes  = adminPaths.reduce((acc : TRoute[],item)=>{
//     if(item.path && item.element){
//         acc.push({
//             path:item.path,
//             element:item.element, 
//         })
//     }
//     if(item.children){
//         item.children.forEach((child)=>{
//             acc.push({
//                 path:child.path,
//                 element:child.element, 
//             })

//         })
//     }

//     return acc;
// },[])
// console.log(newArray)


// export const adminPaths =[
//     {
   
//       path: 'dashboard',
//       element: <AdminDashboard></AdminDashboard>
  
//   },
//     {
   
//       path: "create-student",
//       element:<CreateStudent></CreateStudent>
  
//   },
//     {
   
//       path: "create-admin",
//       element:<CreateAdmin></CreateAdmin>
//   },
//     {
   
//       path: "create-faculty",
//       element:<CreateFaculty></CreateFaculty>
  
//   },
   
// ]
