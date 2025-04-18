// types/dataTypes.ts

export type Address = {
    id: number;
    title: string;
    location: string;
    icon: string | null;
    img: string | null;
    created_at: string;
    updated_at: string;
  };
  
  export type Banner = {
    id: number;
    heading: string;
    title: string;
    subtitle: string | null;
    description: string;
    button_name: string;
    button_url: string;
    back_img: string;
    created_at: string;
    updated_at: string;
  };
  
  export type Navbar = {
    id: number;
    logo: string;
    back_img: string;
    itemname1: string;
    itemlink1: string;
    itemname2: string;
    itemlink2: string;
    itemname3: string;
    itemlink3: string;
    itemname4: string;
    itemlink4: string;
    created_at: string;
    updated_at: string;
  };
  
  export type About = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    button_name: string;
    button_url: string;
    created_at: string;
    updated_at: string;
  };
  
  export type AllHomeDataResponse = {
    // home: any[];
    // aboutsec2: any[]; 
    address: Address[];
    banner: Banner[];
    // body1: any[];
    // body2: any[];
    // hero: any[];
    navbar: Navbar[];
    // possible: any[];
    // whychooseus: any[];
    about: About[];
    // contact: any[];
    // menu: any[];
    // ourcorevalue: any[];
    // service: any[];
  };
  