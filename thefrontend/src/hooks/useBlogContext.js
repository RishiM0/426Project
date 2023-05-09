import { BlogsContext } from "../context/BlogsContext";
import { useContext } from "react";

export const useBlogsContext = () => {
    const context = useContext(BlogsContext)

    if (!context) {
        throw Error('useBlogsContext is to be used in a BlogsContextProvider')
    }

    return context
}