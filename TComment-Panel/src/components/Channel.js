import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Redux
import { fetchchannels } from '../redux/channelSlice';
import { toggleModalChannels } from '../redux/modalSlice';

//Components
import Container from './shared.js/Container';
import { ChannelTable } from './shared.js/Table';
import PopUp from './shared.js/PopUp';

//Icons
import channelIcon from "../assest/icons/channels.svg";

const Channel = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelLists.channels);
  const popUpSelector = useSelector((state) => state.modal.channelPopup);

  useEffect(() => {
    dispatch(fetchchannels());
  }, []);

  const tableData = {
      headers: ["نام کانال", "نام کاربری", "وضعیت"],
      rows: channels,
    };

    const addChannelHandler = () => {
        dispatch(toggleModalChannels());
    }

    return (
        <>
          <Container title= "لیست کانال ها"  image={channelIcon} onClick={() => addChannelHandler()}>
              {/* { channelsSelector.length && channelsSelector.map(channel => <p>{channel.username}</p>) } */}
              <ChannelTable data={tableData} />
          </Container>
          { popUpSelector ?  <PopUp/> : null}
        </>
    );
};

export default Channel;

