import { Outlet, Route, Routes } from "react-router-dom"
import { ShowList } from "../shows/ShowList.js"
import { TicketList } from "../tickets/TicketList.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1></h1>
                    <div className="tag"></div>

                    <Outlet />
                </>
            }>
                <Route path="shows" element={ <ShowList /> } />
				<Route path="tickets" element={ <TicketList /> } />
            </Route>
        </Routes>
    )
}