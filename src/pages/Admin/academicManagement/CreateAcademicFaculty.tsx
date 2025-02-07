
import { FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import { Button, Col, Flex } from "antd"
import { zodResolver } from "@hookform/resolvers/zod"
import { acadmeicFacultySchema } from "../../../schemas/academicFacultySchema"
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api"
import { toast } from "sonner"
const CreateAcademicFaculty = () => {
  const[addAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit : SubmitHandler<FieldValues> =async(data)=>{
    const toastId = toast.loading('Creating')
    const academicFaculty ={
      name:data.name
    }
    try{
      console.log(academicFaculty)
   const res = await addAcademicFaculty(data)
   toast.success("Academic Faculty Created Succesfully",{id:toastId})
   console.log(res)
    }
    catch(err){
      toast.error("Something Went wrong",{id:toastId})
    }
  }
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
      <PHForm onSubmit={onSubmit} resolver={zodResolver(acadmeicFacultySchema)}>
      <PHInput type="text" name="name" label="name"/>
      <Button htmlType='submit'>Submit</Button>
      
    </PHForm>
      </Col>
    </Flex>
  )
}


export default CreateAcademicFaculty