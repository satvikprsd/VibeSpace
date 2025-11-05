"use client";
import { useState, ChangeEvent, FormEvent} from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import Loader from "../../components/ui/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );
      const data = await response.json();

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

        <Button
          type="submit"
          className="bg-primary text-primary-foreground py-2 rounded-md font-medium transition-transform duration-150 active:scale-95"
        >
          {loading ? <Loader className="mb-5" /> : "Sign In"}
        </Button>

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
