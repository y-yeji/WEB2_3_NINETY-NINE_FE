import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import Dropdown from "../../components/ui/Dropdown";
import InformationCard from "../../components/common/InformationCard";
import Map from "./Map";

const cardData = [
  { id: 1, title: "Card 1", description: "Description 1" },
  { id: 2, title: "Card 2", description: "Description 2" },
  { id: 3, title: "Card 3", description: "Description 3" },
  { id: 4, title: "Card 1", description: "Description 1" },
  { id: 5, title: "Card 2", description: "Description 2" },
  { id: 6, title: "Card 3", description: "Description 3" },
];

const MapSearch = () => {
  const searchSortOptions = ["전체", "진행중", "오픈 예정"];
  const [selectedSearchSort, setSelectedSearchSort] = useState(
    searchSortOptions[0]
  );
  const handleSearchSortChange = (selected: string) => {
    setSelectedSearchSort(selected);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-[124px]">
      <section className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSearch}
          className="flex justify-end py-[9px] mb-10 w-[1082px] h-[42px] rounded-full border border-gray-20"
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="검색어를 입력하세요"
            className="flex-grow px-4 bg-transparent outline-none"
          />
          <button type="submit" className="mr-6">
            <Icon name="Search" />
          </button>
        </form>
        <Map />
      </section>

      <section className="my-10">
        <div className="flex justify-end mb-10 mr-[97px]">
          <Dropdown
            data={searchSortOptions}
            onSelect={handleSearchSortChange}
            sizeClassName="w-[114px] h-[30px]"
          />
        </div>
        <div className="flex gap-[93px] justify-center flex-wrap mx-auto">
          {cardData.map((card) => (
            <InformationCard
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MapSearch;
