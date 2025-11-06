import React, { useState, useEffect } from 'react'
import { 
  FiList, 
  FiEdit2, 
  FiTrash2, 
  FiSave, 
  FiX, 
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiMapPin,
  FiHome,
  FiSearch,
  FiAlertCircle,
  FiLoader
} from 'react-icons/fi'
import '../styles/ResultTable.css'

// Component ResultTable: Hiển thị, lọc, sửa, xóa người dùng
function ResultTable({ keyword, newUser, onAddComplete }) {
  // State: Danh sách người dùng từ API
  const [users, setUsers] = useState([])
  
  // State: Trạng thái đang tải dữ liệu
  const [loading, setLoading] = useState(true)
  
  // State: Người dùng đang được sửa (Deep Copy để tránh tham chiếu)
  const [editing, setEditing] = useState(null)
  
  // State: ID người dùng đang bị xóa (để hiệu ứng fade out)
  const [deletingId, setDeletingId] = useState(null)

  // Tải dữ liệu 1 lần khi component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu:", error)
        setLoading(false)
      })
  }, []) // Dependency array rỗng → chỉ chạy 1 lần

  // Lắng nghe người dùng mới từ props và thêm vào danh sách
  useEffect(() => {
    if (newUser) {
      // Thêm người dùng mới với ID tự động tăng
      setUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }])
      // Gọi callback để reset state newUser ở App
      onAddComplete()
    }
  }, [newUser, onAddComplete]) // Chạy khi newUser thay đổi

  // Lọc danh sách theo keyword
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  )

  // Hàm sửa người dùng - Deep Copy để tránh tham chiếu
  const editUser = (user) => {
    // Phải sao chép cả user và address (nested object)
    setEditing({ ...user, address: { ...user.address } })
  }

  // Xử lý thay đổi khi sửa - Hỗ trợ nested state
  const handleEditChange = (field, value) => {
    // Nếu là trường trong address (nested)
    if (["street", "suite", "city"].includes(field)) {
      setEditing({ ...editing, address: { ...editing.address, [field]: value } })
    } else {
      // Trường thông thường
      setEditing({ ...editing, [field]: value })
    }
  }

  // Lưu sau khi chỉnh sửa
  const saveUser = () => {
    // Validate
    if (editing.name === "" || editing.username === "") {
      alert("Vui lòng nhập Name và Username!")
      return
    }

    // Dùng map để tìm và thay thế user có id tương ứng
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u))
    
    // Đóng form sửa
    setEditing(null)
  }

  // Hủy sửa
  const cancelEdit = () => {
    setEditing(null)
  }

  // Đóng modal bằng phím ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && editing) {
        cancelEdit()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [editing])

  // Hàm xóa người dùng - Dùng filter() để tạo mảng mới
  const removeUser = (id) => {
    // PHIÊN BẢN ĐƠN GIẢN (theo tài liệu):
    // setUsers((prev) => prev.filter((u) => u.id !== id))
    
    // PHIÊN BẢN CÓ ANIMATION (nâng cao):
    // Hiệu ứng fade out trước khi xóa
    setDeletingId(id)
    
    // Delay để hiển thị animation
    setTimeout(() => {
      // Giữ lại tất cả người dùng có id khác với id cần xóa
      // Dùng functional update (prev) để đảm bảo dùng state mới nhất
      setUsers((prev) => prev.filter((u) => u.id !== id))
      setDeletingId(null)
    }, 300)
    
    // Lưu ý:
    // - React không cho phép chỉnh sửa trực tiếp state
    // - filter() tạo một mảng mới không chứa phần tử có id trùng
    // - setUsers((prev) => ...) đảm bảo dùng phiên bản users mới nhất
  }

  // Hiển thị loading
  if (loading) {
    return (
      <div className="result-table">
        <div className="result-table-header">
          <FiList className="icon" />
          <h3>Danh sách người dùng</h3>
        </div>
        <div className="loading-container">
          <FiLoader className="loading-icon" />
          <p>Đang tải dữ liệu từ API...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="result-table">
      <div className="result-table-header">
        <FiList className="icon" />
        <h3>Danh sách người dùng</h3>
      </div>
      
      {/* Số lượng kết quả - compact */}
      {keyword && (
        <div className="search-info">
          <span className="result-count">
            Tìm thấy: {filteredUsers.length} / {users.length} người dùng
          </span>
        </div>
      )}

      {/* Modal Form sửa người dùng */}
      {editing && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title">
                <FiEdit2 className="icon" />
                <h4>Sửa thông tin người dùng (ID: {editing.id})</h4>
              </div>
              <button className="modal-close" onClick={cancelEdit}>
                <FiX />
              </button>
            </div>
          
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="edit-name">
                <FiUser className="label-icon" /> Name <span className="required">*</span>
              </label>
              <input 
                id="edit-name" 
                type="text" 
                value={editing.name} 
                onChange={(e) => handleEditChange("name", e.target.value)}
                placeholder="Nhập tên đầy đủ"
              />
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="edit-username">
                <FiUser className="label-icon" /> Username <span className="required">*</span>
              </label>
              <input 
                id="edit-username" 
                type="text" 
                value={editing.username} 
                onChange={(e) => handleEditChange("username", e.target.value)}
                placeholder="Nhập username"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="edit-email">
                <FiMail className="label-icon" /> Email
              </label>
              <input 
                id="edit-email" 
                type="email" 
                value={editing.email} 
                onChange={(e) => handleEditChange("email", e.target.value)}
                placeholder="example@email.com"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="edit-phone">
                <FiPhone className="label-icon" /> Phone
              </label>
              <input 
                id="edit-phone" 
                type="text" 
                value={editing.phone} 
                onChange={(e) => handleEditChange("phone", e.target.value)}
                placeholder="Số điện thoại"
              />
            </div>

            {/* Website */}
            <div className="form-group">
              <label htmlFor="edit-website">
                <FiGlobe className="label-icon" /> Website
              </label>
              <input 
                id="edit-website" 
                type="text" 
                value={editing.website} 
                onChange={(e) => handleEditChange("website", e.target.value)}
                placeholder="website.com"
              />
            </div>

            {/* Address Section - Nested State */}
            <div className="form-group full-width">
              <h5 className="section-title">
                <FiMapPin className="section-icon" /> Địa chỉ
              </h5>
              
              <div className="address-grid">
                <div>
                  <label htmlFor="edit-street">Street:</label>
                  <input 
                    id="edit-street" 
                    type="text" 
                    value={editing.address.street} 
                    onChange={(e) => handleEditChange("street", e.target.value)}
                    placeholder="Tên đường"
                  />
                </div>

                <div>
                  <label htmlFor="edit-suite">
                    <FiHome className="label-icon" /> Suite:
                  </label>
                  <input 
                    id="edit-suite" 
                    type="text" 
                    value={editing.address.suite} 
                    onChange={(e) => handleEditChange("suite", e.target.value)}
                    placeholder="Số nhà"
                  />
                </div>

                <div>
                  <label htmlFor="edit-city">City:</label>
                  <input 
                    id="edit-city" 
                    type="text" 
                    value={editing.address.city} 
                    onChange={(e) => handleEditChange("city", e.target.value)}
                    placeholder="Thành phố"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button 
              onClick={saveUser}
              className="btn btn-success"
            >
              <FiSave /> Lưu
            </button>
            <button 
              onClick={cancelEdit}
              className="btn btn-secondary"
            >
              <FiX /> Hủy
            </button>
          </div>

          
          </div>
        </div>
      )}

      {/* Bảng dữ liệu */}
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <FiAlertCircle className="empty-icon" />
          <p>Không tìm thấy người dùng nào phù hợp</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#2196F3', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Username</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>City</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr 
                  key={u.id} 
                  style={{ 
                    backgroundColor: deletingId === u.id 
                      ? '#ffebee' 
                      : (u.id % 2 === 0 ? '#f9f9f9' : 'white'),
                    opacity: deletingId === u.id ? 0 : 1,
                    transition: 'opacity 0.3s ease, background-color 0.2s ease'
                  }}
                >
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.username}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{u.address.city}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <button 
                      onClick={() => editUser(u)}
                      disabled={deletingId === u.id}
                      className="btn btn-edit"
                      style={{ marginRight: '5px' }}
                    >
                      <FiEdit2 /> Sửa
                    </button>
                    <button 
                      onClick={() => removeUser(u.id)}
                      disabled={deletingId === u.id}
                      className="btn btn-delete"
                    >
                      {deletingId === u.id ? (
                        <><FiLoader className="spin-icon" /> Đang xóa...</>
                      ) : (
                        <><FiTrash2 /> Xóa</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ResultTable
