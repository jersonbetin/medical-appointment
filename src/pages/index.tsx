import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import Cookies from 'js-cookie';

import { useLazyQuery } from '@apollo/client';
import { LOGIN_AUTH } from '@/graphql/queries/auth';
import { TOKEN } from '@/utils/constants';

const Login = () => {
  const route = useRouter();
  const [alert, setAlert] = useState<string | null>(null);

  const [loginAuth, { loading }] = useLazyQuery(LOGIN_AUTH, {
    fetchPolicy: 'network-only',
    variables: { username: 'postulante@gmail.com' },
    onCompleted: (data) => {
      const {
        login: { token },
      } = data;

      if (token) {
        Cookies.set(TOKEN, token);
        return route.push('/dashboard');
      }
    },
    onError: () => {
      setAlert('Error al logearse');
    },
  });

  const onHandleSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginAuth();
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
