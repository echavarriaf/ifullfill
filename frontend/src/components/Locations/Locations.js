import React, { useState, useEffect } from 'react'
// import { ConeStriped } from 'react-bootstrap-icons';
import './Locations.css'

const API = 'http://localhost:5000';

export const Locations = () => {
    const [name, setName] = useState('')
    console.log(API)

    const [locations, setLocations] = useState([]);

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
            const res = await fetch(`${API}/locations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            })
            const data = await res.json();
            console.log(data)
        } else {
            const res = await fetch(`${API}/locations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            })
            const data = await res.json();
            console.log(data)
            setEditing(false)
            setId('')
        }

        await getLocations();

        setName('');
    }

    const getLocations = async () => {
        const res = await fetch(`${API}/locations`)
        const data = await res.json()
        setLocations(data)
    }

    useEffect(() => {
        getLocations();
    }, [])

    const deleteLocation = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?')
        if (userResponse) {
            const res = await fetch(`${API}/locations/${id}`,
                {
                    method: 'DELETE'
                });
            await res.json();
            await getLocations();
        }
    }

    const editLocation = async (id) => {
        const res = await fetch(`${API}/locations/${id}`)
        const data = await res.json()

        setEditing(true)
        setId(id)

        setName(data.name)
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <label>Location Name</label>
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Introduce the name of the location"
                            autoFocus
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="locationTable">
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Location's Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map(location => (
                            <tr key={location.id}>
                                {/* <td>{location.id}
                                </td> */}
                                <td>{location.name}
                                </td>
                                <td>
                                    <button className="btn btn-secondary btn-sm btn-block" onClick={() => editLocation(location.id)}>
                                        Edit
                                </button>
                                    <button className="btn btn-danger btn-sm btn-block" onClick={() => deleteLocation(location.id)}>
                                        Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
