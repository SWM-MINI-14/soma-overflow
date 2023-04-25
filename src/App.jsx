
import Home from './pages/Home.jsx';
import QuestionDetail from './pages/QuestionDetail.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import {useState} from "react";

function App() {
    const [user, setUser] = useState();

    return (
        <BrowserRouter>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
                <Route key="/" path="/" exact element={<Home/>} />
                <Route key="/questions" path="/questions/:id" element={<QuestionDetail/>} />
                <Route key="/login" path="/login" element={<Login setUser={setUser}/>} />
                <Route key="/signup" path="/signup" element={<Signup setUser={setUser}/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
