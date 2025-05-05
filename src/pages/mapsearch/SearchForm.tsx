import React, { useState } from "react";
import Dropdown from "../../components/ui/Dropdown";
import Icon from "../../assets/icons/Icon";
import InformationsFilters from "../../components/informationslist/InformationsFilters";

interface SearchFormProps {
  performanceOptions: string[];
  progressStatusOptions: string[];
  performanceOptionsSelected: string;
  statusOptionsSelected: string;
  searchKeyword: string;
  setPerformanceOptionSelected: (option: string) => void;
  setStatusOptionsSelected: (option: string) => void;
  setSearchKeyword: (keyword: string) => void;
  onSubmitSearch: (e: React.FormEvent) => void;
}

const SearchForm = ({
  performanceOptions,
  // progressStatusOptions,
  performanceOptionsSelected,
  // statusOptionsSelected,
  searchKeyword,
  setPerformanceOptionSelected,
  // setStatusOptionsSelected,
  setSearchKeyword,
  onSubmitSearch,
}: SearchFormProps) => {
  const [selectedLocation, setSelectedLocation] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState("진행 중");

  const handleLocationChange = (value: string) => setSelectedLocation(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);

  return (
    <section className=" xm:mb-12 max-xm:mb-8 flex gap-4 justify-center xm:items-center max-xm:flex-col-reverse xm:flex-col-reverse lg:flex-row">
      <div className="flex sm:justify-between xm:justify-around max-xm:flex-col sm:gap-5 xm:gap-2 max-xm:gap-4">
        <div className="xl:ml-[-18.5px]">
          <InformationsFilters
            selectedLocation={selectedLocation}
            selectedStatus={selectedStatus}
            onLocationChange={handleLocationChange}
            onStatusChange={handleStatusChange}
          />
        </div>
        <Dropdown
          data={performanceOptions}
          selectedOption={performanceOptionsSelected}
          onSelect={setPerformanceOptionSelected}
          sizeClassName="sm:w-[150px] h-[30px] xm:w-[125px]"
        />
        {/* <Dropdown
          data={progressStatusOptions}
          selectedOption={statusOptionsSelected}
          onSelect={setStatusOptionsSelected}
          sizeClassName="w-[122px] h-[30px]"
        /> */}
      </div>
      <form
        onSubmit={onSubmitSearch}
        className="flex justify-between xl:w-[630px] h-9 relative items-center xm:w-[100%]"
      >
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="검색어를 입력해주세요."
          className="w-full h-full py-[9px] px-4 bg-transparent outline-none placeholder:body-small-r appearance-none [&::-webkit-search-cancel-button]:hidden border border-gray-20 rounded-full focus:border-blue-7"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
        >
          <Icon name="Search" size={18} className="text-blue-1" />
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
