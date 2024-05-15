'use client'
import Divider from '@mui/material/Divider';
export default function Page() {
    return (
        <div className="w-full h-full">
            <div className="flex justify-center items-center">
                <Divider
                    aria-hidden='true' className="w-[90%]  lg:w-[80%] text-3xl">
                    <div className='mr-[50px] ml-[50px]'>
                        消息公告
                    </div>
                </Divider>
            </div>
            {/* TODO:要去渲染是誰誰誰公布的資料 從資料庫拿出來排序 */}
            <div className='mt-[100px] flex flex-row h-96'>
                <div className='w-[500px] flex flex-col items-center text-center h-full'>
                    <p className='text-2xl'>最新消息</p>
                    <Divider aria-hidden='true' variant="middle" className='w-[300px] mt-[10px] mb-[10px]'/>
                    <p>567</p>
                </div>
                <Divider aria-hidden='true' orientation="vertical" variant="middle"/>
                <div className='w-full flex flex-col text-center h-full'>
                    查看更多
                </div>
            </div>
        </div>
    )
}