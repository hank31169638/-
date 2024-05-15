'use client';
import {FormEvent, FormEventHandler, useState} from 'react';
import {TextField} from "@mui/material";
import axios from "axios";

export default function PostForm() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const res = axios.post('/api/posts/', {
            title: data.get('title'),
            content: data.get('content'),
        });
    }


    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor="title" className="opacity-70">文章標題</label>
            <input
                id="title"
                name="title"
                type="text"
                className='w-[10%] mb-10 mt-1 rounded-md border-black border-2'
            />
            <TextField
                id="content"
                name="content"
                label="文章內容"
                multiline
                rows="15"
                className='w-full'
            />
            <button type="submit" className="mt-3 flex justify-end">創建文章</button>
        </form>
    );
}

