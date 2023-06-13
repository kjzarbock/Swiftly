import { Outlet, Route, Routes } from "react-router-dom"
import { ShowList } from "../shows/ShowList.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Shows</h1>
                    <div className="tag">Here's where you can catch Taylor Swift's Eras Tour</div>

                    <Outlet />
                </>
            }>
                <Route path="shows" element={ <ShowList /> } />
            </Route>
        </Routes>
    )
}