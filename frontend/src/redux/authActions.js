import axios from 'axios';
import { loginSuccess } from './slices/authSlice';

export const login = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4000/expenseTracker/auth/login', credentials); // Replace with your API endpoint
    const { user, token } = response.data;

    // Dispatch the loginSuccess action to store the user and token in Redux
    dispatch(loginSuccess({ user, token }));

    // Optionally store the token in localStorage/sessionStorage for persistence
    localStorage.setItem('token', token);
    console.log(token);
    
    // Redirect to the Dashboard page after successful login
    navigate('/dashboard');  // Navigate to the Dashboard component
  } catch (error) {
    console.error('Login failed:', error.response);
  }
};
