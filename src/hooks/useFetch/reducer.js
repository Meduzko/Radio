export const initialState = {
    data: null,
    loading: false,
    error: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH':
            return { 
                ...state, 
                loading: true 
            };
        case 'FETCH_SUCCESS':
            return { 
                data: action.payload, 
                loading: false, 
                error: false 
            };
        case'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            throw new Error();
    }
};