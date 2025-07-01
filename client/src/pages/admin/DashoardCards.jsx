import React from 'react'
import { Link } from 'react-router-dom'

function DashoardCards({ value, label, buttonText, link }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800">
        {value}
      </h2>
      <p className="bg-gray-100 w-full py-3 rounded my-4 text-gray-600">{label}</p>
      {link ? (
        <Link to={link}>
          <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            {buttonText}
          </button>
        </Link>
      ) : (
        <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded cursor-not-allowed opacity-50">
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default DashoardCards
