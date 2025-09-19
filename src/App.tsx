import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./basicpage";
// import ProductsPage from "./basicpage";

const App: React.FC = () => {
  return (<>
    <div>
      <h1>Hello, World!</h1>
      <p>This is a simple React + TypeScript app powered by Vite.</p>
    </div>
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
