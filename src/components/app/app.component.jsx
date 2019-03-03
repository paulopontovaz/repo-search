import React from 'react';
import './app.scss';
import Footer from "../footer/footer.component";
import Header from "../header/header.component";
import SearchResults from "../search-results/search-results.component";

const App = () => (
  <div data-test="component-app" className='app'>
    <Header data-test="app-header" />

    <div className='app-container cl-md-12 col-lg-10 col-xl-9'>
      <SearchResults data-test="search-results" />
    </div>

    <Footer data-test="app-footer" />
  </div>
);

export default App;
