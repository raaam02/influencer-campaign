import { Sparkles, TrendingUp, Users, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10 -mx-4 px-4 rounded-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-linear(to_right,hsl(var(--border))_1px,transparent_1px),linear-linear(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-linear(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto py-24 lg:py-32">
        <div className="text-center space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-default">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Trusted by 10,000+ marketers worldwide
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="block text-foreground animate-in slide-in-from-bottom-4 duration-1000">
                  Manage Campaigns
                </span>
                <span className="block bg-linear-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000 delay-150 bg-size-[200%_auto] animate-linear">
                  Effortlessly
                </span>
              </h1>
              
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/5 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <p className="relative max-w-2xl mx-auto text-xl sm:text-xl text-muted-foreground leading-relaxed animate-in fade-in duration-1000 delay-300">
                  Plan, assign, and track influencer campaigns — all in one intuitive dashboard. 
                  <span className="text-foreground font-semibold"> Streamline your workflow</span> and 
                  <span className="text-foreground font-semibold"> maximize ROI</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in duration-1000 delay-500">
            <a
              href="#campaigns"
              className="group relative px-8 py-4 bg-linear-to-r from-primary to-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-white/20 to-primary/0 translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2">
                View Campaigns
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <Link
              to="/campaign/add"
              className="group relative px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-border text-foreground rounded-xl font-semibold hover:border-primary hover:bg-card hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:rotate-90 transition-transform duration-300">
                  +
                </span>
                Add Campaign
              </span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 animate-in fade-in duration-1000 delay-700">
            <div className="inline-flex items-center gap-8 px-6 py-4 rounded-2xl bg-card/60 backdrop-blur-md border border-border shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-border"></div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">50M+</p>
                  <p className="text-xs text-muted-foreground">Total Reach</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-border"></div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">99.9%</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-in fade-in duration-1000 delay-1000">
            {[
              { icon: Users, text: 'Collaborate seamlessly', color: 'text-emerald-600 dark:text-emerald-400' },
              { icon: TrendingUp, text: 'Track performance', color: 'text-blue-600 dark:text-blue-400' },
              { icon: Sparkles, text: 'AI-powered insights', color: 'text-purple-600 dark:text-purple-400' }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group relative flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-card/80 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default"
              >
                <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <feature.icon className={`relative w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes linear {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-linear {
          animation: linear 3s ease infinite;
        }
      `}</style>
    </section>
  );
}