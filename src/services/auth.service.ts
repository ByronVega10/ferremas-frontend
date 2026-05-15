import api from '@/lib/axios';

interface LoginData {
  email: string;
  password: string;
}

export const loginRequest = async (
  data: LoginData,
) => {
  const response = await api.post(
    '/auth/login',
    data,
  );

  return response.data;
};

interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const registerRequest = async (
  data: RegisterData,
) => {
  const response = await api.post(
    '/auth/register',
    data,
  );

  return response.data;
};