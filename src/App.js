import React from 'react';
import { Route, Routes } from "react-router-dom";
import './Styling/App.css';

import Layout from './Layout';
import Home from './Home';
import Answer from './Answer';
import Cards from './Cards';
import Choose from './Choose';
import NotFound from './NotFound';
import LearnSet from './LearnSet'
import CreateLearnSet from './CreateLearnSet'



/* TODO 

Change Paths:

/:learnset_id  <LearnSet />

/:learnset_id/learnset
/:learnset_id/answer
/:learnset_id/cards
/:learnset_id/choose


*/


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='create' element={<CreateLearnSet />}/>

        <Route path=':id' element={<LearnSet />}/>
        <Route path=':id/answer' element={<Answer />}/>
        <Route path=':id/cards' element={<Cards />}/>
        <Route path=':id/choice' element={<Choose />}/>

        <Route path='notfound' element={<NotFound />}/>
        
      </Route>
    </Routes>
  );
}

export default App;
