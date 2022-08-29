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

            const res = await axios.post("https://youtube-clone-rj.herokuapp.com/upload", fd);

            setFiles(files.concat(res.data));
            console.log(res.data);
        }
    }

    const fetchFiles = useCallback(async () => {
        const res = await axios.get("https://youtube-clone-rj.herokuapp.com/files");
        setFiles(res.data);
    }, []);

    const removeFile = useCallback(
        async (filename, index) => {
            const res = await axios.delete(
                `https://youtube-clone-rj.herokuapp.com/delete/${filename}`
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
                                <source src={`https://youtube-clone-rj.herokuapp.com/read/${file.filename}`} type='video/mp4' />
                            </video>
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