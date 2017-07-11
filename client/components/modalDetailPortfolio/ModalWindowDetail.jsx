import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customModelStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const ModalWindowDetail = props => (
  <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    style={customModelStyles}
    contentLabel="Example Modal"
  >
    <h2>Portfolio Detail</h2>
    <p>Id: {props.portfolio.id}</p>
    <p>Short Description: {props.portfolio.longDescription}</p>
    <p>Long Description: {props.portfolio.shortDescription}</p>
    <button onClick={props.closeModal}>OK</button>
  </Modal>
);

ModalWindowDetail.defaultProps = {
  portfolio: {},
  modalIsOpen: false,
};

ModalWindowDetail.propTypes = {
  portfolio: PropTypes.object,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalWindowDetail;
