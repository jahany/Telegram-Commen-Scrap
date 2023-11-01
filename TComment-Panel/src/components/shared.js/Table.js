import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

//Icons
import deleteIcon from "../../assest/icons/delete.svg";
import linkIcon from "../../assest/icons/link.png";
import editIcon from "../../assest/icons/edit.svg";

//Redux
import { deleteUser } from "../../redux/users/deleteUserSlice";
import { deleteChannel } from "../../redux/channels/deleteChannelSlice";
import { setSelectedUser } from "../../redux/users/selectedUserSlice";
import { fetchcomments } from "../../redux/comments/commentsSlice";
import { fetchchannels } from "../../redux/channels/channelSlice";
import { fetchusers } from "../../redux/users/userSlice";
import { createChannel } from "../../redux/channels/createChannelSlice";
import { toggleModalEditusers } from "../../redux/modalSlice";

export const ChannelTable = ({ data }) => {

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState("");


  //Active or Deactive Channel Channel
  const changeChannelType = async (type, data) => {
      try {
          const newChannelData = {
              "id": data.id,
              "name": data.name,
              "telegramId": data.telegramId,
              "isActive": type,
          };
          await dispatch(createChannel(newChannelData));
          dispatch(fetchchannels());
      } catch (error) {
          toast.error(error);
      }
  }
  //Delete Channel
  const deleteChannelHandler = () => {
    dispatch(deleteChannel(selectedId));
    dispatch(fetchusers());
    toast.success("با موفقیت حذف شد");
  }

    return (
      <TableContainer>
        <TableCn>
          <thead>
            <TableRow>
              {data.headers.map((header, index) => (
                <TableHeader key={index}>{header}</TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
          {data.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell className="select" onClick={() => row.isActive ? changeChannelType(false, row) : changeChannelType(true, row) }>{row.isActive ? "فعال" : "غیرفعال"}</TableCell>
              <TableCell ><img src={deleteIcon}  onClick={() =>{setSelectedId(row.id); setShowAlert(true)}} /></TableCell>
            </TableRow>
          ))}
        </tbody>
        </TableCn>
        { showAlert ? <Alert onClick={() => deleteChannelHandler()} setShowAlert={setShowAlert} /> : null}
      </TableContainer>
    );
  };


  export const UserTable = ({ data }) => {

    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const selectedUserId = useSelector((state) => state.selectedUser.userId);

    const selectUserHandler = (userTelegramId) => {
      dispatch(setSelectedUser(userTelegramId));
      dispatch(fetchcomments(userTelegramId));
    }
    
    const editUserHandler = (userTelegramId) => {
      dispatch(setSelectedUser(userTelegramId));
      dispatch(toggleModalEditusers(true));
    }

    const deleteUserHandler = () => {
      dispatch(deleteUser(selectedId));
      dispatch(fetchusers());
      toast.success("با موفقیت حذف شد");

    }

    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(fetchcomments(selectedUserId))
      }, 1000);
    
      return () => clearInterval(interval);
    }, [selectedUserId])

    return (
      <>
      <TableContainer>
        <TableCn>
          <thead>
            <TableRow>
              {data.headers.map((header, index) => (
                <TableHeader key={index}>{header}</TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
          {data.rows.map((row, rowIndex) => (
            <TableRowUser key={row.id}>
              <TableCell key={rowIndex} onClick={() => selectUserHandler(row.userTelegramId)} >{row.id}</TableCell>
              <TableCell key={rowIndex} onClick={() => selectUserHandler(row.userTelegramId)} >{row.userTelegramId}</TableCell>
              <TableCell key={rowIndex} onClick={() => selectUserHandler(row.userTelegramId)} >{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell> 
              <TableCell ><img src={editIcon} onClick={() => editUserHandler(row.userTelegramId)}  /></TableCell>
              <TableCell ><img src={deleteIcon}  onClick={() =>{setShowAlert(true); setSelectedId(row.id)}}  /></TableCell>
            </TableRowUser>
          ))}
        </tbody>
        </TableCn>
      </TableContainer>
      { showAlert ? <Alert onClick={() => deleteUserHandler()} setShowAlert={setShowAlert} /> : null}
      </>
    );
  };

  export const Alert = ({ onClick, setShowAlert}) => {
    const clickHandler = () =>{
      onClick();
      setShowAlert(false);
    }
    return(
        <Box >
            <p>آیا از حذف این مورد مطمين هستید؟</p>
            <div>
              <button onClick={clickHandler}>بله</button>
              <button onClick={() => setShowAlert(false)} >لغو</button>
            </div>
        </Box>
    )
}

export const CommentTable = ({ data }) => {
  const sortedRows = data.rows.slice().sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
    <TableContainer>
      <TableCn>
        <thead>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {
            !sortedRows.length ? <Loader><p>loading ...</p></Loader> :
            sortedRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* <TableCell>{row.username}</TableCell> */}
                <TableCell>{row.channelsid}</TableCell>
                <TableCell>{row.userTelegramId}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.regdate}</TableCell>
                <TableCell>{row.messagetext}</TableCell> 
                <TableCell>
                  <a href={row.postlink}>
                    <span>{row.postlink}</span>
                  </a>
                </TableCell>
              </TableRow>
            ))
          }
        </tbody>
      </TableCn>
    </TableContainer>
    </>
  );
};

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 1px 2px 1px 1pxrgba(0,0,0,.2);
`;

const TableCn = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(32, 43, 64);
`;

const Loader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & p{
    color: #000;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`

const TableHeader = styled.th`
  background-color: #6d9dc2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: #FFF;
`;

const TableRow = styled.tr`

`;
const TableRowUser = styled.tr`
    cursor: pointer;
    &:hover {
    background-color: rgba(189, 189, 189, 0.20);
  }
`

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;

  & img{
    width: 20px;
    cursor: pointer;
  }

  &.select{
    cursor: pointer;
  }
`;

const Box = styled.div`
    width: 20rem;
    height: max-content;
    padding: 1rem 1rem;
    border-radius: 0.3125rem;
    border: 1px solid rgba(115, 81, 231, 0.20);
    background: #F7F7F7;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 30%;
    z-index: 10;
    text-align: right;
    display: flex;
    flex-direction: column;

    & div{
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
    }

    & p{
        color: #000;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    & button {
        display: flex;
        width: 10rem;
        padding: 0.625rem 1rem;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        border-radius: 0.4375rem;
        background: #7351E7;
        color: #FFF;
        margin: 1rem;
        color: #FFF;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        border: none
    }
`