import { NavLink } from "react-router-dom";

interface CategoryProps {
  onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({ onClick }) => {
  return (
    <div className="pt-5 text-base-1">
      {[
        { to: "/informations/popups", text: "팝업스토어" },
        { to: "/informations/exhibition", text: "전시회" },
        { to: "/informations/musical", text: "뮤지컬 | 연극" },
        {
          to: "/informations/festivals",
          text: "페스티벌",
        },
        { to: "/MapSearch", text: "지도 검색" },
        { to: "/community", text: "소셜 커뮤니티" },
      ].map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          onClick={onClick}
          className={({ isActive }) => {
            return `block w-[230px] h-[46px] mb-5 rounded ${
              isActive
                ? "bg-base-1 text-blue-7"
                : "text-base-1 hover:bg-base-1 hover:text-blue-7"
            }`;
          }}
        >
          <div className="flex items-center h-full px-4 body-large-m">
            {item.text}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Category;
