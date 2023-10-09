import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoveTreePopUp from './MoveTreePopUp';


const options = [
    'Move'
];

const ITEM_HEIGHT = 48;

export default function MuiMenu({ data, id, dataFetch }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const Id = open ? 'simple-popover' : undefined;
    return (
        <div className=''>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                aria-describedby={Id}

            >
                <MoreVertIcon sx={{ position: 'absolute', right: -10, color: 'darkblue' }} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}

                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {/* {options.map((option) => ( */}
                <MenuItem>
                    {/* {option} */}
                    <MoveTreePopUp data={data} setAnchorEl={setAnchorEl} id={id} dataFetch={dataFetch} />
                </MenuItem>
                {/* ))} */}
            </Menu>
        </div>
    );
}