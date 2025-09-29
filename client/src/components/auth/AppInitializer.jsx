import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSession } from '../../redux/slices/authSlice';

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  // We'll use a local state to track if the initial load is complete
  const [isReady, setIsReady] = useState(false);
  
  // Get loading state from authSlice for the 'Loading...' screen
  const { loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Only attempt to restore session if a token exists
    if (token) {
      // Dispatch the restoreSession thunk
      dispatch(restoreSession())
        .finally(() => {
          // Set isReady to true regardless of success or failure
          // to allow the application to render.
          setIsReady(true);
        });
    } else {
      // If no token, we're ready immediately
      setIsReady(true);
    }
  }, [dispatch]);

  // If the initial check is still running, show a global loading state
  if (!isReady || authLoading) {
    // This is a minimal global loading screen
    return <div className="flex items-center justify-center min-h-screen">Loading Application...</div>;
  }

  // Once ready, render the application routes
  return children;
};

export default AppInitializer;