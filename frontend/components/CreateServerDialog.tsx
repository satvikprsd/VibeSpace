import { ChangeEvent, FormEvent, SetStateAction, use, useState } from "react";
import { Button } from "./ui/button"
import { DialogContent } from "./ui/dialog"
import { Input } from "./ui/input"
import Loader from "./ui/loader";
import { createServer } from "@/services/serverService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/useUserStore";

interface CreateServerProps {
  name: string;
  description?: string;
}

const CreateServerDialog = ({setIsOpen} : {setIsOpen: React.Dispatch<SetStateAction<boolean>>}) => {
  const {user, setUser} = useUserStore(); 
  const [inputs, setInputs] = useState<CreateServerProps>({
      name: "",
      description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const ServerCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        try {
      setLoading(true);
      const response = await createServer(inputs);
      const data = response?.data;
      //console.log(response);

      if (data.success) {
        toast.success(data.message);
        const newserver = data.server;
        const updatedServers = [...(user?.servers || []), newserver];
        setUser({...user!, servers: updatedServers});
        setInputs({
          name: "",
          description: "",
        });
        setIsOpen(false);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error instanceof Error) toast.error(error.response?.data?.message || error.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }

  }

  return (
    <DialogContent className="bg-card text-card-foreground rounded-2xl shadow-2xl w-[400px]! flex flex-col gap-6 p-8">
      <form className="" onSubmit={ServerCreate}>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Create a New Server</h2>

          <Input type="text" name="name" onChange={handleChange} value={inputs.name} placeholder="Server Name" className="border-2 border-layer-2" />
          <Input type="text" name="description" onChange={handleChange} value={inputs.description} placeholder="Server Description" className="border-2 border-layer-2"/>
          <Button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80 transition">
            {loading ? <Loader className="mb-5" /> : "Create Server"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

export default CreateServerDialog
