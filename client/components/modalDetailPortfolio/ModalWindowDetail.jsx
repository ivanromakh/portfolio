import React from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

const customModelStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class ModalWindowDetail extends React.Component {
  render() {
    return (
      <Modal
        isOpen={ this.props.modalIsOpen }
        onRequestClose={ this.props.closeModal }
        style={ customModelStyles }
        contentLabel="Example Modal"
      >
        <h2>Portfolio Detail</h2>
        <p>Id: {this.props.portfolio.id}</p>
        <p>Short Description: {this.props.portfolio.longDescription}</p>
        <p>Long Description: {this.props.portfolio.shortDescription}</p>
        <button onClick={this.props.closeModal}>OK</button>
      </Modal>
    );
  }
};

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
