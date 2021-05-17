import { Homepage } from '../mainViews/homepage'

export const logout = () => {
    sessionStorage.clear()
    return (
        <Homepage/>
    )
}