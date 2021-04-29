import React from 'react'
import TableHead from './TableHead';
import './Table.css'
function Table(props) {
    return (
        <section className="table">
            <TableHead />
            <div className="t-body" style={{ maxHeight: '70vh', overflowY: 'auto'}}>
                {props.children}
            </div>
        </section>
    )
}

export default Table
