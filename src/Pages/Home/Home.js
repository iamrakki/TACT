import React from 'react';
import './Home.css';
import Banner from './SubSections/Banner';
import Featured from './SubSections/Featured';
import Zecurchain from './SubSections/Zecurchain';
import Explaination from './SubSections/Explaination';
import BlockchainSocial from './SubSections/BlockchainSocial';
import AiThemeIntro from './SubSections/AiThemeIntro';
import BottomHeader from '../../Components/Shared/Header/BottomHeader';
import BlockchainSocialV2 from './SubSections/BlockchainSocialV2';
import ExplainationV2 from './SubSections/ExplainationV2';
import Recognised from './SubSections/Recognised';

const Home = () => {
    return (
        <>

            {/* <BottomHeader /> */}
            <Banner />
            <Featured />
            <hr />
            <Zecurchain />
            {/* <Explaination /> */}
            <ExplainationV2 />
            {/* <BlockchainSocial /> */}
            <BlockchainSocialV2 />
            <AiThemeIntro />
            <Recognised />

        </>
    );
};

export default Home;