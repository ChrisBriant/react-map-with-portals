import { Routes, Route} from "react-router-dom";
import Layout from './layout/Layout';
import Home from "./screens/Home";
import Auth from "./screens/Auth";
import TestScreen from "./screens/TestScreen";


const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/auth" element={<Auth />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/authdiscord" element={<Auth />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/authgoogle" element={<Auth />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/testscreen" element={<TestScreen />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </>
    );
}


export default MainRoutes;