
import { Button, Row } from "antd";
import { FieldValues, useForm,  } from "react-hook-form"
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";


const Login = () => {
  const navigate =useNavigate()
 
  const dispatch = useAppDispatch()
  // const {register,handleSubmit} = useForm({
  //   defaultValues:{
  //     userId:'A-0001',
  //     password:'admin123'
  //   }
  // });

  const defaultValues ={
    userId:'A-0001',
        password:'admin123'

  }

  const [login] = useLoginMutation();
  // const [login,{data,error}] = useLoginMutation();
  // console.log('data =>', data);
  // console.log('error =>', error);

 
  const onSubmit =async(data : FieldValues)=>{ 
    console.log(data)
   const toastId= toast.loading('Logging in')
    // console.log(data)
   try{
    const userInfo = {
      id:data.userId,
      password:data.password,
    }
   const res=await login(userInfo).unwrap();
   const user = verifyToken(res.data.accessToken) as TUser;
    // console.log(user)
  //  console.log(res)
  dispatch(setUser({user:user, token:res.data.accessToken}) );
  toast.success('Successfully login' ,{id:toastId ,duration:2000})

 if(res.data.needsPasswordChange){
  navigate(`/change-password`)
 }else{
  navigate(`/${user.role}/dashboard`) 
 }
   }
   catch(err){
    toast.error('Something went wrong',{id:toastId ,duration:2000})

   }
  }
  return (
   <Row justify="center" align="middle" style={{height:'100vh'}}>
    <PHForm onSubmit={onSubmit} defaultValues = {defaultValues}>

        {/* <label htmlFor="id">ID:</label> */}
        <PHInput type="text" name="userId" label="ID:"></PHInput>
        {/* <input type="text" id="id" {...register('userId')}    /> */}
  
        {/* <label htmlFor="password">Password:</label> */}
        <PHInput type="type" name="password" label="Password"></PHInput>
        

      <Button htmlType="submit">Login</Button>
      </PHForm>
   </Row>
  )
}

export default Login