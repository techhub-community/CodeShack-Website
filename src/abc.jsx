import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Navigation Component
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-xl font-bold cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            &lt;CodeShack/&gt;
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-black font-semibold' : 'text-gray-600'} hover:text-black`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('members')}
              className={`${currentPage === 'members' ? 'text-black font-semibold' : 'text-gray-600'} hover:text-black`}
            >
              Members
            </button>
            <button
              onClick={() => setCurrentPage('blogs')}
              className={`${currentPage === 'blogs' ? 'text-black font-semibold' : 'text-gray-600'} hover:text-black`}
            >
              Blogs
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <button
              onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-600 hover:text-black"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('members'); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-600 hover:text-black"
            >
              Members
            </button>
            <button
              onClick={() => { setCurrentPage('blogs'); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-600 hover:text-black"
            >
              Blogs
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">CONNECT</h3>
            <p className="text-sm text-gray-600">Follow us on social media</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-sm text-gray-600">Location details</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Follow us on</h3>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="text-center border-t pt-4">
          <p className="text-2xl font-bold mb-2">&lt;CODESHACK/&gt;</p>
          <p className="text-sm text-gray-600">© 2025 CodeShack. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">&lt;CODESHACK/&gt;</h1>
        <p className="text-xl text-gray-600">Build. Learn. Grow. Together.</p>
      </div>
    </section>
  );
};

// Mission Section Component
const MissionSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <h3 className="text-3xl font-semibold mb-2">Motivation/Purpose</h3>
          <h3 className="text-3xl font-semibold mb-4">of our club</h3>
          <p className="text-gray-600">Then explaining about our free clubs - SLUG and TECHCLUB</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 rounded-lg">
            <div className="w-16 h-16 bg-red-500 rounded-full mb-4"></div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <div className="w-16 h-16 bg-red-500 rounded-full mb-4"></div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Events Section Component
const EventsSection = ({ setCurrentPage, setSelectedEvent }) => {
  const events = [
    { id: 1, name: 'HackNocturne', description: 'Description Text' },
    { id: 2, name: 'CodeCafe', description: 'Description Text' },
    { id: 3, name: 'TechVisions', description: 'Description Text' },
    { id: 4, name: 'CBDC', description: 'Description Text' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2">Events</h2>
        <p className="text-gray-600 mb-8">Description Text</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setCurrentPage('event-detail');
              }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="bg-red-300 h-48 flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              <div className="p-4 bg-gray-100">
                <h3 className="font-semibold mb-1">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage, setSelectedEvent }) => {
  return (
    <div>
      <HeroSection />
      <MissionSection />
      <EventsSection setCurrentPage={setCurrentPage} setSelectedEvent={setSelectedEvent} />
    </div>
  );
};

// Members Page Component
const MembersPage = () => {
  const members = Array(6).fill(null).map((_, i) => ({
    id: i + 1,
    name: 'Name',
    role: '<Role>'
  }));

  return (
    <div className="min-h-screen">
      <div className="bg-cyan-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Members</h1>
          <p className="text-gray-700">[group photo of codeshack]</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Batch of 2024</h2>
          <select className="border border-gray-300 rounded px-4 py-2">
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-64"></div>
              <div className="p-4 bg-gray-100">
                <h3 className="font-semibold text-center mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 text-center">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Blogs Page Component
const BlogsPage = ({ setCurrentPage, setSelectedBlog }) => {
  const blogs = Array(9).fill(null).map((_, i) => ({
    id: i + 1,
    title: 'Title',
    domain: 'Domain'
  }));

  return (
    <div className="min-h-screen">
      <div className="bg-cyan-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Blogs</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Filter By</h2>
          <select className="border border-gray-300 rounded px-4 py-2 bg-gray-100">
            <option>Category</option>
            <option>Tech</option>
            <option>Design</option>
            <option>Development</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => {
                setSelectedBlog(blog);
                setCurrentPage('blog-detail');
              }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="bg-gray-200 h-48"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Blog Detail Page Component
const BlogDetailPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-cyan-300 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Blog Title</h1>
          <div className="flex items-center space-x-3">
            <p className="text-gray-700">Written with ❤️ by</p>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-pink-300 rounded-full"></div>
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-sm text-gray-600">Batch of 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Content</h2>
          <div className="space-y-4 text-gray-700">
            <p>Blog content goes here...</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600">Written by Name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Event Detail Page Component
const EventDetailPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-100 rounded-lg p-8 mb-8">
          <p className="text-center text-gray-500 mb-8">[Background image of the event]</p>
          <h1 className="text-5xl font-bold text-center mb-8">HACKNOCTURNE</h1>
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700">Text Description including date time registration links</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            setSelectedEvent={setSelectedEvent}
          />
        )}
        {currentPage === 'members' && <MembersPage />}
        {currentPage === 'blogs' && (
          <BlogsPage 
            setCurrentPage={setCurrentPage}
            setSelectedBlog={setSelectedBlog}
          />
        )}
        {currentPage === 'blog-detail' && <BlogDetailPage blog={selectedBlog} />}
        {currentPage === 'event-detail' && <EventDetailPage event={selectedEvent} />}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;