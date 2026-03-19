import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Shield,
  Twitter,
} from "lucide-react";

const footerLinks = {
  Services: [
    "Life Insurance",
    "Health Insurance",
    "Vehicle Insurance",
    "Property Insurance",
    "Business Coverage",
  ],
  Company: ["About Us", "Our Team", "Careers", "News & Press", "Partners"],
  Resources: [
    "Claims Guide",
    "FAQ",
    "Blog",
    "Insurance Calculator",
    "Policy Documents",
  ],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimers"],
};

const socialIcons = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, oklch(0.19 0.046 237), oklch(0.14 0.035 237))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/80">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">SecureCover</span>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "oklch(0.72 0.025 237)" }}
            >
              Protecting what matters most to you. Trusted by over 200,000
              families and businesses nationwide.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+18005550123"
                className="flex items-center gap-2 text-sm"
                style={{ color: "oklch(0.72 0.025 237)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                1-800-555-0123
              </a>
              <a
                href="mailto:support@securecover.com"
                className="flex items-center gap-2 text-sm"
                style={{ color: "oklch(0.72 0.025 237)" }}
              >
                <Mail className="w-3.5 h-3.5" />
                support@securecover.com
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "oklch(0.88 0.02 237)" }}
              >
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <span
                      className="text-xs transition-colors cursor-default"
                      style={{ color: "oklch(0.65 0.02 237)" }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(0.3 0.03 237)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.5 0.02 237)" }}>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-3">
            {socialIcons.map(({ Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-white/20"
                style={{ background: "oklch(0.25 0.03 237)" }}
              >
                <Icon className="w-3.5 h-3.5 text-white/70" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
