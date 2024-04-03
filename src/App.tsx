import './App.css';
import { BoardOverview } from './BoardOverview';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BoardRouter } from './BoardRouter';
import { FavoriteBusstops } from './FavoriteBusstops';

const router = createBrowserRouter([{ 
  path: '/',
  element: <FavoriteBusstops />
},
{
  path: '/busstop/:busStopId',
  element: <BoardRouter/>
}
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
