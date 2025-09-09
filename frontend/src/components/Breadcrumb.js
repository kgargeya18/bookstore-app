import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];

    // Home is always first
    items.push({
      name: 'Home',
      path: '/',
      isActive: path === '/'
    });

    // Add other pages based on current path
    if (path.startsWith('/cart')) {
      items.push({
        name: 'Cart',
        path: '/cart',
        isActive: path === '/cart'
      });
    } else if (path.startsWith('/checkout')) {
      items.push(
        { name: 'Cart', path: '/cart', isActive: false },
        { name: 'Checkout', path: '/checkout', isActive: true }
      );
    } else if (path.startsWith('/orders')) {
      items.push({
        name: 'My Orders',
        path: '/orders',
        isActive: true
      });
    } else if (path.startsWith('/login')) {
      items.push({
        name: 'Login',
        path: '/login',
        isActive: true
      });
    } else if (path.startsWith('/register')) {
      items.push({
        name: 'Register',
        path: '/register',
        isActive: true
      });
    } else if (path.startsWith('/admin')) {
      if (path.startsWith('/admin/login')) {
        items.push({
          name: 'Admin Login',
          path: '/admin/login',
          isActive: true
        });
      } else if (path.startsWith('/admin/dashboard')) {
        items.push(
          { name: 'Admin Login', path: '/admin/login', isActive: false },
          { name: 'Admin Dashboard', path: '/admin/dashboard', isActive: true }
        );
      }
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumb if only home
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      fontSize: '14px',
      color: '#666'
    }}>
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} style={{ display: 'flex', alignItems: 'center' }}>
          {index > 0 && (
            <span style={{ margin: '0 8px', color: '#999' }}>›</span>
          )}
          {item.isActive ? (
            <span style={{ 
              color: '#43e97b', 
              fontWeight: 'bold',
              cursor: 'default'
            }}>
              {item.name}
            </span>
          ) : (
            <button
              onClick={() => navigate(item.path)}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#43e97b';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
              }}
            >
              {item.name}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;




