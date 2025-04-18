"use client"
import React from "react";
import Banner from "./Banner/Banner";
import WeAre from "./WeAre/WeAre";
import OurServices from "./OurServices/OurServices";
import ContactUs from "./ContactUs/ContactUs";
import ManagedService from "./ManagedService/ManagedService";
import Navbar from "../shared/Navbar/Navbar";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { AllHomeDataResponse } from "../types/allFrontendDataType";

const HomePageAllComponents = () => {
  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;
  console.log(token)

  const {data} = useQuery<AllHomeDataResponse>({
    queryKey : ["all-data"],
    queryFn : ()=> fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/frontend-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>res.json()),
    enabled: !!token,
  })
  console.log(data)
  return (
    <div>
      <section className="sticky top-0 z-50">
        <Navbar data={data?.navbar?.[0]}/>
      </section>

      <section>
        <Banner data={data?.banner?.[0]}/>
      </section>

      <section>
        <WeAre />
      </section>

      <section>
        <OurServices />
      </section>

      <section>
        <ManagedService />
      </section>

      <section>
        <ContactUs />
      </section>
    </div>
  );
};

export default HomePageAllComponents;
