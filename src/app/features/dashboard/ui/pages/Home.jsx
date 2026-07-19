import React from "react";
import { useSelector } from "react-redux";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { KineticTextLoader } from "@/components/ui/kinetic-text-loader";

const Home = () => {
  const { employee } = useSelector((state) => state.auth);

  return (
    <div className="w-full flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Welcome Section - Glass UI */}
      <div className="relative overflow-hidden rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 p-10 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 drop-shadow-sm font-['Orbitron']">
              WELCOME BACK, <br/>
              <span className="text-primary">
                {employee?.name ? employee.name.toUpperCase() : "OPERATOR"}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-['Inter']">
              System is online. You have 3 critical tasks awaiting resolution and 12 active projects in the pipeline.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <LiquidMetalButton 
              size="lg" 
              className="font-['Orbitron'] tracking-widest uppercase text-primary-foreground"
              metalConfig={{ speed: 0.8, distortion: 0.2 }}
            >
              Sync Workspace
            </LiquidMetalButton>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Projects', value: '12', trend: '+14%' },
          { label: 'Team Members', value: '48', trend: '+2' },
          { label: 'Tasks Completed', value: '1,294', trend: '↑ 24%' }
        ].map((stat, i) => (
          <div key={i} className="group p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-xl hover:bg-card/40 transition-all duration-500 cursor-default">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4 font-['Inter']">{stat.label}</h3>
            <div className="flex items-end justify-between relative z-10">
              <span className="text-5xl font-bold tracking-tighter font-['Orbitron'] text-foreground">{stat.value}</span>
              <span className="text-sm font-bold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg">
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
