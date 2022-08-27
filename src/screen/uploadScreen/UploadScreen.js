import React, { useCallback, useEffect, useState } from 'react'
import './_uploadScreen.scss'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

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
    console.log(files)

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
        console.log(res.data);
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
                        <input type='file' name='file' className='p-2 rounded' onChange={handleFile} required />
                        <button className='upload__button' type='submit'>
                            UPLOAD
                        </button>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3}>
                    {files.map((file, i) => (
                        <div key={file._id} className="Item">
                            <Row>
                                <Col>
                                    <video width={320} height={240} controls>
                                        <source src={`http://localhost:3003/read/${file.filename}`} type='video/mp4' />
                                        {/* <a
                                        className="Link"
                                        href={`http://localhost:3001/read/${file.filename}`}
                                        > */}
                                        {/* </a> */}
                                    </video>
                                </Col>
                                <Col>
                                    <p className='text-center'>{file.filename}</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            removeFile(file.filename, i);
                                        }}
                                    >
                                        remove
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default UploadScreen