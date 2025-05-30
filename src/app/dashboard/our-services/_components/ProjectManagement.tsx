"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import QuillEditor from "@/components/ui/quill-editor";

const formSchema = z.object({
  heading: z.string().min(2, {
    message: "heading must be at least 2 characters.",
  }),
  title1: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description1: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  title2: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description2: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  title3: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description3: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

type ProjectManagementContentResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    heading: string;
    title1: string;
    description1: string;
    title2: string;
    description2: string;
    img1: string;
    img2: string;
    img3: string;
    title3: string;
    description3: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
  };
};

const ProjectManagement = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  // console.log(token);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } =
    useQuery<ProjectManagementContentResponse>({
      queryKey: ["project-management"],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/projectmanagement`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json()),
    });

  const [img1, setImg1] = useState<File | null>(null);
  const [img2, setImg2] = useState<File | null>(null);
  const [img3, setImg3] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      title1: "",
      description1: "",
      title2: "",
      description2: "",
      title3: "",
      description3: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        heading: data.data.heading || "",
        title1: data.data.title1 || "",
        description1: data.data.description1 || "",
        title2: data.data.title2 || "",
        description2: data.data.description2 || "",
        title3: data.data.title3 || "",
        description3: data.data.description3 || "",
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["project-management"],
    mutationFn: (formData: FormData) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/projectmanagement`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      ).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message || "Submission failed");
        return;
      }

      form.reset();
      setImg1(null);
      setImg2(null);
      setImg3(null);

      toast.success(data.message || "Submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["project-management"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("heading", values.heading);
    formData.append("title1", values.title1);
    formData.append("title2", values.title2);
    formData.append("title3", values.title3);
    formData.append("description1", values.description1);
    formData.append("description2", values.description2);
    formData.append("description3", values.description3);

    if (img1) {
      formData.append("img1", img1);
    }
    if (img2) {
      formData.append("img2", img2);
    }
    if (img3) {
      formData.append("img3", img3);
    }

    mutate(formData);

    // Log the complete form data to console
    console.log("Form submission data:", formData);
  }

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
  }

  return (
    <div className="px-10 pb-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">
              PROJECT MANAGEMENT
            </h2>
            {/* heading  */}
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Heading
                  </FormLabel>
                  <FormControl>
                    <QuillEditor
                      id="heading"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* first part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Image"
                  file={img1}
                  setFile={setImg1}
                  existingUrl={data?.data?.img1}
                />
              </div>
            </div>
            {/* second part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Image"
                  file={img2}
                  setFile={setImg2}
                  existingUrl={data?.data?.img2}
                />
              </div>
            </div>
            {/* thired part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg p-6 border rounded-lg">
              <div className="md:col-span-1">
                <div>
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4">
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-black">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <FileUpload
                  type="image"
                  label="Add Image"
                  file={img3}
                  setFile={setImg3}
                  existingUrl={data?.data?.img3}
                />
              </div>
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
        </Form>
      </div>
    </div>
  );
};

export default ProjectManagement;
