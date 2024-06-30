import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LoginFormState = {
    email: string;
    password: string;
}

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<LoginFormState>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormState> = async (data: LoginFormState) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        toast.error('Invalid email or password');
        setLoading(false);
        return;
      }
  
      const responseData = await response.json();

      if (responseData) {
        toast.success('Login successful');
        navigate("/welcome");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  return (
    <div className="login">
      <div className="header">
        <h5>Sign in to account</h5>
        <p>Enter your email & password to login</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input {...register("email", {
            required: "Email is required", pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
          })} type="email" name="email" placeholder="johndoe@yahoo.com" />
          { errors.email && <div className="error">{errors.email.message}</div> }
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input {...register("password", {
            required: "Password is required", pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "Password: min. 8 characters, with 1 letter, 1 number, 1 special character."
            }
          })} type="password" name="password" />
          { errors.password && <div className="error">{errors.password.message}</div> }
        </div>
        <div className="submit-button">
          <button type="submit">{loading ? "Loading..." : "Sign in"}</button>
        </div>
        <div className="create-account">
          <p>
            Don't have account? <span onClick={() => navigate('/register')}>Create Account</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;