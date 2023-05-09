import {createContext, useReducer} from 'react'

export const BlogsContext = createContext();

// main function of this is just to keep the local state (site) in sync with the database
// so only this only alters the CURRENT visuals, so the website updates

export const blogsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_BLOGS':
            return {
                blogs: action.payload
            }
        case 'CREATE_BLOG':
            return{
                blogs:[action.payload, ...state.blogs]
            }
        case 'DELETE_BLOG':
            return {
                workouts: state.blogs.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const BlogsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(blogsReducer, {
        blogs: null
    })

    return (
        <BlogsContext.Provider value={{...state, dispatch}}>
            { children }
        </BlogsContext.Provider>
    )
}