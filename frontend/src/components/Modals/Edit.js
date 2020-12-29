import React, { Component } from "react";
import { Modal, Button, ModalBody } from "react-bootstrap";

class Edit extends Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.onHide({ msg: "Cross Icon CLicked!" })}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.props.body}</Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.onClick({ msg: "Modal Closed!" })}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.props.onClick({ msg: "Modal Submitted!" })}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Edit;
