import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Router from './routes';
import { useAuthStore } from './store/store';

function App() {
  const initFromStorage = useAuthStore((state) => state.initFromStorage);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  return (
    <>
      <Router />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
