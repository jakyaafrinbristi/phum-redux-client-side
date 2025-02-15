import { Button, Modal, Table } from 'antd';
import { useAddFacultiesMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import { useState } from 'react';
import PHForm from '../../../components/form/PHForm';
import PHSelect from '../../../components/form/PHSelect';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';

// import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';



const Courses = () => {
  

  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        
        return <div> <AddFacultyModal facultyInfo ={item}></AddFacultyModal></div>;
        
      },
    },
  ];



  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal =({facultyInfo})=>{
  // console.log(data.key)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data : facultiesData}=useGetAllFacultiesQuery(undefined);
  const [addFaculties] =useAddFacultiesMutation();
  // console.log(facultiesData )
  const facultiesOption = facultiesData?.data?.map((item) =>({
    value: item._id,
    label:item.fullName
  }))

  const handleSubmit =(data)=>{
   const facultyData ={
    courseId:facultyInfo.key,
    data,
   };
   addFaculties(facultyData)
  };

  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <Button  onClick={showModal}>
     Add Faculty
    </Button>
    <Modal title="Basic Modal" open={isModalOpen}  onCancel={handleCancel} footer={null}>
   <PHForm onSubmit={handleSubmit}>
    <PHSelect mode={'multiple'} options={facultiesOption} name="faculties" label="faculty">
    </PHSelect>
      <Button htmlType='submit'>Submit</Button>
   </PHForm>
    </Modal>
  </>
  )
}


export default Courses;