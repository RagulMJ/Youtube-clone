import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useDispatch, useSelector} from 'react-redux'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'
import Video from '../../components/video/Video'
import { getLikedVideos } from '../../redux/actions/videos.action'

const LikedScreen = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLikedVideos())
    },[dispatch])
    const {videos,loading} = useSelector(state => state.likedVideos)
  return (
    <Container>
      <InfiniteScroll
        dataLength={videos.length}
        hasMore={true}
        loader={
          <div className='spinner-border text-danger d-block d-block mx-auto'></div>
        }
        className='row'>
        {!loading ? (videos.map((video) => (
          <Col lg={3} md={4}>
            <Video video={video} key={video.id} />
          </Col>
        ))
        ) : (
          [...Array(20)].map(() => (
            <Col lg={3} md={4}>
              <SkeletonVideo/>
            </Col>
          )

          )
        )
        }

      </InfiniteScroll>
    </Container>
  )
}

export default LikedScreen