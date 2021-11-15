import React, { useContext } from "react";
import { AgendaContext } from "../utils/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default ({ agenda, handleSelected }) => {
  const dispatch = useContext(AgendaContext);

  const handleDelete = () => {
    dispatch({ type: "removeFromList", id: agenda.id });
  };

  const getStatus = () => {
    console.log(
      new Date(agenda.deadline).getTime() - new Date(agenda.startTime).getTime()
    );
    if (new Date(agenda.startTime).getTime() - new Date().getTime() > 0) {
      return "Not Started";
    } else if (new Date(agenda.deadline).getTime() - new Date().getTime() > 0) {
      return "In Progress";
    } else if (new Date(agenda.deadline).getTime() - new Date().getTime() < 0) {
      return "Overdue";
    }
  };

  return (
    <tbody>
      <tr>
        <td>{agenda.title}</td>
        <td>{agenda.description}</td>
        <td>{moment(agenda.createdAt).format("YYYY-MM-DD, hh:mm:ss")}</td>
        <td>{moment(agenda.updatedAt).format("YYYY-MM-DD, hh:mm:ss")}</td>
        <td>{getStatus()}</td>
        <td>
          <FontAwesomeIcon
            icon={faEdit}
            size="1x"
            onClick={() => handleSelected()}
            className="mr-2"
          />
          <FontAwesomeIcon
            icon={faTrash}
            size="1x"
            onClick={handleDelete}
            className="text-danger"
          />
        </td>
      </tr>
    </tbody>
  );
};
