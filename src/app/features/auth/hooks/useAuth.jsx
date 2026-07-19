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
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // MOCK LOGIN: Populate Redux state so ProtectedRoutes allows access.
      // TODO: Replace this with `dispatch(loginEmployee(data))` when backend is ready
      dispatch(addEmployee({ name: "Demo User", email: data.email }));
      
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
      dispatch(addEmployee({ name: data.firstName || "Demo", email: data.email }));

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