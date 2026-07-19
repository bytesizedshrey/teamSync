import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { InputField, PasswordStrength, AuthCard, BrandHeader, AuthDivider, SubmitButton } from '../components/AuthComponents';

const Register = () => {
  const { isLoading, showPass, showConfirm, togglePass, toggleConfirm, onRegisterSubmit, navigate } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onTouched' });
  const password = watch('password', '');

  return (
    <AuthCard wide>
      <BrandHeader title="Create account" subtitle="Join your team in seconds" />
      <AuthDivider />

      <form onSubmit={handleSubmit(onRegisterSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Name row */}
        <div className="grid grid-cols-2 gap-4" data-animate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-xs font-medium tracking-widest uppercase text-zinc-400">First name</label>
            <div className="group relative">
              <input
                id="firstName" type="text" placeholder="John" autoComplete="off"
                className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300 focus:bg-white/[0.07] focus:border-zinc-500 group-hover:border-zinc-600 ${errors.firstName ? 'border-red-500/70' : 'border-zinc-800'}`}
                {...register('firstName', { required: 'Required' })}
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-zinc-400 to-transparent group-focus-within:w-[80%] transition-all duration-500" />
            </div>
            {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-xs font-medium tracking-widest uppercase text-zinc-400">Last name</label>
            <div className="group relative">
              <input
                id="lastName" type="text" placeholder="Doe" autoComplete="off"
                className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300 focus:bg-white/[0.07] focus:border-zinc-500 group-hover:border-zinc-600 ${errors.lastName ? 'border-red-500/70' : 'border-zinc-800'}`}
                {...register('lastName', { required: 'Required' })}
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-zinc-400 to-transparent group-focus-within:w-[80%] transition-all duration-500" />
            </div>
            {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
          </div>
        </div>

        <InputField
          id="email" label="Work email" type="email" placeholder="you@company.com"
          register={register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
          error={errors.email}
        />

        <InputField
          id="role" label="Job title" placeholder="Software Engineer"
          register={register('role', { required: 'Job title is required' })}
          error={errors.role}
        />

        <div className="flex flex-col gap-1.5" data-animate>
          <InputField
            id="password" label="Password" placeholder="••••••••••"
            register={register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
            })}
            error={errors.password} showToggle onToggle={togglePass} showPass={showPass}
          />
          <PasswordStrength password={password} />
        </div>

        <InputField
          id="confirmPassword" label="Confirm password" placeholder="••••••••••"
          register={register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword} showToggle onToggle={toggleConfirm} showPass={showConfirm}
        />



        <SubmitButton label="Create Account" isLoading={isLoading} />
      </form>

      <p className="text-center text-xs text-zinc-600" data-animate>
        Already have an account?{' '}
        <span onClick={()=> navigate('/')} className="text-zinc-400 hover:text-white font-medium transition-colors underline underline-offset-2">
          Sign in
        </span>
      </p>
    </AuthCard>
  );
};

export default Register;