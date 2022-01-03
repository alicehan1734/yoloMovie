import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ open, onClose, children }) => {

  if (!open) return null;

  return (

    <>
      <OVERLAY_STYLE onClick={onClose} />
      <MODAL_STYLES >
        <div style={{ width: "100%", textAlign: " right" }}>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }}></CloseIcon>

        </div>
        {children}
      </MODAL_STYLES>
    </>

  );
};
const OVERLAY_STYLE = styled.div`
  position: fixed;
  top: 0;
  left : 0;
  right : 0;
  bottom : 0;
  background-color: rgba(0,0,0,.7);
  z-index : 1000;

`;
const MODAL_STYLES = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform : translate(-50%, -50%);
  background-color: white;
  padding : 50px;
  z-index: 1000

`;

export default Modal;