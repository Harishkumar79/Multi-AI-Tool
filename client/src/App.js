import './App.css';
import Home from './components/Home';
import HelpPage from './components/HelpPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/help" element={<HelpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
