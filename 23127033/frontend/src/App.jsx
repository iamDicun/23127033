
import ApiContext from './ApiContext';
import List from './List';
import Create from './Create';
import Detail from './Detail';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const apiUrl = 'http://localhost:4000';
  const apiKey = 'btvn';

  return (
    <ApiContext.Provider value={{ url: apiUrl, key: apiKey }}>
      <Router>
        <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">🎫 Ticket Management System</h1>
              <div className="flex space-x-3">
                <Link
                  to="/"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                >
                  📋 Danh sách Tickets
                </Link>
                <Link
                  to="/create"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm"
                >
                  ➕ Tạo Ticket mới
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<List />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/tickets/:id' element={<Detail />}></Route>
        </Routes>
      </Router>
    </ApiContext.Provider>
  )
}

export default App
