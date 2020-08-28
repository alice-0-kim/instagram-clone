import React, { useRef } from 'react'

const ImageUploader = () => {
    const Image = useRef(null)
    const ImageRef = useRef(null)

    // https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc
    const handleImageUpload = e => {
        const [file] = e.target.files
        if (file) {
            const reader = new FileReader()
            const { current } = Image
            current.file = file
            reader.onload = e => current.src = e.target.result
            reader.readAsDataURL(file)
        }
    }

    return (
        <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={handleImageUpload}
            ref={ImageRef}
            style={{ display: 'none' }}
        />
    )
}

export default ImageUploader
