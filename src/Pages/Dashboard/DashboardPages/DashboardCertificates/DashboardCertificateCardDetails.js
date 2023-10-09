import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button, Form } from 'react-bootstrap';
import MuiMenu from '../DashboardFolder/MuiMenu';

const DashboardCertificateCardDetails = ({ data, index, dataFolder, dataFetch }) => {
    const navigate = useNavigate();
    return (
        <div className='col-12 col-sm-12 col-md-6 col-xl-4' key={index}>
            <Card sx={{ maxWidth: 330, padding: 2, borderRadius: 5, background: '#E8E8E8' }} >
                <Typography variant="body2" className='d-flex justify-content-end align-items-center' style={{ marginTop: '-5px', paddingBottom: '10px' }}>
                    <MuiMenu key={index} data={dataFolder} id={data?._id} dataFetch={dataFetch} />
                </Typography>
                <CardActionArea onClick={() => navigate(`/dashboard/dashboard-certificates-details/${data?._id}`)} style={{ cursor: 'pointer' }}>
                    <CardMedia
                        component="img"
                        height="auto"
                        width="100%"
                        image={data?.certificate}
                        sx={{
                            '&.MuiCardMedia-root': {
                                maxHeight: 225
                            },
                        }}
                        alt="green iguana"
                    />
                    <CardContent className='mt-2'>

                        <Typography variant="body2" className='d-flex justify-content-between align-items-center'>
                            <p className='cardSubTitleIssue'>Issued by :</p>
                            <p className='cardSubInfoIssue'>{data?.issuerName ? data?.issuerName : data?.issuer}</p>
                        </Typography>
                        <Typography variant="body2" className='d-flex justify-content-between align-items-center'>
                            <p className='cardSubTitleIssue mb-0'>Received by :</p>
                            <p className='cardSubInfoIssue mb-0'>{data?.name ? data?.name : data?.email}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default DashboardCertificateCardDetails;