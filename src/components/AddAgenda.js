import React, { useState, useContext } from "react";
import { AgendaContext } from "../utils/Context";
import { Modal } from "react-bootstrap";
import moment from "moment";

export default props => {
  const dispatch = useContext(AgendaContext);
  const [state, setState] = useState({
    title: "",
    description: "",
    createdAt: moment().format(),
    updatedAt: moment().format(),
    startTime: "",
    deadline: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "addAgenda",
      ...state
    });
    props.onHide();
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Agenda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                name="title"
                placeholder="Type your agenda title"
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <input
                type="text"
                name="description"
                placeholder="Describe your agenda"
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <span className="text-muted">Select a start date and time</span>
              <input
                type="datetime-local"
                name="startTime"
                onChange={handleChange}
                min={new Date().toISOString().split(".")[0]}
                step="1"
                required
              />
            </p>
            {state && state.startTime && (
              <p>
                <span className="text-muted">Select an end date and time</span>
                <input
                  type="datetime-local"
                  name="deadline"
                  placeholder="Select a deadline"
                  onChange={handleChange}
                  min={state.startTime}
                  step="1"
                  required
                />
              </p>
            )}
            <div className="text-end">
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
