import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function LoadingIndicator() {
  const antIcon = <LoadingOutlined style={{ fontSize: 70 }} spin />;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Spin indicator={antIcon} style={{ display: 'block' }} />
        <div style={{ margin: '0 auto', marginTop: '10px' }}>Loading</div>
      </div>
    </>
  );
}

export default LoadingIndicator;
