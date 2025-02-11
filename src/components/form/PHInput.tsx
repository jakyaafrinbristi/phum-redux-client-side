import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputProps ={
    type:string;
    name:string;
    label?:string;
    disabled?:boolean;
}


const PHInput = ({type,name,label,disabled}  : TInputProps) => {
    // const {register} =useFormContext();

 
  return (
   <div style={{marginBottom  : '20px'}}>
   {/* {label ? label : null} */}
   <Controller name={name} 
//    render={({field})=>(  <Input type={type} id={name}  {...register(name)}   />)}
   render={({field})=>
  <Form.Item label={label}><Input {...field} type={type} id={name} disabled={disabled}/></Form.Item>
  }
   ></Controller>
  
   </div>
  )
}

export default PHInput;