import React, { useState, useEffect } from "react";
import "./Cadre.css";

const API = "http://localhost:5000";

export const Cadres = () => {
  const [name, setName] = useState("");
  console.log(API);

  const [cadres, setCadres] = useState([]);

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/cadres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc: name,
        }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch(`${API}/cadres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc: name,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }

    await getCadres();

    setName("");
  };

  const getCadres = async () => {
    const res = await fetch(`${API}/cadres`);
    const data = await res.json();
    setCadres(data);
  };

  useEffect(() => {
    getCadres();
  }, []);

  const deleteCadre = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/cadres/${id}`, {
        method: "DELETE",
      });
      await res.json();
      await getCadres();
    }
  };

  const editCadre = async (id) => {
    const res = await fetch(`${API}/cadres/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    setName(data.desc);
  };

  return (
    <div className="wrapper">
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
              <label>Cadre Description</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
                placeholder="Introduce the name of the Cadre"
                autoFocus
              />
            </div>
            <button className="btn btn-primary btn-block">
              {editing ? "Update" : "Create"}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <table className="locationTable">
            <thead>
              <tr>
                <th>Cadre's Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cadres.map((cadre) => (
                <tr key={cadre.id}>
                  <td>{cadre.desc}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm btn-block"
                      onClick={() => editCadre(cadre.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={() => deleteCadre(cadre.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
