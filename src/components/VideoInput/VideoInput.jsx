import { Button } from "antd";
import { AudioOutlined, PlusOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { useReducer, useRef, useState } from 'react';

import "antd/dist/antd.css";

export const VideoInput = ({ refetch }) => {
    const [state, setState] = useState('');
    const inputRef = useRef('');

    const [addNewVideo] = useMutation(gql`
        mutation addVideoMutation($url: String!) {
            addVideo(url: $url) {
                url
            }
        }
    `);

    const handleChange = (e) => {
        setState({
            val: e.target.value
        })
        console.log(e.target.value);
    }

    const onSearch = async () => {
        const value = state.val;
        addNewVideo({
            variables: {
                url: value
            },
        });

        inputRef.current.value = '';
        refetch();
    }

    return (
        <div className="video-input__container">
            <input placeholder="input your video" className="video-search-input" ref={inputRef} onChange={handleChange}></input>
            <Button type="primary" onClick={onSearch}>КНОПКА АДД ДЛЯ ПЕПИ</Button>
        </div>

    )
};