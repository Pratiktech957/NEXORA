import { Routes, Route } from "react-router-dom";

import Intro from "./components/Intro";

import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <Intro />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/projects/:projectId"
                    element={<ProjectDetails />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;