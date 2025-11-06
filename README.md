# 🎯 Ứng dụng Quản lý Người dùng - React CRUD

Ứng dụng web đầy đủ chức năng CRUD (Create, Read, Update, Delete) để quản lý danh sách người dùng, được xây dựng bằng **React + Vite**.

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

## 🚀 Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
# → http://localhost:5173

# Build production
npm run build
```

## ✨ Tính năng chính

- **🔍 Tìm kiếm**: Real-time search theo Name/Username
- **➕ Thêm**: Form modal với validation, hỗ trợ nested state (Address)
- **✏️ Sửa**: Deep copy để tránh mutation, form modal với ESC/click outside
- **🗑️ Xóa**: Animation fade out, functional update
- **🎨 UI/UX**: Responsive design, loading/empty states, React Icons, hover effects

## 📚 Kiến thức áp dụng

### React Core
- **Hooks**: `useState`, `useEffect`, `useCallback`
- **State Lifting**: State được quản lý tập trung ở component cha
- **One-way Data Flow**: Props down, Callbacks up

### State Management Patterns
- **Immutability**: `setState({...state, field: value})`
- **Nested State**: `{...user, address: {...user.address, city: value}}`
- **Deep Copy**: Tránh tham chiếu khi edit
- **Functional Update**: `setState((prev) => ...)`

### Array Methods
- `filter()` - Xóa/lọc danh sách
- `map()` - Render/update phần tử
- `includes()` - Kiểm tra tồn tại

### CSS Organization
- Component-based CSS trong folder `src/styles/`
- Global utilities trong `src/style.css`
- React Icons cho UI elements

### Component Architecture
```
App (State Management)
├── SearchForm (Controlled Input)
├── AddUser (Modal Form + Nested State)
└── ResultTable (Fetch API + CRUD Operations)
```

## 🔗 Tài liệu tham khảo

- [React Docs](https://react.dev) • [Vite Docs](https://vitejs.dev) • [React Icons](https://react-icons.github.io/react-icons/) • [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

---

**Happy Coding! 🚀**

