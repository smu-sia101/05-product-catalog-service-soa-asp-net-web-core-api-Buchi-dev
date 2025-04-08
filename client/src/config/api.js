const API_CONFIG = {
  baseURL: 'http://localhost:5000/api',
  endpoints: {
    products: '/products',
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      profile: '/auth/profile',
      updatePassword: '/auth/update-password',
      checkEmail: '/auth/check-email',
      resetPassword: '/auth/reset-password'
    }
  }
};

export default API_CONFIG; 