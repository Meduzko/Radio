import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { gql, useMutation } from '@apollo/client';
import style from './style.css';

export const VideoPlayer = ({ videos, refetch }) => {
    const [state, setState] = useState('');
    const playerRef = useRef(null);

    const videoURLS = videos && videos.map((item) => item.url);

    const [deleteVideos] = useMutation(gql`
        mutation deleteVideoMutation($id: ID!) {
            deleteVideos(id: $id) {
                id
            }
        }
    `);
    
    const handleDelete = async (id) => {
        try {
            const { data } = await deleteVideos({
                variables: {
                    id: id
                },
            });

            console.log('Deleted video after video ended ' + ' ' + data);
            window.location.reload();
        } catch(e) {
            console.log(e);
        }

    };

    const getPlayerVideoId = () => {
        const player = playerRef.current.player.player.player;
        const videoData = player.getVideoData();

        return videoData.video_id;
    };

    const getVideo = () => {
        const videoId = `https://youtu.be/${getPlayerVideoId()}`

        return videos.find(el => el.url === videoId);
    };
    
    const handleEnded = () => {
        handleDelete(state.id);
    };

    const handleStart = () => {
        setState(getVideo());
    };

    const handlePlay = () => {};

    return (
        <div>
            <h4>Here will be Youtube video player</h4>
            <div className="video-responsive">
                <div className='player-wrapper'>
                    <ReactPlayer width="860px" 
                                 height="500px"
                                 playing 
                                 url={videoURLS} 
                                 controls={true}
                                 onStart={handleStart}
                                 onEnded={handleEnded}
                                 onPlay={handlePlay} 
                                 ref={playerRef} />
                </div>
            </div>
        </div>
    )
};