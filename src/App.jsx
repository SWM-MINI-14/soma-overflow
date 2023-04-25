
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
import {useEffect, useState} from "react";
import CreatePost from "./pages/CreatePost.jsx";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    },[])

    return (
        <BrowserRouter>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
                <Route key="/" path="/" exact element={<Home/>} />
                <Route key="/questions" path="/questions/:id" element={<QuestionDetail/>} />
                <Route key="/login" path="/login" element={<Login setUser={setUser}/>} />
                <Route key="/signup" path="/signup" element={<Signup setUser={setUser}/>} />
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
