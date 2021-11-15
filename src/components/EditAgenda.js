import React, { useState, useEffect, useContext } from "react";
import { AgendaContext } from "../utils/Context";
import { Modal } from "react-bootstrap";
import moment from "moment";

export default props => {
  const dispatch = useContext(AgendaContext);
  const { selected } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    if (selected) {
      setState({
        title: selected.title,
        description: selected.description,
        updatedAt: moment().format(),
        startTime: selected.startTime,
        deadline: selected.deadline
      });
    }
  }, [selected]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "editAgenda",
      id: selected.id,
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
        <Modal.Title id="contained-modal-title-vcenter">
          Update Agenda
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                name="title"
                value={state.title}
                placeholder="Type your agenda title"
                onChange={handleChange}
              />
            </p>
            <p>
              <input
                type="text"
                name="description"
                value={state.description}
                placeholder="Describe your agenda"
                onChange={handleChange}
              />
            </p>
            <p>
              <span className="text-muted">Select a start date and time</span>
              <input
                type="datetime-local"
                name="startTime"
                value={state.startTime}
                onChange={handleChange}
                min={new Date().toISOString().split(".")[0]}
                step="1"
              />
            </p>
            {state && state.startTime && (
              <p>
                <span className="text-muted">Select an end date and time</span>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={state.deadline}
                  placeholder="Select a deadline"
                  onChange={handleChange}
                  min={state.startTime}
                  step="1"
                />
              </p>
            )}
            <div className="text-end">
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
