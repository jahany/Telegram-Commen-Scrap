import React from 'react';
import { styled } from "styled-components";

//Components
import Channel from "./Channel";
import Users from './Users';
import Comments from './Comments';


const Index = () => {

    return (
        <Div>
            <Row>
                <Channel />
                <Users />
            </Row>
            <Row>
                <Comments />
            </Row>
        </Div>
    );
};

export default Index;

const Div = styled.div`
    // height: calc(100vh - 7rem);
    // width: 100vw;
    display: flex;
    flex-direction: column;
    bottom: 0;
    padding: 5rem;
    position: relative;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`