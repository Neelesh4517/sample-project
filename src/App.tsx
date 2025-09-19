import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./basicpage";

const App: React.FC = () => {
  return (<>

    <Router basename="/sample-project">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
