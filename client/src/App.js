import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'
import Home from './pages/Home'
import NotFound from './pages/404'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Setup from './pages/Setup'
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
                        <Route path="/new" component={SignUp} />
                        <Route path="/set" component={Setup} />
                        <Route path="/login" component={Login} />
                        <Route path="/:id">
                            <Layout>
                                <Profile />
                            </Layout>
                        </Route>
                        <Route exact path="/">
                            <Layout>
                                <Home />
                            </Layout>
                        </Route>
                        <Route path="*">
                            <Layout>
                                <NotFound />
                            </Layout>
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </ThemeProvider>
    )
}

export default App
