import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
    AppBar,
    Button,
    SwipeableDrawer as Drawer,
    Toolbar,
    Paper, IconButton, InputBase
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import classes from '../styles/navbar.module.css'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState()
    const input = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`/me`)
            if (res.data) setUser(res.data)
        }
        getUser()
    }, [])

    const handleSubmit = () => {
        history.push(`/${input.current?.value}`)
    }

    const Searchbar = () => (
        <Paper component="form" onSubmit={handleSubmit} style={{
            margin: '0 1rem',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        }}>
            <InputBase
                style={{
                    marginLeft: '.5rem',
                    flex: 1,
                    fontSize: 'small',
                }}
                placeholder="Search username"
                inputRef={input}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" size="small" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )

    return (
        <>
            <AppBar position="static" color="transparent" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <h1 className={classes.logo}>akhl</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Searchbar />
                        {user
                            ? (
                                <>
                                    <a href={`/${user.username}`} style={{ color: '#3fbac2', marginRight: '1rem' }}>{user.username}</a>
                                    <a href="/logout">
                                        <Button className={classes.button} variant="contained" color="primary" disableElevation>
                                            Log out
                                        </Button>
                                    </a>
                                </>
                            )
                            : (
                                <>
                                    <a href="/new" style={{ color: '#3fbac2', marginRight: '1rem' }}>
                                        <Button color="primary" style={{ textTransform: 'none' }}>Sign up</Button>
                                    </a>
                                    <a href="/login">
                                        <Button className={classes.button} variant="contained" color="primary" disableElevation>Log in</Button>
                                    </a>
                                </>
                            )}
                    </div>
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
