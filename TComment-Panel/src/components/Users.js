import React, { useEffect } from 'react';
import { styled } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

//Redux
import { toggleModalUsers } from '../redux/modalSlice';
import { fetchusers } from '../redux/users/userSlice';

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
    const popUpEditSelector = useSelector((state) => state.modal.edituserPopup);

    useEffect(() => {
      dispatch(fetchusers());
    },[users])
    const tableData = {
        headers: ["شناسه","نام کاربری", "نام ", "شماره تلفن","ویرایش","حذف"],
        rows:users,
      };

    const addUserHandler =() => {
        dispatch(toggleModalUsers(true));
    }

    return (
     <>
        <Container title= "لیست کاربران"  image={userIcon} onClick={() => addUserHandler()}>
            <UserTable data={tableData} />
        </Container>
        { popUpSelector || popUpEditSelector ? <PopUp/> : null}
    </>
    );
};

export default Users;

