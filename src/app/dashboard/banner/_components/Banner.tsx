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
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FileUpload from "@/components/ui/FileUpload";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading/Loading";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import QuillEditor from "@/components/ui/quill-editor";

type BannerResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    heading: string;
    title: string;
    subtitle: string;
    description: string;
    button_name: string;
    button_url: string;
    back_img: string | null;
    created_at: string;
    updated_at: string;
  };
};

const formSchema = z.object({
  heading: z.string().min(2, {
    message: "heading must be at least 2 characters.",
  }),
  title: z.string().min(5, {
    message: "title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  button_name: z.string().min(2, {
    message: "button name must be at least 2 characters.",
  }),
  button_url: z.string().min(1, {
    message: "button url must be at least 1 characters.",
  }),
});

const Banner = () => {
  const [back_img, setBack_img] = useState<File | null>(null);
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  console.log(token);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<BannerResponse>({
    queryKey: ["banner"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log(data?.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      title: "",
      description: "",
      button_name: "",
      button_url: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        heading: data.data.heading || "",
        title: data.data.title || "",
        description: data.data.description || "",
        button_name: data.data.button_name || "",
        button_url: data.data.button_url || "",
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["banner"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, {
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

      form.reset();
      setBack_img(null);

      toast.success(data.message || "Submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["banner"] });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("heading", values.heading);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("button_name", values.button_name);
    formData.append("button_url", values.button_url);
    if (back_img) {
      formData.append("back_img", back_img);
    }

    console.log(formData);

    mutate(formData);
  }

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div className="w-full h-[500px]">
      <ErrorContainer message={error?.message || "Something went Wrong"} />
    </div>;
  }
  return (
    <div className="p-10">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 border shadow-lg p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-black text-center">
              Banner section
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

            {/* <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Heading
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Heading" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* sub heading  */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* description  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* button  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* button name  */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="button_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Button Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Button Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="button_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black">
                        Button Url
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Button Url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* background image  */}
            <div>
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
                disabled={isPending}
                className="bg-blue-500 text-lg font-bold px-10 py-2"
                type="submit"
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

export default Banner;
