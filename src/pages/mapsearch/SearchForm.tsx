import React from "react";
import Dropdown from "../../components/ui/Dropdown";
import Icon from "../../assets/icons/Icon";

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
  progressStatusOptions,
  performanceOptionsSelected,
  statusOptionsSelected,
  searchKeyword,
  setPerformanceOptionSelected,
  setStatusOptionsSelected,
  setSearchKeyword,
  onSubmitSearch,
}: SearchFormProps) => (
  <section className="mb-12 flex gap-4 justify-center items-center">
    <Dropdown
      data={performanceOptions}
      selectedOption={performanceOptionsSelected}
      onSelect={setPerformanceOptionSelected}
      sizeClassName="w-[170px] h-[30px]"
    />
    <Dropdown
      data={progressStatusOptions}
      selectedOption={statusOptionsSelected}
      onSelect={setStatusOptionsSelected}
      sizeClassName="w-[122px] h-[30px]"
    />
    <form
      onSubmit={onSubmitSearch}
      className="flex justify-between w-[766px] h-9 relative items-center"
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

export default SearchForm;
