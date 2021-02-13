import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

import { useSelector } from 'react-redux';
import statusCodes from '../../api-service/status-codes';
import { getApiStatus } from '../../store/getters';

export default function Loader() {
  const apiStatus = useSelector(getApiStatus);

  if (apiStatus !== statusCodes.requesting) return null;
  return (
    <ActivityIndicator
      size={Platform.OS !== 'ios' ? 50 : 'large'}
      color="#f37920"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    />
  );
}
