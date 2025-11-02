import { Moon, Sun, Monitor, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
      description: "Bright and clear"
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
      description: "Easy on the eyes"
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
      description: "Follows your device"
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative rounded-full border-border hover:border-primary/50 hover:bg-muted transition-all duration-200 group"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90 text-amber-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0 text-indigo-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 rounded-xl border-border shadow-lg"
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;
          
          return (
            <DropdownMenuItem 
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg mx-1 my-0.5 group"
            >
              <div className={`p-1.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-foreground' : 'text-foreground group-hover:text-foreground'
                  }`}>
                    {themeOption.label}
                  </span>
                  {isActive && (
                    <Check className="h-4 w-4 text-primary animate-in zoom-in-50 duration-200" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {themeOption.description}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}