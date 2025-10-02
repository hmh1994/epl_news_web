interface NavItem {
  name: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "홈", icon: "🏠" },
  { name: "팀정보", icon: "🏆" },
  { name: "선수정보", icon: "👤" },
  { name: "리그정보", icon: "📊" },
  { name: "통계", icon: "📈" },
];

interface EplHubNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const EplHubNav = ({ activeTab, onTabChange }: EplHubNavProps) => {
  return (
    <nav className='hidden md:flex space-x-1'>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.name;
        return (
          <button
            key={item.name}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
              isActive ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            onClick={() => onTabChange(item.name)}
            type='button'
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-[#169976]/0 via-emerald-600/0 to-teal-600/0 transition-all duration-300 rounded-xl ${
                isActive
                  ? "from-[#169976]/40 via-emerald-600/40 to-teal-600/40"
                  : "group-hover:from-[#169976]/20 group-hover:via-emerald-600/20 group-hover:to-teal-600/20"
              }`}
            ></div>
            <div className='relative flex items-center space-x-2 font-medium'>
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </button>
        );
      })}
    </nav>
  );
};
