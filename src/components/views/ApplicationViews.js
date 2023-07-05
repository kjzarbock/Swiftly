import { Outlet, Route, Routes } from "react-router-dom"
import { ShowList } from "../shows/ShowList.js"
import { TicketList } from "../tickets/TicketList.js"
import { TicketForm } from "../tickets/TicketForm.js"
import { Home } from "../home/Home.js"
import { About } from "../about/About.js"
import { MerchList } from "../merch/Merch.js"
import { useState } from "react"
import { useEffect } from "react"


export const ApplicationViews = () => {
  
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shows" element={<ShowList />} />
          <Route path="tickets" element={<TicketList />} />
          <Route path="tickets/create" element={<TicketForm />} />
          <Route path="merchandise" element={<MerchList />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    );
  };
  