import axios from 'axios'

const request = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:"AIzaSyCSoOAPp4kBs-RBJwVc6hQey9SxCeF1R_U",
    }
})

// const request = axios.create({
//     baseURL:'https://youtube.googleapis.com/youtube/v3/',
//     params:{
//         key:"AIzaSyCDtmTUh6oHbYD_567bTlQhi0YqSFwbtf0",
//     }
// })
export default request