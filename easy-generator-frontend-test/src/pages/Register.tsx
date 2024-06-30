import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormState>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormState> = async (
    data: RegisterFormState
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("An error occurred!");
        setLoading(false);
        return;
      }

      const responseData = await response.json();
      if (responseData) {
        toast.success("Account created successfully");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register">
      <div className="header">
        <h5>Create your account</h5>
        <p>Enter your details to create an account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            type="text"
            name="name"
          />
          { errors.name && <div className="error">{errors.name.message}</div>}
        </div>
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
                message: "Password: min. 8 characters, with 1 letter, 1 number, 1 special char."
            }
          })} type="password" name="password" />
          { errors.password && <div className="error">{errors.password.message}</div> }
        </div>
        <div className="submit-button">
          <button type="submit">
            {loading ? "Loading..." : "Create Account"}
          </button>
        </div>
        <div className="create-account">
          <p>
            Already have an account? <span onClick={() => navigate('/')}>Sign in</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
