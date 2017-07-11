import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import CreatePortfolioForm from './CreatePortfolioForm.jsx';


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


class ModalWindowCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      canSubmit: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.openModal}>Create new portfolio</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customModelStyles}
          contentLabel="Example Modal"
        >
          <CreatePortfolioForm
            handlePortfolioCreate={this.props.handlePortfolioCreate}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

ModalWindowCreate.propTypes = {
  handlePortfolioCreate: PropTypes.func.isRequired,
};

export default ModalWindowCreate;
