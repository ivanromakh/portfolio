import React from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

import UpdatePortfolioForm from './UpdatePortfolioForm.jsx';

import './ModalWindowUpdate.less';

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


class ModalWindowUpdate extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      canSubmit: false,
    };
  }

  render() {
    return (
      <Modal
        isOpen={ this.props.modalIsOpen }
        onRequestClose={ this.props.closeModal }
        style={ customModelStyles }
        contentLabel="Example Modal"
      >
        <UpdatePortfolioForm portfolio={this.props.portfolio} closeModal={this.props.closeModal} />
      </Modal>
    );
  }
}

ModalWindowUpdate.defaultProps = {
  portfolio: {},
  modalIsOpen: false,
};

ModalWindowUpdate.propTypes = {
  portfolio: PropTypes.object,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalWindowUpdate;
