import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Layout from './components/Layout'
import './App.css'

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Baloo 2',
            'cursive',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#3fbac2',
        },
    },
})

function App() {
    const Input = useRef(null)
    const Image = useRef(null)
    const [message, setMessage] = useState('')

    const handleImageUpload = async () => {
        const formData = new FormData()
        formData.append('myImage', Image.current.file)
        try {
            const res = await axios.post('/image', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            if (res.status === 200) {
                console.log('POST request is successful.')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleImageSelect = e => {
        const [file] = e.target.files
        if (file) {
            const reader = new FileReader()
            const { current } = Image
            current.file = file
            reader.onload = e => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file)
            handleImageUpload()
        } else {
            console.log('No image selected')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <Router>
                    <Layout>
                        <p hidden={!message}>{`You violated ${message}`}</p>
                        <input ref={Input} type="file" accept="image/*" onChange={handleImageSelect} hidden />
                        <img ref={Image} style={{ display: 'block', margin: 'auto' }} />
                        <Switch>
                            <Route path="/new" component={SignUp} />
                            <Route path="/user/:id" component={Profile} />
                            <Route path="*" component={Home} />
                        </Switch>
                        <Fab color="primary" aria-label="add" onClick={() => Input.current.click()} style={{ position: 'fixed', bottom: '1rem', right: '1rem', color: '#fff' }}>
                            <AddIcon />
                        </Fab>
                    </Layout>
                </Router>
            </StylesProvider>
        </ThemeProvider>
    )
}

export default App
