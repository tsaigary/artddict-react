import React from 'react';
import { GiPikeman } from 'react-icons/gi'
import { RiArrowLeftSLine } from 'react-icons/ri'

const MarqueeMap = () => {
    return (
        <>
            <marquee
          scrollamount="10"
          className="event-marquee px-3 mb-5"
        >
          <h1 className="notoSansTC-md my-3">
            探索美學 從周圍開始 <GiPikeman />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine /> 探索美學 從周圍開始{' '}
            <GiPikeman />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine /> 探索美學 從周圍開始{' '}
            <GiPikeman />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
            <RiArrowLeftSLine />
          </h1>
        </marquee>
        </>
    );
}

export default MarqueeMap;
