import NavItem from "@/components/homepage/nav-item";
import SigninBtn from "@/components/homepage/signin-btn";
import SignupBtn from "@/components/homepage/signup-btn";
import {ReactNode} from "react";

export default async function Template({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="w-full h-full">
            <div className="bg-color-header rounded-br-[500px] text-center h-[60vh] w-full pt-1 flex justify-center">
                <div className="w-[70%]  h-[60px] mt-[6vh] justify-center items-center flex">
                    <NavItem/>
                    <SigninBtn/>
                    <SignupBtn/>
                </div>
            </div>
            {children}
        </div>
    )
}