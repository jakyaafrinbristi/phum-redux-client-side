import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
import PHForm from "../../../components/form/PHForm"
import PHInput from "../../../components/form/PHInput"
import { Button, Col, Divider, Form, Input, Row } from "antd"
import { bloodGroupOptions, genderOptions } from "../../../constants/global"
import PHSelect from "../../../components/form/PHSelect"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { useGetAcademicDepartmentsQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api"
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api"

const studentDummyData={
  "password": "student123",
  "student": {
      "name": {
          "firstName": "Student",
          "middleName": "",
          "lastName": "Two"
      },
      "gender": "female",
      "dateOfBirth": "2000-01-01",
      "bloodGroup": "O+",
      "email": "student2@gmail.com",
      "contactNo": "1234567890",
      "emergencyContactNo": "0987654321",
      "presentAddress": "123 Main Street, City, Country",
      "permanentAddress": "456 Another Street, City, Country",
      "guardian": {
          "fatherName": "James Doe",
          "fatherOccupation": "Engineer",
          "fatherContactNo": "1231231231",
          "motherName": "Jane Doe",
          "motherOccupation": "Teacher",
          "motherContactNo": "3213213213"
      },
      "localGuardian": {
          "name": "Uncle Bob",
          "occupation": "Businessman",
          "contactNo": "5555555555",
          "address": "789 Guardian Street, City, Country"
      },
      "admissionSemester":"6795e5e828a644b34a60da4e",
      "academicDepartment":"6795e9b228a644b34a60da5e"
    
  }
};
//! this is only for development purpose
//! should be removed


const studentDefaultValues ={
  "name": {
    "firstName": "Student",
    "middleName": "",
    "lastName": "Two"
},
"gender": "female",
// "dateOfBirth": "2000-01-01",
"bloodGroup": "O+",
// "email": "student2@gmail.com",
"contactNo": "1234567890",
"emergencyContactNo": "0987654321",
"presentAddress": "123 Main Street, City, Country",
"permanentAddress": "456 Another Street, City, Country",
"guardian": {
    "fatherName": "James Doe",
    "fatherOccupation": "Engineer",
    "fatherContactNo": "1231231231",
    "motherName": "Jane Doe",
    "motherOccupation": "Teacher",
    "motherContactNo": "3213213213"
},
"localGuardian": {
    "name": "Uncle Bob",
    "occupation": "Businessman",
    "contactNo": "5555555555",
    "address": "789 Guardian Street, City, Country"
},
"admissionSemester":"6795e5e828a644b34a60da4e",
"academicDepartment":"6795e9b228a644b34a60da5e"

}

const CreateStudent = () => {
  const [createStudent,{data,error}] = useCreateStudentMutation();
  console.log({data,error})
  const {data:sData,isLoading:sIsLoading} =useGetAllSemestersQuery(undefined);
  // const {data:dData,isLoading:dIsLoading} =useGetAcademicDepartmentsQuery(undefined ,{skip:sIsLoading});
  const {data:dData,isLoading:dIsLoading} =useGetAcademicDepartmentsQuery(undefined);
  // console.log(isData)

  const semesterOptions = sData?.data?.map((item)=> ({
    value:item._id,
    label:`${item.name} ${item.year}`,

  }))
  const departmentOptions = dData?.data?.map((item)=> ({
    value:item._id,
    label:item.name,

  }))

  const onSubmit : SubmitHandler<FieldValues> =(data)=>{
    console.log(data);
    const  studentData ={
      password : 'student123',
      student:data,
    }
    const formData = new FormData();
      formData.append("data",JSON.stringify(studentData));
      formData.append('file',data.image)
    createStudent(formData)
  //   // console.log([...formData.entries()]);

  //   //!This is for development
  //   //1Just for checking
    console.log(Object.fromEntries(formData));

  }
  return (
    <Row >
    <Col span={24}>
    <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
      <Divider>Personal Info</Divider>
      <Row gutter={8}>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="name.firstName" label="First Name"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="name.middleName" label="Middle Name"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="name.lastName" label="Last Name"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHSelect options={genderOptions}   name="gender" label="Gender"></PHSelect>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHDatePicker name="dateOfBirth" label="Date Of Birth"></PHDatePicker>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHSelect options={bloodGroupOptions} name="bloodGroup" label="Blood Group"></PHSelect>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <Controller
        name="image"
        render={({field : {onChange, value, ...field}})=>(
          <Form.Item label="Picture">
            <Input type='file' value={value?.fileName}
             {...field}
               onChange={(e)=>onChange(e.target.files?.[0])}></Input>
          </Form.Item>

        )}  
        />
      
        </Col>
      </Row>
      <Divider>Contact Info</Divider>
      <Row gutter={8}>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="email" label="Email"></PHInput>
      
        </Col>
       
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="contactNo" label="Contact No"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="emergencyContactNo" label="Emergency Contact No"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="presentAddress" label="Present Address"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="permanentAddress" label="Permanent Address"></PHInput>
      
        </Col>
      </Row>
      <Divider>Guardian</Divider>
      <Row gutter={8}>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="guardian.fatherName" label="Father Name"></PHInput>
      
        </Col>
       
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="guardian.fatherOccupation" label="Father Occupation"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="guardian.fatherContactNo" label="Father Contact No"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="guardian.motherName" label="Mother Name"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="guardian.motherOccupation" label="Mother Occupation"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="guardian.motherContactNo" label="Mother Contact No"></PHInput>
      
        </Col>
       
      </Row>
      <Divider>Local Gurdian</Divider>
      <Row gutter={8}>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="localGuardian.name" label="Local Guardian Name"></PHInput>    
      
        </Col>
       
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="localGuardian.occupation" label="Occupation"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="localGuardian.contactNo" label="Contact No"></PHInput>
      
        </Col>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHInput type="text" name="localGuardian.address" label="Address"></PHInput>
      
        </Col>
     
       
      </Row>
      <Divider>Academic Info</Divider>
      <Row gutter={8}>
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHSelect options={semesterOptions} disabled={ sIsLoading} name="admissionSemester" label="Admission Semester"></PHSelect>
      
        </Col>
       
        <Col span={24} md={{span:12}} lg={{span:8}}>
        <PHSelect options={departmentOptions} disabled={ dIsLoading} name="academicDepartment" label="Admission Department"></PHSelect>
      
        </Col>
     
     
       
      </Row>

      <Button htmlType="submit">Submit</Button>
    </PHForm>
    </Col>
    </Row>

  )
}

export default CreateStudent