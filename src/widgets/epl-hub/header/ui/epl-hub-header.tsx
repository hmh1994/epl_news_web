import { EplHubNav } from "@/features/epl-hub-nav/ui/epl-hub-nav";

interface EplHubHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isScrolled: boolean;
}

export const EplHubHeader = ({
  activeTab,
  onTabChange,
  isScrolled,
}: EplHubHeaderProps) => {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-2xl'>
                ⚽
              </div>
              <div className='absolute -inset-1 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl blur opacity-30'></div>
            </div>
            <div>
              <span className='text-3xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
                EPL Hub
              </span>
              <div className='text-xs text-slate-400 font-medium'>
                Football Data Hub
              </div>
            </div>
          </div>

          <EplHubNav activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>
    </header>
  );
};
