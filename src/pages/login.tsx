import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

import useLogin from '@/hooks/auth/useLogin';

const Login = () => {
  const route = useRouter();
  const [alert, setAlert] = useState<string | null>(null);
  const { loading, login } = useLogin();

  const onHandleSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = await login('postulante@gmail.com');
      if (token) {
        return route.push('/dashboard');
      }
      setAlert('Error al logearse');
    } catch (e) {
      setAlert('Error al logearse');
    }
  };

  return (
    <section className="w-full h-full bg-gray-50 text-black p-8">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-md">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Login
          </h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="text-base text-black  label-text" id="email">
                  Email
                </span>
              </label>
              <input
                type="text"
                placeholder="Email Address"
                value="postulante@gmail.com"
                className="w-full input input-ghost"
                readOnly={true}
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onHandleSubmit}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {alert && (
        <div className="toast toast-end">
          <div className="alert alert-info">
            <span>{alert}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
