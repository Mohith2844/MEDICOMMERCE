import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 fill-primary text-primary" />
              <span className="text-lg font-heading font-bold">MediCommerce</span>
            </div>
            <p className="text-sm opacity-70">
              Your complete health & wellness solution. AI-powered healthcare at your fingertips.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#diagnosis" className="hover:opacity-100 transition-opacity">AI Diagnosis</a></li>
              <li><a href="#nutrition" className="hover:opacity-100 transition-opacity">Food & Nutrition</a></li>
              <li><a href="#medicines" className="hover:opacity-100 transition-opacity">Medicines</a></li>
              <li><a href="#lab-tests" className="hover:opacity-100 transition-opacity">Lab Tests</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">HIPAA Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} MediCommerce. All rights reserved.</p>
          <p className="mt-2">
            ⚠️ This platform provides health information only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
