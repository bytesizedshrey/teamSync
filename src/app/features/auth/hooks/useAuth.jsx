import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginEmployee } from '../state/auth/authAction';
import { addEmployee } from '../state/auth/authSlice';

export const useAuth = () => {
  let dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePass = () => setShowPass((v) => !v);
  const toggleConfirm = () => setShowConfirm((v) => !v);

  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log('Logging in with:', data);
      
      // Attempt real API call
      try {
        await dispatch(loginEmployee(data)).unwrap();
      } catch (apiError) {
        console.warn("Real API failed. Falling back to mock login so you can view the UI.", apiError);
        const mockUser = { name: "Demo User", email: data.email };
        localStorage.setItem('mockEmployee', JSON.stringify(mockUser));
        
        // MOCK COOKIES: Set dummy tokens so they appear in the Application tab
        document.cookie = "accessToken=mock_ey...access_token...123; path=/";
        document.cookie = "refreshToken=mock_ey...refresh_token...456; path=/";
        
        dispatch(addEmployee(mockUser));
      }
      
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log('Registering with:', data);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // MOCK LOGIN: Populate Redux state so ProtectedRoutes allows access.
      const mockUser = { name: data.firstName || "Demo", email: data.email };
      localStorage.setItem('mockEmployee', JSON.stringify(mockUser));
      
      // MOCK COOKIES: Set dummy tokens so they appear in the Application tab
      document.cookie = "accessToken=mock_ey...access_token...123; path=/";
      document.cookie = "refreshToken=mock_ey...refresh_token...456; path=/";
      
      dispatch(addEmployee(mockUser));

      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    showPass, 
    showConfirm, 
    togglePass, 
    toggleConfirm, 
    onLoginSubmit,
    onRegisterSubmit,
    navigate
  };
};