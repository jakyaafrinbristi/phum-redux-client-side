import { FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"
// import PHInput from "../../../components/form/PHInput"
import { Button, Col, Flex } from "antd"
import PHSelect from "../../../components/form/PHSelect"
import {  semesterStatusOptions } from "../../../constants/semester";



import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useCreateSemesterRegisterMutation } from "../../../redux/features/admin/courseManagement.api";




// console.log(yearOptions)

const SemesterRegistration = () => {
  const [createSemester] = useCreateSemesterRegisterMutation();

    const {data : academicSemester} = useGetAllSemestersQuery([{
        name:'sort',value:'year'
    }])
    console.log(academicSemester);
    const academicSemesterOptions =academicSemester ?.data?.map((item) =>({
        value:item._id,
        label:`${item.name} ${item.year}`

    }))
    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
      const toastId = toast.loading('Creating....')
      
        // console.log(data)

        const semesterData = {
          ...data,
          minCredit:Number(data.minCredit),
          maxCredit:Number( data.maxCredit)
        };
          // console.log(semesterData);
        try{

        const res =(await createSemester(semesterData)) as TResponse<any>;
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

    <PHSelect label="Academic Semester" name="academicSemester" options={academicSemesterOptions} ></PHSelect>
    <PHSelect name="status" label="Status" options={semesterStatusOptions}></PHSelect>
    <PHDatePicker name="startDate" label="Start Date"></PHDatePicker>
    <PHDatePicker name="endDate" label="End Date"></PHDatePicker>
    <PHInput type="text" name="minCredit" label="Min Credit"></PHInput>
    <PHInput type="text" name="maxCredit" label="Max Credit"></PHInput>
    

    <Button htmlType="submit">Submit</Button>
  </PHForm>
 </Col>
 </Flex>
  )
}

export default SemesterRegistration;