'use client'
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {useRouter} from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";

export default function SignupBtn() {
    const router = useRouter();
    return (
        <button
                className="bg-teal-800 lg:w-[220px] md:w-[300px] h-[100%] rounded-r-[3rem] justify-center items-center  hidden invisible md:visible md:flex hover:bg-teal-900 duration-300"
                onClick={() => router.push('/signin')}
            >
                <PersonIcon className="text-white ml-[15%]"/>
                <div className="bg-brown-500  w-[100%] h-[100%]  duration-300 rounded-[50%] text-white flex justify-center items-center text-center">
                    註冊
                </div>
            </button>
    )
}