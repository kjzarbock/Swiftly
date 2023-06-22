import { Outlet, Route, Routes } from "react-router-dom"
import { ShowList } from "../shows/ShowList.js"
import { TicketList } from "../tickets/TicketList.js"
import { TicketForm } from "../tickets/TicketForm.js"
import { Home } from "../home/Home.js"
import { About } from "../about/About.js"
import { MerchList } from "../merch/Merch.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="/" element={ <Home /> } />
                <Route path="shows" element={ <ShowList /> } />
				<Route path="tickets" element={ <TicketList /> } />
                <Route path="tickets/create" element={ <TicketForm /> } />
                <Route path="merchandise" element={ <MerchList /> } />
                <Route path="about" element={ <About /> } />
            </Route>
        </Routes>
    )
}