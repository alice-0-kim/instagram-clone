import React, { useRef } from 'react'
import Layout from '../components/Layout'
import { Button, Input } from '@material-ui/core'

const Home = () => {
    const Image = useRef(null)
    const handleClick = () => {
        console.log(Image.current?.value)
    }
    const HomePage = () => {
        return <Layout>
            <h1>Home page</h1>
            <Input inputRef={Image} fullWidth />
            <Button variant="outlined" onClick={handleClick} style={{ margin: '1rem auto' }}>Upload Image</Button>
        </Layout>
    }
    return <HomePage />
}

export default Home
