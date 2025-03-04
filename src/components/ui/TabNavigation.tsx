interface TabNavigationProps {
    tabs: { key: string; label: string }[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  export const TabNavigation = ({ tabs, activeTab, setActiveTab }: TabNavigationProps) => {
    return (
      <div className="flex flex-col items-center mt-[135px] mb-[95px]">
        <div className="w-[1000px] flex justify-center relative">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 text-center pb-5 ${
                activeTab === tab.key ? "text-blue-6" : "text-gray-20"
              }`}
            >
              <p className="h3-b">{tab.label}</p>
            </button>
          ))}
        </div>
        <div className="relative w-[1000px] h-[4px] bg-gray-20">
          <div
            className={`absolute h-full bg-blue-6 transition-all duration-300 ${
              activeTab === tabs[0].key ? "left-0 w-1/2" : "left-1/2 w-1/2"
            }`}
          />
        </div>
      </div>
    );
  };
  