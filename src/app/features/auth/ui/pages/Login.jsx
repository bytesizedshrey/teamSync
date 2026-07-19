import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { useAuth, InputField, AuthCard, BrandHeader, AuthDivider, SubmitButton } from '../../hooks/useAuth';

const Login = () => {
  const { isLoading, showPass, togglePass, createSubmitHandler,navigate } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

  const onSubmit = createSubmitHandler((data) => {
    console.log('Login data:', data);
  });

  return (
    <AuthCard>
      <BrandHeader title="Welcome back" subtitle="Sign in to your workspace" />
      <AuthDivider />
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <InputField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@company.com"
          register={register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
          error={errors.email}
        />

        <InputField
          id="password"
          label="Password"
          placeholder="••••••••••"
          register={register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
          error={errors.password}
          showToggle
          onToggle={togglePass}
          showPass={showPass}
        />

        <div className="flex items-center justify-between" data-animate>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative w-4 h-4">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-4 h-4 rounded border border-zinc-700 bg-white/[0.04] peer-checked:bg-white/10 peer-checked:border-zinc-500 transition-all" />
              <svg className="absolute inset-0 w-4 h-4 text-zinc-300 opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 8l3.5 3.5L13 5"/>
              </svg>
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors tracking-wide">
            Forgot password?
          </a>
        </div>

        <SubmitButton label="Sign In" isLoading={isLoading} />
      </form>

      <p className="text-center text-xs text-zinc-600" data-animate>
        No account?{' '}
        <span onClick={()=> navigate('/register')}className="text-zinc-400 hover:text-white font-medium transition-colors underline underline-offset-2">
          Create one
        </span>
      </p>
    </AuthCard>
  );
};

export default Login;