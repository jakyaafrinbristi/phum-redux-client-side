import { Button, Col, Flex } from "antd"
import PHForm from "../../../components/form/PHForm"

import PHInput from "../../../components/form/PHInput"
import { useGetAcademicDepartmentsQuery, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api"
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch"
import { useState } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useCreateOfferedCourseMutation, useGetAllCoursesQuery, useGetAllRegisteredSemestersQuery, useGetCourseFacultiesQuery } from "../../../redux/features/admin/courseManagement.api"
import PHSelect from "../../../components/form/PHSelect"
import PHTimePicker from "../../../components/form/PHTimePicker"
import { weekDaysOptions } from "../../../constants/global"
import moment from "moment"



const OfferCourse = () => {
  const [courseId, setCourseId] = useState('');
  // console.log(courseId)

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  // const [id,setId] =useState('');
  // console.log('inside parent component',id)

  const { data : semesterRegistrationData } =useGetAllRegisteredSemestersQuery(undefined);
  // console.log(semesterRegistrationData)
  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) =>({
      value:item._id,
      label:`${item.academicSemester.name} ${item.academicSemester.year}`,

    })
  )
  


  const {data : academicFacultyData} = useGetAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item)=>({
    value:item._id,
    label:item.name,

  }))
  const { data: academicDepartmentData } =
  useGetAcademicDepartmentsQuery(undefined);

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );
  const { data: coursesData } = useGetAllCoursesQuery(undefined);
  const {data:facultiesData, isFetching:fetchingFaculties} = useGetCourseFacultiesQuery(courseId ,{skip : !courseId});
  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  
  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.endTime)).format('HH:mm'),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };
  return (
    <Flex justify="center" align="center">
    <Col span={6}>
  <PHForm onSubmit={onSubmit} >
  <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
   />

    <PHSelect
   
    label="Academic Faculty"
     name="academicFaculty"
      options={academicFacultyOptions} >

      </PHSelect>
      <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
      <PHSelectWithWatch
      onValueChange={setCourseId}
            name="course"
            label="Course"
            options={courseOptions}
          />
<PHSelect disabled={!courseId || fetchingFaculties} name="faculty" label="faculty" options={facultiesOptions}></PHSelect>
    
   {/* <PHInput disabled={!id} type="text" name="test" label="Test"></PHInput>  */}

   <PHInput type="text" name="section" label="Section" />
   <PHInput type="text" name="maxCapacity" label="Max Capacity" />
   <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
   <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />


    <Button htmlType="submit">Submit</Button>
  </PHForm>
 </Col>
 </Flex>
  )
}

export default OfferCourse