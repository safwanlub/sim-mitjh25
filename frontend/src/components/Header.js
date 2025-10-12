import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SIM Sekolah</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Selamat Datang, Admin</span>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
