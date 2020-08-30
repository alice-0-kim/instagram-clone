import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'
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
    return (
        <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <Router>
                    <Switch>
                        <Route path="/login" component={SignUp} />
                        <Route path="/:id">
                            <Layout>
                                <Profile />
                            </Layout>
                        </Route>
                        <Route path="*">
                            <Layout>
                                <Home />
                            </Layout>
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </ThemeProvider>
    )
}

export default App
