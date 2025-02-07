import { FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"
// import PHInput from "../../../components/form/PHInput"
import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import {zodResolver} from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useCreateAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";



const currentYear = new Date().getFullYear();
// console.log(currentYear)
const yearOptions = [0,1,2,3,4].map((number)=>({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));
// console.log(yearOptions)

const CreateAcademicSemester = () => {
  const [createAcademicSemester]=useCreateAcademicSemestersMutation();
    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
      const toastId = toast.loading('Creating....')
        const name =semesterOptions[Number(data?.name -1)]?.label;
        // console.log(data)

        const semesterData = {
            name,
            code:data.name,
            year:data.year,
            startMonth:data.startMonth,
            endMonth:data.endMonth,
        };
        try{

          // console.log(semesterData);
        const res =(await createAcademicSemester(semesterData)) as TResponse;
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
  <PHForm onSubmit={onSubmit} resolver ={zodResolver(academicSemesterSchema)}>
    {/* <PHInput type="text" name="name" label="name"></PHInput>
    <PHInput type="text" name="name" label="year"></PHInput> */}
    <PHSelect label="Name" name="name" options={semesterOptions} ></PHSelect>
    <PHSelect label="Year" name="year" options={yearOptions} ></PHSelect>
    <PHSelect label="Start Month" name="startMonth" options={monthOptions} ></PHSelect>
    <PHSelect label="End Month" name="endMonth" options={monthOptions} ></PHSelect>
    <Button htmlType="submit">Submit</Button>
  </PHForm>
 </Col>
 </Flex>
  )
}

export default CreateAcademicSemester;