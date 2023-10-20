import './App.css';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

//Components
import Header from './components/shared.js/Header';
import Index from './components/Index';

function App() {
  return (
    <div className="App">
      <Header />
      <Index />
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
  );
}

export default App;
