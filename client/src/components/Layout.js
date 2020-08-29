import React from 'react'

const Layout = ({ children }) => (
    <>
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 528,
                padding: `0 1.0875rem 1.45rem`,
            }}
        >
            <main>{children}</main>
        </div>
    </>
)

export default Layout
