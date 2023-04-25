
import Home from './pages/Home.jsx';
import QuestionDetail from './pages/QuestionDetail.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route key="/" path="/" exact element={<Home/>} />
                <Route key="/questions" path="/questions/:id" element={<QuestionDetail/>} />
                <Route key="/login" path="/login" element={<Login/>} />
                <Route key="/signup" path="/signup" element={<Signup/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
