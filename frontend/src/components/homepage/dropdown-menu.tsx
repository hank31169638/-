'use client'
import * as React from 'react';
import {Button} from "@mui/material";
import {Menu, MenuItem} from "@mui/material"
import {useEffect, useState} from "react";
import {MouseEvent} from "react";
import {useRouter} from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


interface Props {
    navItems: string[],
    inner_text: string[][],
    inner_link: string[][],
}

export default function DropdownMenu({navItems, inner_text, inner_link}: Props) {
    const router = useRouter();
    const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});

    const handleClick = (event: MouseEvent<HTMLButtonElement>, item: string) => {
        setAnchorEls(prev => ({
            ...prev,
            [item]: prev[item] === event.currentTarget ? null : event.currentTarget
        }));
    }

    function handleHover(item: string) {
        setAnchorEls(prev => ({
            ...prev,
            [item]: document.getElementById(`button-${item}`)
        }));
    }

    function handleClickItem(link: string, item: string) {
        router.push(link);
        setAnchorEls(prev => ({...prev, [item]: null}));
    }


    return (
        <>
            {navItems.map((item, index) => (
                <div className="basis-1/3" key={index}>
                    <Button
                        id={`button-${item}`}
                        aria-controls={Boolean(anchorEls[item]) ? `menu-${item}` : undefined}
                        aria-labelledby={`button-${item}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorEls[item]) ? 'true' : undefined}
                        onClick={(event) => handleClick(event, item)}
                        onMouseOver={() => {
                            handleHover(item);
                        }}
                        onMouseLeave={() => {
                            setAnchorEls(prev => ({...prev, [item]: null}));
                        }}
                        style={{zIndex: 1301}}
                        className="text-black text-xl hover:opacity-60 transition-opacity duration-300"
                    >
                        {item}
                        <ArrowDropDownIcon/>
                    </Button>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEls[item]} // 使用 anchorEl 屬性來定位 Menu
                        open={Boolean(anchorEls[item])}
                        autoFocus={false}
                        MenuListProps={{
                            onMouseOver: () => {
                                setAnchorEls(prev => ({
                                    ...prev,
                                    [item]: document.getElementById(`button-${item}`)
                                }));
                            },
                            onMouseLeave: () => {
                                setAnchorEls(prev => ({...prev, [item]: null}));
                            }
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{mt: '15px'}}
                    >
                        {inner_text[index].map((inner_item, inner_index) => (
                            <MenuItem className="p-4 hover:opacity-60 transition-opacity duration-300" key={inner_index}
                                      onClick={() => handleClickItem(inner_link[index][inner_index], item)}>{inner_item}</MenuItem>
                        ))}
                    </Menu>
                </div>
            ))}
        </>
    );
}




