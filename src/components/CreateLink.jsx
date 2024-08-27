import { useState, useEffect } from "react";
import { UserState } from "@/context/userContext";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import { useRef } from "react";
import { useCreateUrl } from "@/hooks/useCreateUrl";
import { BeatLoader } from "react-spinners";
const CreateLink = () => {
  const { user } = UserState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longUrl = searchParams.get("createNew");
  const ref = useRef();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longUrl ? longUrl : "",
    customUrl: "",
  });

  const { mutate, data, error, isPending } = useCreateUrl();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCreateUrl = async () => {
    setErrors([]);
    try {
      console.log(formData);
      console.log("insdie create url func");
      await schema.validate(formData, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await mutate({
        ...formData,
        user_id: user.id,
        qr_code: blob,
      });
    } catch (e) {
      const newErrors = {};
      console.log(e.inner);
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log(newErrors);
      setErrors(newErrors);
    }
  };
  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);
  return (
    <div>
      <Dialog
        defaultOpen={longUrl}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create new!!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-2">
            {formData?.longUrl && (
              <QRCode
                className="outline-3 outline-blue-400400 border outline"
                value={formData?.longUrl}
                size={180}
                ref={ref}
              />
            )}
          </div>
          <Input
            id="title"
            placeholder="Short Link's title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}
          <Input
            id="longUrl"
            placeholder="Enter the long url!"
            value={formData.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}
          <div className="flex flex-row items-center gap-2">
            <Card className="p-2">shrinklr.in</Card>/
            <Input
              id="customUrl"
              placeholder="Custom Link(optional)"
              value={formData.customUrl}
              onChange={handleChange}
            />
          </div>
          {error && <Error message={error.message} />}
          <DialogFooter className="sm:justify-start">
            <Button onClick={handleCreateUrl} variant="destructive">
              {isPending ? <BeatLoader size={10} color="#7fffd4" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
