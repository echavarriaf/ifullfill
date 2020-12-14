import React from 'react'
import './GlobalFilter.css'

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="demand">
            <input className="search" placeholder="Search by any column" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
        </div>
    )
}
