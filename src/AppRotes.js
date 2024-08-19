import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Constitute from "./Pages/Constitute";
import Voter from "./Pages/Voter";
import AddConstitute from "./Pages/AddConstitute";
import AddVoter from "./Pages/AddVoter";

const AppRotes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/constitute" element={<Constitute />} />
                <Route path="/voter" element={<Voter />} />
                <Route path="/addConstitute" element={<AddConstitute />}></Route>
                <Route path="/addVoter" element={<AddVoter />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRotes;
