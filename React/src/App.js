
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./main";
import Video from "./components/video/video";
import VideoPage from "./components/pages/video/video";
import Menu from "./components/menu/menu";
import SearchPage from "./components/pages/search/search";
import LoginPage from "./components/pages/login/login";
import RegisterPage from "./components/pages/register/register";
import {LINKS} from "./router";
import IndexPage from "./components/pages/index";
import {API} from "./api";
import ListPage from "./components/pages/list/list";

function App() {

    return (
        <>

            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path={LINKS.INDEX} element={<IndexPage />}></Route>
                    <Route path={LINKS.VIDEO + ':id'} element={<VideoPage />}></Route>
                    <Route path={LINKS.SEARCH + ':string'} element={<SearchPage />}></Route>
                    <Route path={LINKS.LOGIN} element={<LoginPage />}></Route>
                    <Route path={LINKS.REGISTER} element={<RegisterPage />}></Route>

                    <Route path={LINKS.GENRE + ":id"} element={<ListPage link={API.GENRE} />}></Route>
                    <Route path={LINKS.ACTOR + ":id"} element={<ListPage link={API.ACTOR} />}></Route>
                    <Route path={LINKS.PRODUCER + ":id"} element={<ListPage link={API.ACTOR} />}></Route>
                    <Route path={LINKS.COUNTRY + ":id"} element={<ListPage link={API.COUNTRY} />}></Route>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
