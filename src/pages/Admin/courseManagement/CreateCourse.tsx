import { FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"
// import PHInput from "../../../components/form/PHInput"
import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"




import { toast } from "sonner";
import { TResponse } from "../../../types/global";
;
import PHInput from "../../../components/form/PHInput";
import { useCreateCourseMutation, useCreateSemesterRegisterMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";




// console.log(yearOptions)

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const [createSemester] = useCreateSemesterRegisterMutation();
  const {data:courses} =useGetAllCoursesQuery(undefined);

   
    const preRequisiteCoursesOptions =courses?.data?.map((item) =>({
        value:item._id,
        label:item.title,

    }))
    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
      const toastId = toast.loading('Creating....')
      
        // console.log(data)

        const courseData = {
          ...data,
          code:Number(data.code),
          credits:Number(data.credits),
           isDeleted:false,
           preRequisiteCourses:data.preRequisiteCourses? data.preRequisiteCourses?.map((item)=>({
            course:item,
            isDeleted:false,

           })) :[]
        };
          console.log(courseData);
        try{

        const res =(await createCourse(courseData)) as TResponse<any>;

        if(res.error){
          toast.error(res.error.data.message,{id : toastId})
        }
        else{
          toast.success('semester created succesfully',{id : toastId})
        }
        console.log(res)
        }
        catch(err){
          toast.error("Something Went Wrong",{id : toastId} )

        }
    };
 
  return (
 <Flex justify="center" align="center">
    <Col span={6}>
  <PHForm onSubmit={onSubmit} >

 
    <PHInput type="text" name="title" label="Title"></PHInput>
    <PHInput type="text" name="prefix" label="Prefix"></PHInput>
    <PHInput type="text" name="code" label="Code"></PHInput>
    <PHInput type="text" name="credits" label="Credits"></PHInput>
    <PHSelect mode='multiple' options={preRequisiteCoursesOptions}
      name="preRequisiteCourses"
      label="preRequisiteCourses">


    </PHSelect>
    

    <Button htmlType="submit">Submit</Button>
  </PHForm>
 </Col>
 </Flex>
  )
}

export default CreateCourse;