import React, { useState } from 'react';
import { useContext } from 'react';
import { UserAuthContext } from '../../Context/UserContext/UserContext';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DashboardSearchBar = (props) => {
    const [search, setSearch] = useState("");
    const { secret, user } = useContext(UserAuthContext);
    const navigate = useNavigate();

    const dataFolder = async () => {

        const token = CryptoJS.AES.decrypt(localStorage.getItem("userToken"), secret).toString(CryptoJS.enc.Utf8);
        const data = await axios.get(`https://api.zecurechain.com/api/v1/folder/${user?.email}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        });
        if (data.status == 200) {
            return data.data?.data;
        }
        else {
            console.log(data);
            return false;
        }
    }

    const subSearch = async () => {
        // console.log("searched", search);
        let data = await dataFolder();
        // console.log(data);
        if (data) {
            const findFolder = await data.find(folder => folder?.name === search);
            if (findFolder) {
                // console.log(findFolder);
                // navigate(`/dashboard/dashboard-folder-details/${findFolder?._id}`);
                navigate(`/dashboard/dashboard-folder`);
                sessionStorage.setItem('selectedTab', '3');
                setSearch(() => "");

            }
            else {
                const findSubFolder = await data.find((item) =>
                    item.subFolders.some((subFolder) => subFolder.subName === search)
                );
                if (findSubFolder) {
                    const subFolder = findSubFolder.subFolders.find(
                        (subFolder) => subFolder.subName === search);
                    const subNameId = subFolder._id;
                    // navigate(`/dashboard/dashboard-folder-details/${subNameId}/${findSubFolder?.name}/${subFolder?.subName}`);
                    navigate(`/dashboard/dashboard-folder-details/${findSubFolder?._id}`);
                    sessionStorage.setItem('selectedTab', '3');
                    setSearch(() => "");
                }
                else {
                    toast.dismiss();
                    toast.error("No folders Found");
                }
            }
        }
        else {
            toast.dismiss();
            toast.error("No folders Found");
        }
    }

    const handleKeyPress = async (e) => {
        // console.log('E', e);
        if (e.key === 'Enter') {
            // Call your function here
            await subSearch();
        }
    };
    return (
        <>

            <div className={`search-container ${props?.classes}`}>
                <input type="text" name='search' value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search" className='search-bar-dashboard' />
                <i class="fas fa-search" onClick={() => subSearch()} style={{ cursor: 'pointer' }}></i>
            </div>
        </>
    );
};

export default DashboardSearchBar;
