import React, { useReducer, useMemo, useEffect } from 'react';
import { VideoList } from '../VideoList/index';
import { VideoPlayer } from '../VideoPlayer/index';
import { VideoInput } from '../VideoInput/index';
import { gql, useQuery } from '@apollo/client';

import style from './style.css';
import { reducer, initialState } from './reducer';

const GET_VIDEOS = gql`
    query Videos {
        getVideos {
            id
            url
        }
    }
`;

export const Player = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, error, data, refetch } = useQuery(GET_VIDEOS);

    useEffect(() => {
        if (data) {
            const responce = data ? data.getVideos : null;
            dispatch({ type: 'SET_ALL_VIDEOS', payload: responce });
        }
    }, [data]);

    if (loading) {
        return <h2>Loading...</h2>
    }
    
    if (error) {
        return (
            <div>
                <h2>Oops!</h2> 
                <h3>Something went wrong</h3>
            </div>
        )
    }

    console.log('Data from useQuery from Player component ' + ' ' + data);
    console.log('Test log');

    const fetchedData = data ? data.getVideos : null;

    if (!state.cachedVideos) {
        dispatch({ type: 'SET_CACHED_VIDEOS', payload: fetchedData });
    }

    const cachedVideoUrls = state.cachedVideos || fetchedData;

    return (
        <div className='player-component'>
            <div className='player-header'>
                <h3>Player video component</h3>
            </div>
            <div className='player-main'>
                <VideoPlayer videos={cachedVideoUrls} refetch={refetch} />
                <VideoList videos={fetchedData} refetch={refetch} />
            </div>
            <VideoInput refetch={refetch} />
        </div>
    )
}
