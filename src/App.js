import React from 'react';
import { Route, Routes } from "react-router-dom";
import './Styling/App.css';

import Layout from './Layout';
import Home from './Home';
import Answer from './Answer';
import Cards from './Cards';
import NotFound from './NotFound';
import LearnSet from './LearnSet'
import Create from './Create'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='create' element={<Create />}/>

        <Route path=':id' element={<LearnSet />}/>
        <Route path=':id/answer' element={<Answer />}/>
        <Route path=':id/cards' element={<Cards />}/>

        <Route path='notfound' element={<NotFound />}/>
        
      </Route>
    </Routes>
  );
}

export default App;
