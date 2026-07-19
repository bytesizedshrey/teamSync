import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import AsideNav from '../features/dashboard/ui/components/AsideNav'
import TopNav from '../features/dashboard/ui/components/TopNav'

const DashboardLayout = () => {
    let {mode} = useSelector((store) => store.theme)
    useEffect(()=>{
        if(mode === "dark"){
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    },[mode])
  return (
    <div className='h-screen w-full bg-background text-foreground flex overflow-hidden selection:bg-primary/30'>
        
        {/* Sidebar */}
        <aside className='w-72 border-r border-border/40 bg-background/40 backdrop-blur-xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-20'>
            <div className="p-6 relative z-10 h-full">
                <AsideNav/>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className='flex-1 flex flex-col bg-background/80 relative'>
            
            <header className='h-20 border-b border-border/40 bg-background/40 backdrop-blur-xl sticky top-0 z-10 px-8 flex items-center shadow-sm'>
                <TopNav/>
            </header>
            
            <div className='flex-1 overflow-y-auto p-8'>
                <Outlet/>
            </div>
        </main>
        
    </div>
  )
}

export default DashboardLayout