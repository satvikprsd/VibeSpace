"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import Loader from "../../components/ui/loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUpUser } from "@/services/userService";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [inputs, setInputs] = useState<SignUpProps>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const CreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await signUpUser(inputs);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        setInputs({ username: "", email: "", password: "" });
        router.push("/login");
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        else toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fade-in flex items-center justify-center min-h-screen w-screen bg-linear-to-r from-background via-secondary to-background">
      <form
        onSubmit={CreateUser}
        className="bg-card text-card-foreground rounded-2xl shadow-2xl w-[400px] flex flex-col gap-6 p-8"
      >
        <h1 className="text-center text-2xl font-semibold text-foreground">
          Create an account
        </h1>

        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground text-sm">Email *</Label>
            <Input
              className="text-foreground bg-input border-none focus-visible:ring-2 focus-visible:ring-ring"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Username *</Label>
            <Input
              className="text-foreground bg-input border-none focus-visible:ring-2 focus-visible:ring-ring"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={inputs.username}
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

        <Button
          type="submit"
          className="bg-primary text-primary-foreground py-2 rounded-md font-medium transition-transform duration-150 active:scale-95"
        >
          {loading ? <Loader className="mb-5" /> : "Create Account"}
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
