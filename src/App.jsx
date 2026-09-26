import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./Pages/Navbar/Navbar";
import { Home } from "./Pages/Home_Page/Home";
import { EventDetailPage } from "./Pages/Home_Page/Event_Section/EventDetailPage";
import { Contact } from "./Pages/Home_Page/Contact_Section/Contact";
import { Members } from "./Pages/Member_Page/Members";
import { Blog } from "./Pages/Blog_Page/Blog";
import { BlogDetailPage } from "./Pages/Blog_Page/BlogDetailPage";
import { Register } from "./Pages/Register_Page/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetailPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Contact />
      </div>
    </Router>
  );
}

export default App;
