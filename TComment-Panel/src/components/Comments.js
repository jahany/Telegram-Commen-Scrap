import React, { useEffect } from 'react';
import { styled } from "styled-components";
import {  useSelector, useDispatch } from 'react-redux';

//Components
import { commentTable } from './shared.js/Table';

//Icons
import linkIcon from "../assest/icons/link.png";

//Redux
import { fetchcomments } from '../redux/commentsSlice';

const Comments = () => {
    const dispatch = useDispatch();

    const commentSelector = useSelector((state) => state.commentsList.comments);

    useEffect(() => {
        console.log(commentSelector);
    }, [])

    const tableData = {
        headers: ["نام کاربری", "تاریخ و ساعت", "کامنت","لینک"],
        rows: commentSelector
      };

    return (
        <Container title= "لیست کاربران" >
            <commentTable data={tableData} />
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