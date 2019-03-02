import React from 'react';
import './app.scss';
import Footer from "../footer/footer.component";
import Header from "../header/header.component";
import SearchResults from "../search-results/search-results.component";

const App = () => (
  <div className='app'>
    <Header />

    <div className='app-container cl-md-12 col-lg-10 col-xl-9'>
      <SearchResults />
    </div>

    <Footer/>
  </div>
);

export default App;
