import React from 'react';
import { Route, Routes } from "react-router-dom";
import './Styling/App.css';

import Layout from './Layout';
import Home from './Home';
import LearnSet from './LearnSet';
import Answer from './Answer';
import Cards from './Cards';
import Choose from './Choose';
import NotFound from './NotFound';


function App() {
  return (
    <Routes>

      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='learnset/:learnset_id' element={<LearnSet />}>
          <Route path='answer' element={<Answer />}/>
          <Route path='cards' element={<Cards />}/>
          <Route path='choice' element={<Choose />}/>
        </Route>
        <Route path='notfound' element={<NotFound />}/>
        <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
