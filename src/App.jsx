import React, { useState, useCallback } from 'react'
import { FiUsers } from 'react-icons/fi'
import SearchForm from './components/SearchForm'
import AddUser from './components/AddUser'
import ResultTable from './components/ResultTable'
import './styles/App.css'

// Component App: Quản lý toàn bộ state và truyền props xuống con
// State Lifting: Dữ liệu cần chia sẻ được lưu trở ở component cha
function App() {
  // State: Từ khóa tìm kiếm (được cập nhật từ SearchForm)
  const [kw, setKeyword] = useState("")
  
  // State: Người dùng mới (được cập nhật từ AddUser)
  const [newUser, setNewUser] = useState(null)

  // Callback để reset newUser sau khi thêm vào danh sách
  const handleAddComplete = useCallback(() => {
    setNewUser(null)
  }, [])

  return (
    <div>
      <h1 className="app-title">
        <FiUsers className="app-icon" />
        Quản lý người dùng - React CRUD
      </h1>
      
      {/* Action Bar: Search và Add User trên cùng 1 hàng */}
      <div className="action-bar">
        <div className="action-bar-left">
          <SearchForm onChangeValue={setKeyword} />
        </div>
        <div className="action-bar-right">
          <AddUser onAdd={setNewUser} />
        </div>
      </div>
      
      {/* ResultTable nhận keyword và newUser qua props để hiển thị/lọc */}
      <ResultTable 
        keyword={kw} 
        newUser={newUser}
        onAddComplete={handleAddComplete} 
      />
    </div>
  )
}

export default App

