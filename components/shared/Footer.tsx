// "use client";

// import { MapPin, Mail, Phone } from "lucide-react";

// export default function Footer() {
//     return (
//         <footer className="bg-slate-900 text-slate-300">
//             <div className="max-w-7xl mx-auto px-6 py-14">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

//                     {/* LEFT: PROJECT NAME */}
//                     <div className="space-y-3">
//                         <h2 className="text-2xl font-bold text-white">GuideTravion</h2>
//                         <p className="text-sm leading-relaxed text-slate-400">
//                             A trusted travel platform connecting tourists with verified local
//                             guides for safe, meaningful, and unforgettable journeys.
//                         </p>
//                     </div>

//                     {/* MIDDLE: INFO */}
//                     <div className="space-y-3">
//                         <h3 className="text-lg font-semibold text-white">Contact Info</h3>
//                         <div className="flex items-center gap-2 text-sm">
//                             <MapPin className="w-4 h-4" />
//                             <span>Bangladesh</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                             <Mail className="w-4 h-4" />
//                             <span>support@guidetravion.com</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm">
//                             <Phone className="w-4 h-4" />
//                             <span>+880 1800 000 000</span>
//                         </div>
//                     </div>

//                     {/* RIGHT: COPYRIGHT */}
//                     <div className="space-y-3 md:text-right">
//                         <h3 className="text-lg font-semibold text-white">Legal</h3>
//                         <p className="text-sm text-slate-400">
//                             © {new Date().getFullYear()} GuideTravion. All rights reserved.
//                         </p>
//                         <p className="text-xs text-slate-500">
//                             Built with care for travelers and guides.
//                         </p>
//                     </div>

//                 </div>
//             </div>

//             {/* BOTTOM BAR */}
//             <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
//                 Empowering local guides • Enriching travel experiences
//             </div>
//         </footer>
//     );
// }


export default function Footer() {
    return (
        <footer className="bg-[#07102A] text-white">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-wide">GuideTravion</h2>
                    <p className="text-sm leading-relaxed text-gray-400">
                        GuideTravion is a modern travel companion platform that connects tourists
                        with verified local guides, curated tours, and authentic travel experiences
                        across Bangladesh.
                    </p>
                </div>

                {/* Platform Info */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">Platform</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Verified Local Guides</li>
                        <li>Admin-Approved Tours</li>
                        <li>Secure Booking System</li>
                        <li>Role-Based Dashboards</li>
                        <li>Real-Time Tour Management</li>
                    </ul>
                </div>

                {/* Contact & Trust */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">Trust & Safety</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Admin Verified Guides</li>
                        <li>Tour Approval Workflow</li>
                        <li>Transparent Pricing</li>
                        <li>User Reviews & Ratings</li>
                        <li>Data Privacy Protection</li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mt-10" />

            {/* Copyright */}
            <div className="py-6 text-center text-sm text-gray-200">
                © {new Date().getFullYear()} GuideTravion. All rights reserved.
            </div>
        </footer>
    );
}
