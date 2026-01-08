import './App.css'
import { useEffect, useContext } from 'react';
import Header from './components/Header';
import Overlay from './components/Overlay';
import MainRoutes from './MainRoutes';
import SignInSelector from './components/SignInSelector';
import { Context as DataContext} from './context/DataContext';


function App() {
  const { state: {showOverlay}, setShowOverlay, setOverlayComponent} = useContext(DataContext);


  useEffect(() => {
    // setOverlayComponent(<SignInSelector />);
    // setShowOverlay(true);

  }, []);

  return (
    <>
      {
        showOverlay ? <Overlay  /> : null
      }
      <Header />
      <MainRoutes />
    </>
  );
}

export default App
