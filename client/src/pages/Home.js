import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import axios from 'axios'
import Layout from '../components/Layout'
import Feed from '../components/Feed'
import classes from '../styles/home.module.css'

const Home = () => {
    const Image = useRef(null)
    const [message, setMessage] = useState('')
    const handleClick = async () => {
        if (!Image.current.file) {
            console.log('NO IMAGE')
            return
        }
        handleImageUpload()
        // upload the image to the aws s3 to get the url of image <- should it be?
        // using url, send a get request
        // if 200 - isSafe, go to the upload process
        // if 200 - !isSafe, display the failure message with reason.
        // try {
        //     const res = await axios.get(`/nsfwCheck?url=${violatedUrl}`);
        //     if (res.data.isSafe) {
        //         // go to the upload process
        //         // using fs in node to send path to the backend
        //         setMessage('Image successfully uploaded');
        //     } else {
        //         setMessage(res.data.message);
        //     }
        //     return res.data.isSafe;
        // } catch (err) {
        //     console.error(err);
        // }
    }

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
        }
    }

    const HomePage = () => (
        <Layout>
            <p hidden={!message}>
                You violated
                {message}
            </p>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            <img ref={Image} />
            <Button variant="outlined" onClick={handleClick} style={{ margin: '1rem auto' }}>Upload Image</Button>
            <h1 className={classes.logo}>akhl</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/new">
                    <Button variant="contained" color="primary" style={{ color: '#fff', fontWeight: 'bold', textTransform: 'capitalize', width: 150, margin: 5 }} disableElevation>Sign Up</Button>
                </Link>
                <Button variant="outlined" color="primary" style={{ fontWeight: 'bold', textTransform: 'capitalize', width: 150, margin: 5 }}>Log In</Button>
            </div>
            <div style={{ padding: 24 }}>
                <Feed />
            </div>
        </Layout>
    )
    return <HomePage />
}

export default Home
