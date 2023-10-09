import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#C2E6FF',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: 'radial-gradient(50% 50.00% at 50% 50.00%, #2D37A6 0%, #161958 100%)',
    },
}));

function LinearProgressWithLabel(props) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', m: 0, position: 'relative', top: '-12px' }}>
            <Box sx={{ width: '100%', mr: 2 }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ position: 'relative', top: '-15px' }}>
                <HighlightOffIcon fontSize='medium' sx={{ position: 'relative', top: '-10px', cursor: 'pointer' }} onClick={() => {
                    props?.cancel(props?.index);
                }} />
                <Typography variant="body2" color="text.secondary" fontSize={16}>{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function DashboardLinearLoader({ cancel, index }) {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 10;
                return nextProgress >= 100 ? 100 : nextProgress;
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ height: 20 }}>
            <LinearProgressWithLabel value={progress} cancel={cancel} index={index} />
        </Box>
    );
}