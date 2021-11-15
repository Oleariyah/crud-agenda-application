import React, { useState, useEffect, useReducer, Fragment } from "react";
import Search from "./components/Search";
import TableHead from "./components/TableHead";
import AddAgenda from "./components/AddAgenda";
import EditAgenda from "./components/EditAgenda";
import TableBody from "./components/TableBody";
import { appReducer } from "./utils/Reducer";
import { AgendaContext } from "./utils/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cogoToast from "cogo-toast";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import "./styles/App.css";

export default () => {
  const [agenda, dispatch] = useReducer(appReducer, []);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [state, setSearch] = useState({
    search: ""
  });

  useEffect(() => {
    const raw = localStorage.getItem("storeUserAgendaData");
    if (raw) {
      dispatch({ type: "fetchInitialData", payload: JSON.parse(raw) });
    } else {
      dispatch({ type: "fetchInitialData", payload: [] });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storeUserAgendaData", JSON.stringify(agenda));
  }, [agenda]);

  const handleSearch = e => {
    setSearch({ ...state, search: e.target.value });
  };

  let filteredAgenda = agenda.filter(
    value =>
      value &&
      value.title &&
      value.title.toLowerCase().indexOf(state.search.toLowerCase()) !== -1
  );

  const handleSelected = value => {
    setSelected(value);
    setEdit(true);
  };

  const handleChange = e => {
    const files = e.target.files;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csv = reader.result;
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            if (results && results.data && results.data.length > 0) {
              if (results.data.length > 1000) {
                cogoToast.error(
                  "File is too large, please upload a file with less than 100 rows"
                );
              } else {
                if (results.meta.fields.length === 8) {
                  const data = results.data.map(value => {
                    return {
                      id: value.id,
                      title: value.title,
                      description: value.description,
                      startTime: value.startTime,
                      endTime: value.endTime,
                      createdAt: value.createdAt,
                      updatedAt: value.updatedAt
                    };
                  });
                  dispatch({ type: "fetchInitialData", payload: data });
                } else {
                  cogoToast.error("Please upload a valid csv file");
                }
              }
            } else {
              cogoToast.error("CSV file is empty");
            }
          }
        });
      };
      reader.readAsText(file);
    } else {
      cogoToast.error("Please select a file");
    }
  };

  return (
    <Fragment>
      <AgendaContext.Provider value={dispatch}>
        <div className="container">
          <div className="my-5">
            <h2>Agenda App</h2>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <button
                className="btn btn-success mr-2"
                onClick={() => setModalShow(true)}
              >
                Add Agenda
              </button>
              <CSVLink
                className="btn btn-default mr-auto"
                filename={`${new Date()} agenda.csv`}
                data={agenda}
              >
                Export to CSV
              </CSVLink>
            </div>
            <div>
              <label className="custom-file-upload btn btn-default border">
                <FontAwesomeIcon icon={faUpload} size="1x" className="mr-2" />
                Import CSV
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <Search handleSearch={handleSearch} />
          </div>
          <table className="table">
            <TableHead />
            {filteredAgenda.map((value, index) => (
              <TableBody
                key={index}
                agenda={value}
                handleSelected={() => handleSelected(value)}
              />
            ))}
          </table>
        </div>
        {<AddAgenda show={modalShow} onHide={() => setModalShow(false)} />}
        <EditAgenda
          show={edit}
          onHide={() => setEdit(!edit)}
          selected={selected}
        />
      </AgendaContext.Provider>
    </Fragment>
  );
};
