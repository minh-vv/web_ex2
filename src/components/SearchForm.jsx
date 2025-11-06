import React from 'react'
import { FiSearch } from 'react-icons/fi'
import '../styles/SearchForm.css'

// Component SearchForm: Nhận input từ người dùng để tìm kiếm
// Logic: Truyền dữ liệu tìm kiếm từ con → cha → bảng kết quả
function SearchForm({ onChangeValue }) {
  return (
    <div className="search-form">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input 
          type="text"
          className="search-input"
          placeholder="Tìm theo name, username..."
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchForm

