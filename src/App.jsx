import './App.css';
import Home from './pages/home/home'
import Navbar from './components/navbar/navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home text='yo le rap'/>
    </div>
  );
}

export default App;
