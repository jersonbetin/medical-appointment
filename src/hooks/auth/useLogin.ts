import Cookie from 'js-cookie';

import { authService } from '@/services';
import { TOKEN } from '@/utils/constants';
import { useState } from 'react';

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (username: string) => {
    setLoading(true);
    try {
      const data = await authService.login(username);
      if (data?.token) {
        Cookie.set(TOKEN, data.token);
      }
      return data?.token;
    } catch (e) {
      console.log('error', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
