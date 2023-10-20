import { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

//Redux
import { toggleModalUsers, toggleModalChannels } from "../../redux/modalSlice";
import { createChannel } from "../../redux/createChannelSlice";
import { createUser } from "../../redux/createUserSlice";

const PopUp = () => {
    const dispatch = useDispatch();
    const userSelector = useSelector((state) => state.modal.userPopup);
    const channelSelector = useSelector((state) => state.modal.channelPopup);
    const [channelName, setChannelName] = useState("");

    const [userData, setUserData] = useState([]);

    const setUserDatas = (key, value) => {
        setUserData((prevuserData) => ({
          ...prevuserData,
          [key]: value,
        }));
      };

    const getChannelName = (e) => {
        setChannelName(e.target.value);
    }

    const userDataHandler = async() => {
        dispatch(toggleModalUsers());
        try {
            await dispatch(createUser(userData));
            toast.success("با موفقیت ثبت شد");
        } catch (error) {
            toast.error(error);
        }
        console.log(userData)
    }

    const channelsDataHandler = async () => {
        dispatch(toggleModalChannels());
        try {
            const newChannelData = {
                "id": "",
                "name": channelName,
                "telegramId": "",
                "isActive": true,
            };
            await dispatch(createChannel(newChannelData));
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
                    <p>نام</p>
                    <input type='text' value={userData.name} onChange={(e) => setUserDatas( "name", e.target.value)} />
                    <p>نام کاربری</p>
                    <input type='text' value={userData.username} onChange={(e) => setUserDatas("userTelegramId", e.target.value)} />
                    <p>موبایل</p>
                    <input type='text' value={userData.mobile} onChange={(e) => setUserDatas("phone", e.target.value)} />
                    <button onClick={() => userDataHandler()}>ذخیره</button>
                </Box>
            }
            {
                channelSelector &&
                <Box>
                    <p>نام کانال</p>
                    <input type='text' onChange={getChannelName} value={channelName} />
                    <button onClick={() => channelsDataHandler()}>ذخیره</button>
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
`