import React, { useState, useEffect } from 'react'
import { 
  FiUserPlus, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiGlobe, 
  FiMapPin, 
  FiHome,
  FiSave,
  FiX
} from 'react-icons/fi'
import '../styles/AddUser.css'

// Component AddUser: Form thêm người dùng mới
function AddUser({ onAdd }) {
  // State: Trạng thái hiển thị form
  const [adding, setAdding] = useState(false)
  
  // State: Dữ liệu người dùng (có nested object address)
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  })

  // Xử lý thay đổi input - Hỗ trợ nested state
  const handleChange = (e) => {
    const { id, value } = e.target
    
    // Nếu là trường trong address (nested)
    if (["street", "suite", "city"].includes(id)) {
      // Phải spread cả user và address để tránh mất dữ liệu
      setUser({ ...user, address: { ...user.address, [id]: value } })
    } else {
      // Trường thông thường
      setUser({ ...user, [id]: value })
    }
  }

  // Xử lý thêm người dùng
  const handleAdd = () => {
    // Validate
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!")
      return
    }

    // Gửi dữ liệu lên App
    onAdd(user)

    // Reset form
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    })
    
    // Đóng form
    setAdding(false)
  }

  // Hủy thêm
  const handleCancel = () => {
    setAdding(false)
    // Reset form
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    })
  }

  // Đóng modal bằng phím ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && adding) {
        handleCancel()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [adding])

  return (
    <div className="add-user">
      <button 
        onClick={() => setAdding(true)}
        className="btn btn-primary"
      >
        <FiUserPlus /> Thêm người dùng mới
      </button>

      {/* Modal */}
      {adding && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title">
                <FiUserPlus className="icon" />
                <h4>Thêm người dùng mới</h4>
              </div>
              <button className="modal-close" onClick={handleCancel}>
                <FiX />
              </button>
            </div>
          
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                <FiUser className="label-icon" /> Name <span className="required">*</span>
              </label>
              <input 
                id="name" 
                type="text" 
                value={user.name} 
                onChange={handleChange}
                placeholder="Nhập tên đầy đủ"
              />
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">
                <FiUser className="label-icon" /> Username <span className="required">*</span>
              </label>
              <input 
                id="username" 
                type="text" 
                value={user.username} 
                onChange={handleChange}
                placeholder="Nhập username"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                <FiMail className="label-icon" /> Email
              </label>
              <input 
                id="email" 
                type="email" 
                value={user.email} 
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                <FiPhone className="label-icon" /> Phone
              </label>
              <input 
                id="phone" 
                type="text" 
                value={user.phone} 
                onChange={handleChange}
                placeholder="Số điện thoại"
              />
            </div>

            {/* Website */}
            <div className="form-group">
              <label htmlFor="website">
                <FiGlobe className="label-icon" /> Website
              </label>
              <input 
                id="website" 
                type="text" 
                value={user.website} 
                onChange={handleChange}
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
                  <label htmlFor="street">Street:</label>
                  <input 
                    id="street" 
                    type="text" 
                    value={user.address.street} 
                    onChange={handleChange}
                    placeholder="Tên đường"
                  />
                </div>

                <div>
                  <label htmlFor="suite">
                    <FiHome className="label-icon" /> Suite:
                  </label>
                  <input 
                    id="suite" 
                    type="text" 
                    value={user.address.suite} 
                    onChange={handleChange}
                    placeholder="Số nhà"
                  />
                </div>

                <div>
                  <label htmlFor="city">City:</label>
                  <input 
                    id="city" 
                    type="text" 
                    value={user.address.city} 
                    onChange={handleChange}
                    placeholder="Thành phố"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button 
              onClick={handleAdd}
              className="btn btn-success"
            >
              <FiSave /> Thêm
            </button>
            <button 
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              <FiX /> Hủy
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddUser

