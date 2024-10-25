import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    BarChart,
    PieChart,
    CreditCard,
    Package,
    DollarSign,
    Key,
    Users,
    Subtitles,
    PlusCircle,
    Tv,
    Film,
    LayoutDashboard,
    Settings,
    Palette,
} from 'lucide-react';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const menuItems = [
        {
            section: 'CONTENT MANAGEMENT',
            items: [
                { title: 'Dashboard', icon: LayoutDashboard, link: '/admin/adminDashboard' },
                { title: 'Movies', icon: Film, link: '/admin/movies' },
                { title: 'Series', icon: Tv, link: '/series' },
                { title: 'Add New Content', icon: PlusCircle, link: '/add-content' },
                { title: 'Subtitles', icon: Subtitles, link: '/subtitles' },
            ],
        },
        {
            section: 'USER MANAGEMENT',
            items: [
                { title: 'User List', icon: Users, link: '/users' },
                { title: 'Roles & Permissions', icon: Key, link: '/roles' },
            ],
        },
        {
            section: 'SITE SETTINGS',
            items: [
                { title: 'Ad Management', icon: DollarSign, link: '/ads' },
                { title: 'Subscription Plans', icon: Package, link: '/subscriptions' },
                { title: 'Payments', icon: CreditCard, link: '/payments' },
            ],
        },
        {
            section: 'ANALYTICS',
            items: [
                { title: 'View Reports', icon: BarChart, link: '/reports' },
                { title: 'Traffic Statistics', icon: PieChart, link: '/traffic' },
            ],
        },
        {
            section: 'SETTING',
            items: [
                { title: 'Setting', icon: Settings, link: '/settings' },
                { title: 'Theme', icon: Palette, link: '/palette' },
            ],
        },
    ];

    return (
        <div
            className={`left-0 top-0 h-full bg-[#1c1c1e] text-white shadow-xl transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="relative flex h-16 items-center border-b border-gray-800 px-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#18262f] p-2">
                        <div className="h-6 w-6 text-white">🎬</div>
                    </div>
                    {!isCollapsed && (
                        <a href="/">
                            <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                                BỘT<span className="text-blue-400"> MOVIE</span>
                            </span>
                        </a>
                    )}
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#18262f] p-1.5 text-white shadow-lg transition-all hover:bg-blue-700"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            <div className="custom-scrollbar h-[calc(100vh-6rem)] overflow-y-auto">
                {menuItems.map((section, idx) => (
                    <div key={idx} className="py-4">
                        {!isCollapsed && (
                            <h2 className="mb-2 whitespace-nowrap px-4 text-xs font-semibold tracking-wider text-gray-400">
                                {section.section}
                            </h2>
                        )}
                        {section.items.map((item, itemIdx) => (
                            <a
                                key={itemIdx}
                                href={item.link}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-gray-300 transition-all hover:bg-gray-800 hover:text-white ${
                                    window.location.pathname === item.link ? 'active' : ''
                                }`}
                                title={isCollapsed ? item.title : ''}
                            >
                                <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                                {!isCollapsed && <span className="whitespace-nowrap text-sm">{item.title}</span>}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
