import React from "react";
import Icon from "../../assets/icons/Icon";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 10;

  const currentGroup = Math.ceil(currentPage / maxPageNumbersToShow);
  const startPage = (currentGroup - 1) * maxPageNumbersToShow + 1;
  const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="px-2 py-2 rounded-md text-base-1 bg-blue-7 disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <Icon
          name="ChevronsLeft"
          size={24}
          strokeWidth={2}
          className="text-white"
        />
      </button>

      <button
        className="px-2 py-2 rounded-md text-base-1 bg-blue-7 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon
          name="ChevronLeft"
          size={24}
          strokeWidth={2}
          className="text-white"
        />
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index}
          className={`px-3.5 py-1.5 rounded-md font-bold text-sm leading-6 ${currentPage === startPage + index ? "border border-blue-1 text-gray-80" : "bg-white text-gray-50"}`}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index}
        </button>
      ))}

      <button
        className="px-2 py-2 rounded-md text-base-1 bg-blue-7 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon
          name="ChevronRight"
          size={24}
          strokeWidth={2}
          className="text-white"
        />
      </button>

      <button
        className="px-2 py-2 rounded-md text-base-1 bg-blue-7 disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <Icon
          name="ChevronsRight"
          size={24}
          strokeWidth={2}
          className="text-white"
        />
      </button>
    </div>
  );
};

export default Pagination;
