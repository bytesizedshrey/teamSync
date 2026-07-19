import { Menu, Search } from 'lucide-react'
import { Bell, Moon, Sun } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/shared/state/themeSlice'

const TopNav = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((store) => store.theme);

  return (
    <div className='flex justify-between items-center w-full h-full'>
      {/* Search Bar */}
      <div className='relative w-96 group'>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search projects, tasks, or teammates..." 
          className="w-full bg-muted/30 hover:bg-muted/50 focus:bg-background border border-transparent focus:border-primary/50 text-sm rounded-full py-2.5 pl-11 pr-4 outline-none transition-all duration-300 shadow-sm focus:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button 
          onClick={() => dispatch(toggleTheme())}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all active:scale-95"
          aria-label="Toggle theme"
        >
          {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all active:scale-95">
          <Bell size={20}/>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border border-background shadow-[0_0_8px_rgba(255,0,0,0.5)] animate-pulse"></span>
        </button>

        {/* Menu */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all active:scale-95 md:hidden">
          <Menu size={20}/>
        </button>
      </div>
    </div>
  )
}

export default TopNav