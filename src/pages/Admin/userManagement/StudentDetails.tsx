import { useParams } from "react-router";


const StudentDetails = () => {
    const {studentId} =useParams();

  return (
    <div>
        <h1>This is Student details of {studentId}</h1>
    </div>
  )
}

export default StudentDetails