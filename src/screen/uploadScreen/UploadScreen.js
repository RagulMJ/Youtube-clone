import React, { useCallback, useEffect, useState } from 'react'
import './_uploadScreen.scss'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ReactPlayer from 'react-player'

const UploadScreen = () => {

    const history = useHistory()
    const [videoFile, setVideoFile] = useState(null)
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    const fileType = ['video/mp4', 'video/mpeg', "video/x-matroska"]
    const handleFile = (e) => {
        if (e.target.files != null || e.target.files[0] != null) {
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const fd = new FormData();

            fd.append("file", file);

            const res = await axios.post("http://localhost:3003/upload", fd);

            setFiles(files.concat(res.data));
            console.log(res.data);
        }
    }

    const fetchFiles = useCallback(async () => {
        const res = await axios.get("http://localhost:3003/files");
        setFiles(res.data);
    }, []);

    const removeFile = useCallback(
        async (filename, index) => {
            const res = await axios.delete(
                `http://localhost:3003/delete/${filename}`
            );
            if (res.status === 200) {
                let temp = [...files];
                console.log(temp);
                temp.splice(index, 1);

                setFiles(temp);
            }
        },
        [files]
    );

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    return (
        <Container>
            <p className='h4 text-center'>Upload Content</p>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <input type='file' name='file' className='p-2 rounded btn btn-gray' onChange={handleFile} required />
                        <button className='btn btn-primary' type='submit'>
                            UPLOAD
                        </button>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex align-items-center justify-content-center mt-4'>
                    {files.map((file, i) => (
                        <div key={file._id} className="Item">

                            <video width={500} height={320} controls>
                                <source src={`http://localhost:3003/read/${file.filename}`} type='video/mp4' />
                            </video>
                            {/* <iframe src={`http://localhost:3003/read/${file.filename}`}
                                        frameBorder={0}
                                        title={file.filename}
                                        allowFullScreen
                                        width='500'
                                        height='300'
                                    ></iframe> */}
                            {/* <ReactPlayer controls url={`http://localhost:3003/read/${file.filename}`} /> */}
                            <p className='text-center'>{file.filename}</p>
                            <div className='text-center'>
                                <button
                                    type="button"
                                    className='btn btn-danger'
                                    onClick={() => {
                                        removeFile(file.filename, i);
                                    }}
                                >
                                    remove
                                </button>
                            </div>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default UploadScreen