import React, { Component } from "react";
import { Modal, Image, Header } from "semantic-ui-react";
import { connect } from "react-redux";

import { closeModal } from "./modalActions";

const actions = { closeModal };

class PendingTransactionModal extends Component {
  render() {
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
        <Modal.Header>Transaction Submitted</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="large" src="/assets/fox.svg" />
          <Modal.Description>
            <Header>Check MetaMask</Header>
            <p>Your event has been submitted, finalize it by approving the transaction using MetaMask.</p>
            <i>If the page doesn't refresh afterwards, you may do so</i>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(PendingTransactionModal);
