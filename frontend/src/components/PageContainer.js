const PageContainer = ({ children }) => (
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    minHeight: 'calc(100vh - 64px)', // Subtract navbar height
  }}>
    {children}
  </div>
);

export default PageContainer;
