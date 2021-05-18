import { Homepage } from '../mainViews/homepage'

export const logout = () => {
    sessionStorage.clear()
    localStorage.clear()
    return (
        <Homepage/>
    )
}