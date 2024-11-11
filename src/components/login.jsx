import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import { useSupabaseLogin } from "@/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "@/context/userContext";
// eslint-disable-next-line react/prop-types
const Login = ({ longUrl }) => {
  const [errors, setErrors] = useState([]);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const guestCredentials = {
    email: "test@example.com",
    password: "test123",
  };
  const { mutate, isPending, isError, error, data } = useSupabaseLogin();

  const handleMouseClick = () => {
    if (!isAutofilled) {
      setFormData({
        email: guestCredentials.email,
        password: guestCredentials.password,
      });
      setIsAutofilled(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { fetchUser } = UserState();
  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),

        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await mutate(formData);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  const navigate = useNavigate();
  // let [params] = useSearchParams();
  // const longUrl = params.get("createNew");

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      console.log("Inside login.jsx 68", longUrl);
      fetchUser();
      navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
    }
    console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
        {isError && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1.5" onMouseDownCapture={handleMouseClick}>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={formData.email}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1.5">
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
            value={formData.password}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button onClick={handleLogin}>
          {isPending ? <PulseLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
