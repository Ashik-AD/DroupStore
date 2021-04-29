import React from 'react'
import Title from './Title';

function DetailList({list}) {
    return (
        <div>
            <Title title="Details" />
            <ul style={{paddingLeft: 10, fontSize: 14, fontWeight: 500, color: '#686861'}}>
                {
                    list.map((ls, id) => {
                        return <li key={id} style={{ margin: '5px 0'}}>{ls}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default DetailList
