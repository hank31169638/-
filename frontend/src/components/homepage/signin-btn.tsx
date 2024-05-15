'use client'
import PersonIcon from "@mui/icons-material/Person";
import {useRouter} from "next/navigation";

export default function SignInBtn() {
    const router = useRouter();
    return (
        <>
            <button
                className="bg-teal-900 lg:w-[220px] md:w-[300px] h-[100%] rounded-l-[3rem] justify-center items-center  hidden invisible md:visible md:flex hover:bg-teal-800 duration-300"
                onClick={() => router.push('/signin')}
            >
                <PersonIcon className="text-white ml-[15%]"/>
                <div className="bg-brown-500  w-[100%] h-[100%]  duration-300 rounded-[50%] text-white flex justify-center items-center text-center">
                    登入
                </div>
            </button>
        </>
    )
}