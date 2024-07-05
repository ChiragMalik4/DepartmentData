import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import SecondPage from './pages/SecondPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
