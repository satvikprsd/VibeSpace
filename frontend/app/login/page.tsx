"use client";
import { useState, ChangeEvent, FormEvent} from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import Loader from "../../components/ui/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/userService";
import { AxiosError } from "axios";

interface SignInProps {
  usernameoremail: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const navigate = router.push;

  const [inputs, setInputs] = useState<SignInProps>({
    usernameoremail: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const LoginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(inputs);
      const data = response.data;
      console.log(response);
      if (data.success) {
        toast.success(data.message);
        setInputs({
          usernameoremail: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error instanceof Error) toast.error(error.response?.data?.message || error.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in flex items-center justify-center min-h-screen w-screen bg-linear-to-r from-background via-secondary to-background">
      <form
        onSubmit={LoginUser}
        className="bg-card text-card-foreground rounded-2xl shadow-2xl w-[400px] flex flex-col gap-6 p-8"
      >
        <h1 className="text-center text-2xl font-semibold text-foreground">
          Sign In
        </h1>

        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground text-sm">
              Username / Email *
            </Label>
            <Input
              className="text-foreground bg-input border-none focus-visible:ring-2 focus-visible:ring-ring"
              type="text"
              name="usernameoremail"
              placeholder="Enter your username or email"
              value={inputs.usernameoremail}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Password *</Label>
            <Input
              className="text-foreground bg-input border-none focus-visible:ring-2 focus-visible:ring-ring"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="bg-primary text-primary-foreground py-2 rounded-md font-medium transition-transform duration-150 active:scale-95 hover:cursor-pointer"
          >
            {loading ? <Loader className="mb-5" /> : "Sign In"}
          </Button>
          <Button
            type="button"
            className="bg-black hover:bg-black/60 text-primary-foreground py-2 rounded-md font-medium transition-transform duration-150 active:scale-95 hover:cursor-pointer"
            onClick={() => window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/github"}
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 98 96" preserveAspectRatio="xMidYMid meet" role="img" aria-label="icon">
            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#ffffff"/>
          </svg>
            Login with GitHub
          </Button>
        </div>
        <p className="text-center text-muted-foreground text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
