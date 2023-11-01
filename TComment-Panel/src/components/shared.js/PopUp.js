import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import closeIcon from "../../assest/icons/close.svg";

//Redux
import { toggleModalUsers, toggleModalChannels, toggleModalEditusers } from "../../redux/modalSlice";
import { createChannel } from "../../redux/channels/createChannelSlice";
import { createUser } from "../../redux/users/createUserSlice";
import { fetchusers } from "../../redux/users/userSlice";
import { fetchchannels } from "../../redux/channels/channelSlice";

const PopUp = () => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state) => state.modal.userPopup);
    const editUserSelector = useSelector((state) => state.modal.edituserPopup);
    const channelSelector = useSelector((state) => state.modal.channelPopup);
    const [channelName, setChannelName] = useState("");

    const selectedUserId = useSelector((state) => state.selectedUser.userId);
    const users = useSelector((state) => state.userList.users);
    const editUser = users.find(user => user.userTelegramId === selectedUserId);
    const [userData, setUserData] = useState({});

    const [userId, setUserIS] = useState(editUser ? editUser.id : "");
    const [userName, setUserNAme] = useState(editUser ? editUser.name : "");
    const [userTelegramId, setUSerTelegram] = useState(editUser ? editUser.userTelegramId : "");
    const [userPhone, setUSerPhone] = useState(editUser ? editUser.phone : "");

    const setUserDatas = (key, value) => {
        setUserData((prevuserData) => ({
          ...prevuserData,  
          [key]: value,   
        }));
      };

    const getChannelName = (e) => {
        setChannelName(e.target.value);
    }

    //ّInsert in User
    const userDataHandler = async() => {
        dispatch(toggleModalUsers(false));
        try {
            await dispatch(createUser(userData));
            toast.success("با موفقیت ثبت شد");
        } catch (error) {
            toast.error(error);
        }

    }

    //Edit user
    const editUserDataHandler = async() => {
        dispatch(toggleModalEditusers(false));
        const editData = {
            "id": userId,
            "name": userName,
            "userTelegramId": userTelegramId,
            "phone": userPhone
        };
        try {
            const result = await dispatch(createUser(editData));
            toast.success("با موفقیت ثبت شد");
            console.log(result);
        } catch (error) {
            toast.error(error);
        }
        dispatch(fetchusers());

    }


    //ّInsert in Channel
    const channelsDataHandler = async () => {
        dispatch(toggleModalChannels(false));
        try {
            const newChannelData = {
                "id": channelName,
                "name": "",
                "telegramId": "",
                "isActive": true,
            };
            await dispatch(createChannel(newChannelData));
            dispatch(fetchchannels());
            toast.success("با موفقیت ثبت شد");
        } catch (error) {
            toast.error(error);
        }
    }

    return(
        <ModalCn>
        {
            userSelector &&
            <Box>
                 <img src={closeIcon} onClick={() => dispatch(toggleModalUsers(false))} />
                <p>نام</p>
                <input type='text' onChange={(e) => setUserDatas("name", e.target.value)} />
                <p>نام کاربری</p>
                <input type='text'  onChange={(e) => setUserDatas("userTelegramId",  parseInt(e.target.value, 10))} />
                <p>موبایل</p>
                <input type='text' onChange={(e) => setUserDatas("phone", e.target.value)} />
                <button 
                    onClick={() => userDataHandler()}
                    disabled={userData.name === "" && userData.userTelegramId === "" && userData.phone === "" && userData.length === 0}
                >ذخیره</button>
            </Box>
        }
        {
            editUserSelector &&
            <Box>
                 <img src={closeIcon} onClick={() => dispatch(toggleModalEditusers(false))} />
                <p>نام</p>
                <input type='text' value={userName} onChange={(e) => setUserNAme( e.target.value)} />
                <p>نام کاربری</p>
                <input type='text' value={userTelegramId}  onChange={(e) => setUSerTelegram(parseInt(e.target.value, 10))} />
                <p>موبایل</p>
                <input type='text' value={userPhone} onChange={(e) => setUSerPhone(e.target.value)} />
                <button 
                    onClick={() => editUserDataHandler()}
                >ویرایش</button>
            </Box>
        }
        {
            channelSelector &&
            <Box>
                <img src={closeIcon} onClick={() => dispatch(toggleModalChannels(false))} />
                <p>نام کانال</p>
                <input type='text' onChange={getChannelName} value={channelName} />
                <button 
                    onClick={() => channelsDataHandler()}
                    disabled={channelName === ""}
                >ذخیره</button>
            </Box>
        }
    </ModalCn>
    )
}

export default PopUp;


const ModalCn = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex; 
    alighn-items: center;
    justify-content: center;
    background-color: rgba(173, 181, 186, 0.15);
    top: 0;
    right: 0;
    z-index: 8;
    overflow: hidden;
`
 const Box = styled.div`
    width: 22rem;
    height: max-content;
    padding: 1rem 3rem;
    border-radius: 0.3125rem;
    border: 1px solid rgba(115, 81, 231, 0.20);
    background: #FFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 30%;
    z-index: 10;
    text-align: right;

    & p{
        color: #000;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    & input{
        border-radius: 0.3125rem;
        border: 1px solid rgba(0, 0, 0, 0.20);
        background-color: #FFF;
        width: 21.25rem;
        height: 2.6875rem;
        padding: 0.75rem;
        box-sizing: border-box;
    }

    & button {
        display: flex;
        width: 21.25rem;
        padding: 0.625rem 5rem;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        border-radius: 0.4375rem;
        background: #7351E7;
        color: #FFF;
        margin-top: 2rem;
        color: #FFF;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        border: none
    }

    & img{
        width: 20px;
        cursor: pointer;
        position: absolute;
        left: 20px;
    }
`