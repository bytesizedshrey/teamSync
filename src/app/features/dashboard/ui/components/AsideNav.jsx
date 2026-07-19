import React from 'react'

const AsideNav = () => {
  return (
    <div className='flex flex-col h-full'>
      {/* Brand Logo */}
      <div className='mb-12 group cursor-pointer'>
        <h1 className='text-3xl font-bold tracking-tighter text-foreground drop-shadow-sm transition-all duration-500'>
          TeamSync
        </h1>
        <p className='text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1 opacity-80'>
          Enterprise Workspace
        </p>
      </div>

      {/* Navigation Links Placeholder */}
      <nav className='flex-1 flex flex-col gap-2'>
        {['Dashboard', 'Projects', 'Tasks', 'Team', 'Settings'].map((item, i) => (
          <a key={i} href="#" className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${i === 0 ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
            {item}
          </a>
        ))}
      </nav>
      
      {/* Footer area */}
      <div className="mt-auto pt-8 border-t border-border/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
            DU
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Demo User</span>
            <span className="text-xs text-muted-foreground">Pro Plan</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsideNav