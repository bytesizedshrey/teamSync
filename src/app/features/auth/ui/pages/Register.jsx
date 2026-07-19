import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { useAuth, InputField, PasswordStrength, AuthCard, BrandHeader, AuthDivider, SubmitButton } from '../../hooks/useAuth';

const Register = () => {
  const { isLoading, showPass, showConfirm, togglePass, toggleConfirm, createSubmitHandler,navigate } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onTouched' });
  const password = watch('password', '');

  const onSubmit = createSubmitHandler((data) => {
    console.log('Register data:', data);
  });

  return (
    <AuthCard wide>
      <BrandHeader title="Create account" subtitle="Join your team in seconds" />
      <AuthDivider />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
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

        <div className="flex items-start gap-2.5" data-animate>
          <div className="relative mt-0.5 shrink-0">
            <input id="terms" type="checkbox" className="peer sr-only" {...register('terms', { required: 'You must accept the terms' })} />
            <label htmlFor="terms" className="w-4 h-4 rounded border border-zinc-700 bg-white/[0.04] peer-checked:bg-white/10 peer-checked:border-zinc-500 transition-all flex items-center justify-center cursor-pointer block">
              <svg className="w-2.5 h-2.5 text-zinc-300 opacity-0 peer-checked:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2 6l3 3 5-5"/>
              </svg>
            </label>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            I agree to the <a href="#" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">Terms of Service</a> and <a href="#" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">Privacy Policy</a>
          </p>
        </div>
        {errors.terms && <p className="text-xs text-red-400 -mt-2">{errors.terms.message}</p>}

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