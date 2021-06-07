import { useEffect, useReducer, useCallback } from 'react';
import { server } from '../../api/server';

import { reducer, initialState } from './reducer';

export const useFetch = (query) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetch = useCallback(() => {
        const fetchApi = async () => {
            try {
                dispatch({type: 'FETCH'});
                const { data, errors } = await server.fetch({ query });

                if (errors && errors.length) {
                    throw new Error(errors[0].message);
                }

                dispatch({type: 'FETCH_SUCCESS', payload: data})
            } catch (err) {
                dispatch({ type: 'FETCH_ERROR'});
                throw console.error(err);
            }

        };

        fetchApi();
    }, [query]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...state, refetch: fetch };
};
