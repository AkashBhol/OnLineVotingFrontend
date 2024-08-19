import logo from './logo.svg';
import './App.css';
import MainLayout from './Components/MainLayout';
import AppRotes from './AppRotes';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/MainContent';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <MainLayout />
        <AppRotes />
      </SnackbarProvider>
    </div>
  );
}

export default App;
