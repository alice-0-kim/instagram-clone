import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    AppBar,
    Button,
    SwipeableDrawer as Drawer,
    Toolbar,
} from '@material-ui/core'
import classes from '../styles/navbar.module.css'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`/me`)
            if (res.data) setUser(res.data)
        }
        getUser()
    }, [])

    return (
        <>
            <AppBar position="static" color="transparent" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <h1 className={classes.logo}>akhl</h1>
                    {user
                        ? (
                            <div style={{
                                display: 'flex', minWidth: 185, color: '#3fbac2', alignItems: 'center', fontWeight: 700, justifyContent: 'space-between',
                            }}
                            >
                                <span>{`Hello, ${user.givenName}!`}</span>
                                <a href="/logout">
                                    <Button className={classes.button} variant="contained" color="primary" disableElevation>
                                        Log out
                                    </Button>
                                </a>
                            </div>
                        )
                        : (
                            <div style={{ display: 'flex', minWidth: 165, justifyContent: 'space-between' }}>
                                <a href="/new">
                                    <Button color="primary" style={{ fontWeight: 700, textTransform: 'none' }}>
                                        Sign up
                                    </Button>
                                </a>
                                <a href="/login">
                                    <Button className={classes.button} variant="contained" color="primary" disableElevation>
                                        Log in
                                    </Button>
                                </a>
                            </div>
                        )}
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                onOpen={() => { }}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: { width: 200 },
                }}
            >
                Drawer
            </Drawer>
        </>
    )
}

export default Navbar
