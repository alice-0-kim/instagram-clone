import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const NotFoundPage = () => (
        <>
            <p>Sorry, this page isn't available.</p>
            <p>
                The link you followed may be broken, or the page may have been removed.
                <Link to="/">Go back to home.</Link>
            </p>
        </>
    )
    return <NotFoundPage />
}

export default NotFound
