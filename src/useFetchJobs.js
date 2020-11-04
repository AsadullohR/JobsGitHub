import { useReducer, useEffect} from "react"
import axios from 'axios'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"

function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return{ loading: true, jobs: []}
        case ACTIONS.GET_DATA:
            return{...state, loading: false, jobs: action.playload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.playload.error, jobs:[]}  
        default:
            return state 
    }
}

export default function useFetchJobs(params , page){
   const [state, dispatch] = useReducer(reducer, {jobs: [], loading: true})

   useEffect(() => {
       const cancelToken = axios.cancelToken.source()
       dispatch({true: ACTIONS.MAKE_REQUEST})
       axios.get(BASE_URL, {
           cancelToken: cancelToken.cancelToken,
           params: {markdown: true, page: page, ...params}
       }).then(res => {
           dispatch({type: ACTIONS.GET_DATA, playload: {jobs: res.data}})
       }).then(e => {
           if(axios.isCancel(e)) return
           dispatch({type: ACTIONS.ERROR, playload: {error: e }})
       })

       return () => {
           cancelToken.cabcel()
       }
   }, [params, page])

    return state
    
}