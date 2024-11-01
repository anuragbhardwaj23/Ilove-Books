import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://bookstore-server-po8m.onrender.com/api/v1/allbooks');
        setBooks(res.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-gray-100">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Books List</h1>
        <Link to="/create">
          <button className="flex items-center bg-green-500 hover:bg-green-600 text-gray-100 font-semibold px-3 py-1 rounded-lg">
            <MdOutlineAddBox className="text-xl mr-1" />
            Add Book
          </button>
        </Link>
      </header>

      <div className="mt-4 flex justify-center items-center gap-x-4">
        <button
          className={`${
            showType === 'table' ? 'bg-sky-600' : 'bg-sky-300 hover:bg-sky-600'
          } px-4 py-1 rounded-lg text-gray-100 font-semibold`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`${
            showType === 'card' ? 'bg-sky-600' : 'bg-sky-300 hover:bg-sky-600'
          } px-4 py-1 rounded-lg text-gray-100 font-semibold`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'card' ? (
        <BooksCard books={books} />
      ) : (
        <BooksTable books={books} />
      )}
    </div>
  );
};

export default Home;
