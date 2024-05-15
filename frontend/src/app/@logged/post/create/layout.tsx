import {ReactNode} from "react";

export default async function Layout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="w-full h-full flex justify-center">
            <div
                className="bg-color-header rounded-br-[500px] text-center h-[60vh] w-full pt-1 flex justify-center mb-[50px] absolute z-10">
            </div>
            <div className="w-[80%] h-[80%] bg-white z-50 fixed mt-[50px] rounded-3xl p-[50px] text-black">
                {children}
            </div>
        </div>
    )
}