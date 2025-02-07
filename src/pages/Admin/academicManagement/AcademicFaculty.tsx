import { Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api"
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableDataFAaculty =Pick<
TAcademicFaculty,
'name'>;

const AcademicFaculty = () => {
  const {data : academicFaculty} = useGetAcademicFacultiesQuery(undefined)
  const tableData = academicFaculty?.data?.map(({_id,name})=>({
    key:_id,
    name,
   
  }));
  console.log(academicFaculty)
  const columns: TableColumnsType<TTableDataFAaculty> = [
    {
      title: 'Name',
      dataIndex: 'name',
      
    },
   
  ];
  
  
  
  return <Table<TTableDataFAaculty>
  // rowSelection={}
  columns={columns}
  dataSource={tableData}
/>
}

export default AcademicFaculty;
