import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Notfound = () => {
  useEffect(() => {
    document.title = 'Page not found';
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: '600',
      }}
    >
      <p>Rất tiếc,trang này hiện không khả dụng</p>
      <div style={{ display: 'flex' }}>
        <p>
          Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.
        </p>
        <Link to='/' textDecoration='none' color='#14548c'>
          <p style={{ marginLeft: '3px', textDecoration: 'none' }}>
            {' '}
            Quay lại instagram
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
