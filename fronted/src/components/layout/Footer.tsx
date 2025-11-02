import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail,
  Heart,
  TrendingUp,
  Users,
  Target
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Campaigns", to: "/" },
      { label: "Influencers", to: "/influencers" },
      { label: "Assign", to: "/assign" },
      { label: "Analytics", to: "#" }
    ],
    company: [
      { label: "About Us", to: "#" },
      { label: "Careers", to: "#" },
      { label: "Blog", to: "#" },
      { label: "Contact", to: "#" }
    ],
    resources: [
      { label: "Documentation", to: "#" },
      { label: "API Reference", to: "#" },
      { label: "Support", to: "#" },
      { label: "Status", to: "#" }
    ],
    legal: [
      { label: "Privacy Policy", to: "#" },
      { label: "Terms of Service", to: "#" },
      { label: "Cookie Policy", to: "#" },
      { label: "Guidelines", to: "#" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-sky-500" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-500" },
    { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500" },
    { icon: Mail, label: "Email", href: "#", color: "hover:text-green-500" }
  ];

  const features = [
    { icon: TrendingUp, text: "Track Performance" },
    { icon: Users, text: "Manage Influencers" },
    { icon: Target, text: "Campaign Analytics" }
  ];

  return (
    <footer className="relative mt-20 border-t border-border bg-linear-to-b from-background to-muted/20">
      {/* Decorative linear */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <Sparkles className="relative w-8 h-8 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">Exhibit</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Empowering brands to connect with influencers and create impactful campaigns that drive real results.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground group cursor-default"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="group-hover:text-foreground transition-colors">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    to={social.href}
                    aria-label={social.label}
                    className={`p-2.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground ${social.color} transition-all hover:scale-110 hover:shadow-md`}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Product Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Product
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Resources
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Legal
                  </h3>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Exhibit. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for creators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}