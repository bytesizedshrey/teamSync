import React from 'react';
import ThreeBackground from './ThreeBackground';
import GsapEntrance from './GsapEntrance';
import { LiquidMetalButton } from '../../../../../components/ui/liquid-metal';

export const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export const InputField = ({ id, label, type = 'text', placeholder, register, error, showToggle = false, onToggle, showPass }) => (
  <div className="flex flex-col gap-1.5" data-animate>
    <label htmlFor={id} className="text-xs font-medium tracking-widest uppercase text-zinc-400">
      {label}
    </label>
    <div className="relative group">
      <input
        id={id}
        type={showToggle ? (showPass ? 'text' : 'password') : type}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300 focus:bg-white/[0.07] focus:border-zinc-500 group-hover:border-zinc-600 ${error ? 'border-red-500/70 focus:border-red-400' : 'border-zinc-800'}`}
        {...register}
      />
      {showToggle && (
        <button type="button" onClick={onToggle} tabIndex={-1} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
          <EyeIcon open={showPass} />
        </button>
      )}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-zinc-400 to-transparent group-focus-within:w-[80%] transition-all duration-500" />
    </div>
    {error && <p className="text-xs text-red-400 mt-0.5">{error.message}</p>}
  </div>
);

export const PasswordStrength = ({ password }) => {
  const getStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    const map = [
      { label: 'Weak', color: 'bg-red-500' },
      { label: 'Fair', color: 'bg-orange-500' },
      { label: 'Good', color: 'bg-yellow-400' },
      { label: 'Strong', color: 'bg-emerald-500' },
    ];
    return { score, ...map[Math.min(score - 1, 3)] };
  };

  const { score, label, color } = getStrength(password);
  if (!password) return null;

  const textColor = score <= 1 ? 'text-red-400' : score <= 2 ? 'text-orange-400' : score <= 3 ? 'text-yellow-400' : 'text-emerald-400';

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? color : 'bg-zinc-800'}`} />
        ))}
      </div>
      <p className={`text-[11px] ${textColor}`}>{label} password</p>
    </div>
  );
};

export const AuthDivider = () => (
  <div data-animate className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
);

export const BrandHeader = ({ title, subtitle }) => (
  <div className="flex flex-col items-start gap-3" data-animate>
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-zinc-700 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-zinc-300">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-300" style={{ fontFamily: "'Orbitron', monospace" }}>
        TeamSync
      </span>
    </div>
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
        {title}
      </h1>
      <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
    </div>
  </div>
);

export const SubmitButton = ({ label, isLoading }) => (
  <div data-animate className="w-full">
    <LiquidMetalButton
      type="submit"
      disabled={isLoading}
      className="w-full"
      metalConfig={{ colorBack: "#27272a", colorTint: "#3f3f46" }}
    >
      <span className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {label}
      </span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </span>
      )}
    </LiquidMetalButton>
  </div>
);

export const AuthCard = ({ children, wide = false }) => (
  <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050608]">
    <ThreeBackground />
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.025] blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-zinc-700/10 blur-[100px]" />
    </div>
    <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
    <GsapEntrance className={`relative z-10 w-full mx-4 my-8 ${wide ? 'max-w-lg' : 'max-w-md'}`}>
      <div className="relative rounded-2xl border border-zinc-800 bg-[#0a0a0b]/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-60" />
        <div className="absolute top-0 left-[10%] w-[30%] h-px bg-white/40 blur-sm" />
        <div className="px-8 pt-10 pb-10 flex flex-col gap-7">
          {children}
        </div>
      </div>
      <p className="text-center text-[10px] text-zinc-700 mt-4 tracking-widest uppercase" data-animate>
        Secured · Encrypted · Compliant
      </p>
    </GsapEntrance>
  </div>
);
