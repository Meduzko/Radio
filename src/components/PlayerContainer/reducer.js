export const initialState = {
    allVideos: null,
    currentVideoList: null,
    defaultVideoID: 'https://youtu.be/qUnF9oPMFSU',
    cachedVideos: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_VIDEOS':
                return {
                    ...state, 
                    allVideos: action.payload 
                };    
        case 'SET_CACHED_VIDEOS':
            return {
                ...state,
                cachedVideos: action.payload
            };    
        case 'GET_VIDEO':
            return {
                data: () => state.allVideos.find(item => item === action.payload)
        };
        case 'GET_ALL_VIDEOS':
            return {
                ...state.allVideos
            };
        case 'UPDATE_CACHED_VIDEOS': 
            return {
                ...state,
                cachedVideos: [...new Set([...state.allVideos, ...state.cachedVideos])]   
            }    
        case 'DELETE_CURRENT_VIDEO':
            return {
                ...state,
                cachedVideos: state.cachedVideos.filter((item) => item.id !== action.payload.id)
            }    
        default:
            throw new Error();
    }
};