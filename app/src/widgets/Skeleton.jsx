import React from 'react'

function Skeleton({ className, width , height }) {
    return (
        <div className={`Skeleton ${className}`} style={{ height, width }}></div>
    )
}

export default Skeleton