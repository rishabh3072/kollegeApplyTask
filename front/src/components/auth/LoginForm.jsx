import { useState } from 'react';
import { Eye, EyeOff, Mail, Github } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      const user = {
        email: credentials.email,
        name: credentials.email.split('@')[0],
        isAdmin: credentials.email === 'admin@gmail.com',
      };
      loginUser(user);
    }
  };

  const handleOAuthLogin = (provider) => {
    const user = {
      email: `user@${provider}.com`,
      name: `${provider} User`,
      isAdmin: provider === 'admin',
    };
    loginUser(user);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const decoded = jwtDecode(tokenResponse.credential || tokenResponse.access_token);
      const user = {
        email: decoded.email,
        name: decoded.name,
        isAdmin: decoded.email === 'admin@gmail.com',
      };
      loginUser(user);
    },
    onError: () => {
      alert('Google login failed');
    },
    flow: 'implicit', // use 'auth-code' if you have a backend to exchange code
  });

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="h3">Welcome Back</h2>
          <p className="text-muted">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>
        </form>

        <div className="text-center my-3 text-muted">Or continue with</div>

        <div className="d-flex justify-content-between gap-2 mb-4">
          <button
            onClick={googleLogin}
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
          >
            <Mail className="me-2" size={16} />
            Google
          </button>
          <button
            onClick={() => handleOAuthLogin('github')}
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
          >
            <Github className="me-2" size={16} />
            GitHub
          </button>
        </div>

        <div className="text-center text-muted medium">
          <p className="mb-1">Demo accounts:</p>
          <p className="mb-1">Admin: <code>admin@gmail.com</code> / <code>password(any)</code></p>
          <p>User: <code>user@example.com</code> / <code>password(any)</code></p>
        </div>
      </div>
    </div>
  );
};
