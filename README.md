# 🎯 Ứng dụng Quản lý Người dùng - React CRUD

Ứng dụng web đầy đủ chức năng CRUD (Create, Read, Update, Delete) được xây dựng bằng React, sử dụng Vite làm build tool.

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc project](#cấu-trúc-project)
- [Cài đặt](#cài-đặt)
- [Các bước thực hiện](#các-bước-thực-hiện)
- [Tính năng](#tính-năng)
- [Kiến thức đã áp dụng](#kiến-thức-đã-áp-dụng)

## 🎓 Giới thiệu

Đây là ứng dụng học tập React cơ bản, triển khai đầy đủ các chức năng CRUD để quản lý danh sách người dùng. Ứng dụng tải dữ liệu từ JSONPlaceholder API và cho phép thêm, sửa, xóa người dùng.

## 🛠️ Công nghệ sử dụng

- **React 18.3.1** - Thư viện UI
- **Vite 7.1.7** - Build tool & Dev server
- **React Icons 5.4.0** - Thư viện icons chuyên nghiệp
- **JSONPlaceholder API** - Fake REST API

## 📁 Cấu trúc project

```
web_ex2/
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx       # Form tìm kiếm
│   │   ├── AddUser.jsx          # Form thêm người dùng
│   │   └── ResultTable.jsx      # Bảng hiển thị & CRUD
│   ├── styles/
│   │   ├── App.css              # CSS cho App
│   │   ├── SearchForm.css       # CSS cho SearchForm
│   │   ├── AddUser.css          # CSS cho AddUser
│   │   └── ResultTable.css      # CSS cho ResultTable
│   ├── App.jsx                  # Component chính
│   ├── main.jsx                 # Entry point
│   └── style.css                # Global styles & utilities
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js               # Vite config
└── README.md                    # Tài liệu này
```

## 🚀 Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:5173**

### 3. Build cho production

```bash
npm run build
```

## 📝 Các bước thực hiện

### BƯỚC 1: Thiết lập cấu trúc React cơ bản
- ✅ Tạo project với Vite
- ✅ Cấu hình React
- ✅ Component gốc App

### BƯỚC 2: Tổ chức Component và State tập trung
- ✅ Tạo 4 components: App, SearchForm, AddUser, ResultTable
- ✅ State Lifting: State được quản lý tập trung ở App
- ✅ Props Down, Callbacks Up

### BƯỚC 3: Chức năng tìm kiếm
- ✅ SearchForm nhận callback từ App
- ✅ onChange cập nhật keyword
- ✅ Luồng dữ liệu một chiều: Con → Cha → Con khác

### BƯỚC 4: Hiển thị danh sách
- ✅ useEffect để fetch API (dependency array [])
- ✅ Array.filter() để lọc theo keyword
- ✅ Array.map() để render bảng
- ✅ Loading state & Empty state

### BƯỚC 5: Thêm người dùng
- ✅ Form với state lồng nhau (nested state)
- ✅ Spread Operator để cập nhật address
- ✅ Validation (Name, Username bắt buộc)
- ✅ useEffect trong ResultTable để lắng nghe người dùng mới

### BƯỚC 6: Sửa người dùng
- ✅ Deep Copy để tránh tham chiếu
- ✅ State editing với nested object
- ✅ Array.map() để thay thế user
- ✅ Highlight row đang được edit

### BƯỚC 7: Xóa người dùng
- ✅ Array.filter() để tạo mảng mới
- ✅ Functional update: setUsers((prev) => ...)
- ✅ Animation fade out khi xóa

### BƯỚC 8: Giao diện (CSS) và Modal Form
- ✅ Modal overlay với backdrop
- ✅ Modal content với animation
- ✅ Form thêm người dùng hiển thị trong modal
- ✅ Form sửa người dùng hiển thị trong modal
- ✅ Click outside để đóng modal
- ✅ Phím ESC để đóng modal
- ✅ Custom scrollbar cho modal
- ✅ Responsive design

### BƯỚC 9: Tối ưu hóa & Best Practices
- ✅ Tách toàn bộ inline CSS vào file style.css
- ✅ Sử dụng React Icons thay vì emoji
- ✅ Tạo CSS classes tái sử dụng (.btn, .modal, .form-group...)
- ✅ Icon components cho tất cả UI elements
- ✅ Consistent design system
- ✅ Loading & Empty states với icons
- ✅ Animation cho loading spinner
- ✅ Tách CSS vào folder riêng (`src/styles/`)
- ✅ Action Bar layout (Search + Add User trên 1 hàng)
- ✅ Responsive design với flexbox

## ✨ Tính năng

### 🔍 Tìm kiếm
- Tìm kiếm real-time theo Name hoặc Username
- Không phân biệt chữ hoa/thường
- Hiển thị số lượng kết quả

### ➕ Thêm người dùng
- Form hiển thị trong Modal popup
- Form đầy đủ các trường: Name, Username, Email, Phone, Website, Address
- Validation: Name và Username bắt buộc
- Hỗ trợ nested state (Address)
- Auto reset form sau khi thêm
- Đóng modal bằng: Click outside, nút ✕, phím ESC

### ✏️ Sửa người dùng
- Form hiển thị trong Modal popup
- Deep copy để tránh thay đổi dữ liệu gốc
- Nút Lưu và Hủy
- Đóng modal bằng: Click outside, nút ✕, phím ESC

### 🗑️ Xóa người dùng
- Xóa trực tiếp bằng Array.filter()
- Animation fade out
- Disable nút khi đang xóa

### 🎨 Giao diện
- Responsive design
- Hover effects trên bảng
- Loading state
- Empty state
- Color coding (Thêm: xanh, Sửa: vàng, Xóa: đỏ)

## 📚 Kiến thức đã áp dụng

### React Hooks
- **useState**: Quản lý state local
- **useEffect**: Side effects (API call, lắng nghe props)
- **useCallback**: Memoize callback functions

### State Management
- **State Lifting**: State được đẩy lên component cha
- **Props Down**: Dữ liệu được truyền xuống qua props
- **Callbacks Up**: Hàm callback để con cập nhật state cha

### Nested State
- **Spread Operator**: `{...user, address: {...user.address, field: value}}`
- Tránh mutation trực tiếp
- React nhận biết sự thay đổi (immutability)

### Array Methods
- **filter()**: Xóa phần tử, lọc danh sách
- **map()**: Render danh sách, cập nhật phần tử
- **includes()**: Kiểm tra tồn tại

### Deep Copy
```javascript
// Tránh tham chiếu
setEditing({ ...user, address: { ...user.address } })
```

### Functional Update
```javascript
// Đảm bảo dùng state mới nhất
setUsers((prev) => prev.filter(u => u.id !== id))
```

### Component Communication
```
App (cha)
├── SearchForm (con) → onChangeValue(callback)
├── AddUser (con) → onAdd(callback)
└── ResultTable (con) → keyword, newUser (props)
```

### Modal Pattern
```jsx
// Modal với backdrop click và ESC key
<div className="modal-overlay" onClick={handleClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    {/* Form content */}
  </div>
</div>

// ESC key listener
useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === 'Escape') handleClose()
  }
  window.addEventListener('keydown', handleEsc)
  return () => window.removeEventListener('keydown', handleEsc)
}, [])
```

## 🎓 Bài học rút ra

### 1. Immutability
- ❌ Không được: `state.field = value`
- ✅ Phải dùng: `setState({...state, field: value})`

### 2. Nested State
- Phải spread cả object cha và object con
- `{...user, address: {...user.address, city: value}}`

### 3. Deep Copy
- Tránh tham chiếu khi edit
- Thay đổi trong form không ảnh hưởng dữ liệu gốc

### 4. Functional Update
- Dùng `(prev) => ...` khi state phụ thuộc vào giá trị trước
- Tránh lỗi đồng bộ hóa

### 5. Component Design
- Single Responsibility: Mỗi component một nhiệm vụ
- Reusable: Có thể tái sử dụng
- Maintainable: Dễ bảo trì

### 6. Modal UX Best Practices
- Click outside (backdrop) để đóng
- Phím ESC để đóng
- `e.stopPropagation()` để ngăn đóng khi click vào content
- Animation cho trải nghiệm mượt mà
- `z-index: 999` để modal luôn ở trên cùng

### 7. CSS Organization & Best Practices
**Tách CSS theo Component với folder riêng:**
- Tất cả CSS files nằm trong `src/styles/`
- Components JSX trong `src/components/`
- Tách biệt rõ ràng giữa logic và styles
- `src/styles/App.css` ← App component
- `src/styles/SearchForm.css` ← SearchForm component
- `src/styles/AddUser.css` ← AddUser component
- `src/styles/ResultTable.css` ← ResultTable component
- `src/style.css` → Global styles & shared utilities

**Import paths:**
```jsx
// Trong App.jsx
import './styles/App.css'

// Trong components/SearchForm.jsx
import '../styles/SearchForm.css'
```

**Best Practices:**
- ✅ CSS files trong folder riêng (`src/styles/`)
- ✅ Dễ tìm và quản lý tất cả styles
- ✅ Global utilities cho button, form, modal
- ✅ BEM-like naming convention
- ✅ Consistent spacing & colors

### 8. React Icons
- Import icons: `import { FiSearch, FiEdit2 } from 'react-icons/fi'`
- Sử dụng như component: `<FiSearch className="icon" />`
- Styling với CSS classes
- Nhiều bộ icons: Feather (Fi), Material (Md), FontAwesome (Fa)...

## 🔗 Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Icons](https://react-icons.github.io/react-icons/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

## 👨‍💻 Tác giả

Được xây dựng để học tập React cơ bản theo tài liệu hướng dẫn.

---

**Happy Coding! 🚀**

