import React, { useEffect } from 'react';
import { styled } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

//Redux
import { toggleModalUsers } from '../redux/modalSlice';
import { fetchusers } from '../redux/userSlice';

//Components
import Container from './shared.js/Container';
import { UserTable } from './shared.js/Table';
import PopUp from './shared.js/PopUp';
//Icons
import userIcon from "../assest/icons/users.svg";

const Users = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.userList.users);
    const popUpSelector = useSelector((state) => state.modal.userPopup);
    console.log(users);

    useEffect(() => {
      dispatch(fetchusers());
    },[])
    const tableData = {
        headers: ["آیدی", "نام کاربری", "شماره تلفن","حذف"],
        rows:users,
      };

    const addUserHandler =() => {
        dispatch(toggleModalUsers());
    }

    return (
     <>
        <Container title= "لیست کاربران"  image={userIcon} onClick={() => addUserHandler()}>
            <UserTable data={tableData} />
        </Container>
        { popUpSelector ? <PopUp/> : null}
    </>
    );
};

export default Users;

