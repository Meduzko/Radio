import React from 'react';
import { Video } from '../Video/index';
import { List, Avatar, Skeleton  } from 'antd';
import { gql, useMutation } from '@apollo/client';

export const VideoList = ({ videos, refetch }) => {
    const [deleteVideos] = useMutation(gql`
        mutation deleteVideoMutation($id: ID!) {
            deleteVideos(id: $id) {
                id
            }
        }
    `);

    const handleDelete = (id) => {
        deleteVideos({
            variables: {
                id: id
            },
        })

        console.log(id);
        refetch();
    };

    const videoList = videos ? 
        videos.map((item) => {
            return <div key={item.id} url={item.url} onClick={()=> handleDelete(item.id)}/>
        }) 
        : null;
   

     return (
        <div className='video-list'>
            <h4>Video list component</h4>
            <List dataSource={videoList} itemLayout="horizontal" renderItem={item => (
                <List.Item>
                    <List.Item.Meta 
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href={item.props.url}>{item.props.url}</a>}
                        description=""
                    />
                    <div className="delete-video-btn" onClick={item.props.onClick}>Delete</div>
                </List.Item>)}
            />
        </div>
    )
}