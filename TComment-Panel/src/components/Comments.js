import React, { useEffect } from 'react';
import { styled } from "styled-components";
import {  useSelector } from 'react-redux';

//Components
// import Table from './shared.js/Table';

//Icons
import linkIcon from "../assest/icons/link.png";

const Comments = () => {
    const tableData = {
        headers: ["نام کاربری", "تاریخ و ساعت", "کامنت","لینک"],
        rows: [
          ["@user","متن کامنت", "۱۴۰۲/۰۷/۲۸ - ۱۲:۴۵", <img src={linkIcon} />],
        ],
      };

    const channelsSelector = useSelector((state) => state.channelLists.channels);
    
    return (
        <Container title= "لیست کاربران" >
            {/* { channelsSelector.length && channelsSelector.map(channel => <p>{channel.username}</p>) } */}
            {/* <Table data={tableData} /> */}
        </Container>
    );
};

export default Comments;

const Container = styled.div`
    margin-top: 2rem;
    width: 80%;
    background-color: #fff;
    border-radius: 1.125rem;
    background: #FFF;
    box-shadow: 0px 0px 4px 0px #7351E7;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`