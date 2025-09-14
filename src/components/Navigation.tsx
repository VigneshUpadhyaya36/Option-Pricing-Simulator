import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Calculator, Home, Users, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Calculator", path: "/calculator", icon: Calculator },
    { name: "About Us", path: "/about", icon: Users },
  ];

  return (
    <nav className={cn(
      "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-spring",
      isScrolled 
        ? "scale-95 shadow-glow" 
        : "scale-100"
    )}>
      <div className="bg-background/90 backdrop-blur-lg border border-border/50 rounded-full shadow-elegant px-2 py-2 animate-fade-in">
        <div className="flex items-center gap-1">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-all duration-300 hover:scale-105",
                      isActive 
                        ? "animate-glow shadow-glow" 
                        : "hover:bg-accent/30 hover:shadow-card"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2 animate-pulse-soft" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? 
                <X className="h-5 w-5 animate-scale-in" /> : 
                <Menu className="h-5 w-5 animate-scale-in" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 animate-slide-up">
            <div className="flex flex-col gap-1 p-2 bg-background/95 backdrop-blur-lg rounded-lg border border-border/50 shadow-card">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start rounded-full transition-all duration-300 animate-fade-in",
                        isActive && "shadow-glow"
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;