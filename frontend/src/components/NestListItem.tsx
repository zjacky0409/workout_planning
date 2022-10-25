import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";


interface Content {
    name: string,
    path: string,
    icon: string
}

interface SideBarProp {
    shownText: string,
    content: Content[];
    action: any,
}


// Drawer aka side bar

export default function NestListItem({ shownText, content, action }: SideBarProp) {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (

        <div style={{ width: '100%' }}>
            <ListItemButton onClick={handleClick} sx={{ width: '100%'}}>
                <ListItemText primary={shownText} />
                {open ? <ExpandLess /> : <ExpandMore />}

            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        content.map((val) => {
                            return (
                                <ListItemButton key={val.path+'_nest_item'} sx={{ pl: 4 }} onClick={action} component={Link} to={val.path}>{val.icon}{val.name}</ListItemButton>
                            )
                        })
                    }

                </List>
            </Collapse>
        </div>
    );
}
