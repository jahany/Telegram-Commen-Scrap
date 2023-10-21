import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//Icons
import deleteIcon from "../../assest/icons/delete.svg";
import linkIcon from "../../assest/icons/link.png";

//Redux
import { deleteUser } from "../../redux/deleteUserSlice";
import { setSelectedUser } from "../../redux/selectedUserSlice";
import { fetchcomments } from "../../redux/commentsSlice";

export const ChannelTable = ({ data }) => {

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
              <TableCell>{row.isActive ? "فعال" : "غیرفعال"}</TableCell>
            </TableRow>
          ))}
        </tbody>
        </TableCn>
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
      dispatch(fetchcomments(selectedUserId));
    }
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
            <TableRow key={rowIndex} onClick={() => selectUserHandler(row.userTelegramId)}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell> 
              <TableCell ><img src={deleteIcon}  onClick={() =>{setShowAlert(true); setSelectedId(row.id)}}  /></TableCell>
            </TableRow>
          ))}
        </tbody>
        </TableCn>
      </TableContainer>

      <Alert showAlert={showAlert} onClick={() => dispatch(deleteUser(selectedId))} setShowAlert={setShowAlert} />
      </>
    );
  };

  export const Alert = ({showAlert, onClick, setShowAlert}) => {


    return(
        <Box showAlert={showAlert}>
            <p>آیا از حذف این مورد مطمين هستید؟</p>
            <div>
              <button onClick={onClick}>بله</button>
              <button onClick={() => setShowAlert(false)} >لغو</button>
            </div>
        </Box>
    )
}

export const commentTable = ({ data }) => {
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
          <TableRow>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.phone}</TableCell> 
            <TableCell ><img src={linkIcon}   /></TableCell>
          </TableRow>
        ))}
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

const TableHeader = styled.th`
  background-color: #6d9dc2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: #FFF;
`;

const TableRow = styled.tr`

`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;

  & img{
    width: 20px;
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
    display: ${(props) => props.showAlert ? "flex" : "none"};
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