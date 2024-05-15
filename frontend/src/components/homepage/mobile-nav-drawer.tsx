'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface LeftDrawerProps {
    navItems: string[];
    inner_text: string[][];
    inner_link: string[][];
}

export default function LeftDrawer({navItems, inner_text, inner_link}: LeftDrawerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [open, setOpen] = React.useState<Record<string, boolean>>(navItems.reduce((acc, item) => ({
        ...acc,
        [item]: false
    }), {}));

    const handleClick = (item: string) => {
        setOpen({...open, [item]: !open[item]})
    };
    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };
    const mainDrawerList = (text: string, index: number) => (
        <React.Fragment key={text}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleClick(text)}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                    {(index < 2) && (open[text] ? <ExpandLess/> :
                        <ExpandMore/>)}
                </ListItemButton>
            </ListItem>
            {subDrawerList(text,index)}
        </React.Fragment>
    )

    const subDrawerList = (text: string,index:number) => (<>
        {(text === navItems[0] || text === navItems[1]) && (
            <Collapse in={open[text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding
                      onClick={toggleDrawer(false)}
                      onKeyDown={toggleDrawer(false)}
                          >
                          {inner_text[index].map((subtext,inner_index) => (
                          <ListItem key={inner_index} disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemText primary={subtext}/>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </Collapse>
            )}
</>)
;

const drawerList = () => (
    <Box
        sx={{width: 250}}
        role="presentation"
    >
        {navItems.map((text, index) => (
            <div key={index}>
                {(index > 1) ? (
                        <List
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            {mainDrawerList(text, index)}
                        </List>) :
                    (<List>
                        {mainDrawerList(text, index)}
                    </List>)}
            </div>
        ))}
        <Divider/>
        <List className="md:hidden">
            {['登入', '註冊'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
);

return (
    <div>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                    className="xl:invisible xl:hidden visible:block">
            <MenuIcon className="ml-[2%]" onClick={toggleDrawer(true)}/>
        </IconButton>
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
        >
            {drawerList()}
        </Drawer>
    </div>
);
}
