import React from 'react';
import '../../assets/styles/app.scss';
import Footer from "../footer/footer.component";
import Header from "../header/header.component";
import SearchResults from "../search-results/search-results.component";

const App = () => (
  <div className="app">
    <Header />
    <SearchResults />
    <Footer/>
  </div>
);

export default App;
