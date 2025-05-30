"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/FileUpload";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";

type BackgroundImageResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    back_img: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const BackgroundImage = () => {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;
  // console.log(token)
  const queryClient = useQueryClient();
  const [back_img, setBack_img] = useState<File | null>(null);

  const { data, isLoading, isError, error } = useQuery<BackgroundImageResponse>(
    {
      queryKey: ["services-background"],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/background`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json()),
    }
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["background-image"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/background`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed");
        return;
      }

      setBack_img(null);

      toast.success(data.message || "Submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["services-background"] });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (back_img) {
      formData.append("back_img", back_img);
    }

    mutate(formData);
    console.log("Form submission data:", formData);
  };

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
  }

  return (
    <div className="p-10">
      <form
        onSubmit={onSubmit}
        className="space-y-6 border shadow-lg p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-black text-center">
          Upload Background Image
        </h2>

        <div className="shadow-lg p-6 border rounded-lg">
          <FileUpload
            type="image"
            label="Add Background Image"
            file={back_img}
            setFile={setBack_img}
            existingUrl={data?.data?.back_img}
          />
        </div>

        <div className="pt-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-lg font-bold px-10 py-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BackgroundImage;
