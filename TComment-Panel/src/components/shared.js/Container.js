import React from 'react';
import { styled } from "styled-components";

//Icons
import addIcon from "../../assest/icons/add-circle-b.svg";

const Container = ({ title, image ,children, onClick }) => {
    return (
        <Box>
            <Head> <img src={image} /> { title }</Head>
            <AddItem onClick={onClick} ><img src={addIcon}/><p>افزودن</p></AddItem>
            { children }
        </Box>
    );
};

export default Container;


const Box = styled.div`
    min-height: 200px;
    height: max-content;
    width: 30rem;
    border-radius: 1.125rem;
    background: #FFF;
    box-shadow: 0px 0px 4px 0px #7351E7;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin: 10px;
`
const Head = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.20);

    & img{
        width: 30px;
        height: 30px;
        margin-left: 5px;
    }
`

const AddItem = styled.div`
    width: 90%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    & img{
        width: 20px;
    }
    & p{
        font-weight: 700px;
        margin-right: 5px;
    }
`