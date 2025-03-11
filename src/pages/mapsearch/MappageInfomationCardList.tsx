import InformationCard from "../../components/common/InformationCard";
import { MapPost } from "../../types/mapSearch";

interface InformationCardListProps {
  posts?: (MapPost & { isBookmarked: boolean; category: string })[];
  isLoading?: boolean;
}

const MappageInfomationCardList = ({
  posts,
  isLoading,
}: InformationCardListProps) => {
  if (isLoading)
    return <p className="text-center">리스트를 불러오는 중입니다.</p>;
  if (!posts || posts.length === 0)
    return <p className="text-center">리스트가 없습니다.</p>;

  return (
    <div className="flex gap-[93px] justify-center flex-wrap mx-auto">
      {posts.map((post) => (
        <InformationCard
          key={post.id}
          id={post.id}
          title={post.title}
          imageUrl={
            typeof post.postUrl === "string"
              ? post.postUrl.startsWith("[") && post.postUrl.endsWith("]")
                ? post.postUrl
                    .slice(1, -1)
                    .split(",")[0]
                    .trim()
                    .replace(/['"]/g, "")
                : post.postUrl
              : Array.isArray(post.postUrl)
                ? post.postUrl[0]
                : ""
          }
          startDate={post.startDate} // Pass startDate directly
          endDate={post.endDate} // Pass endDate directly
          location={post.location || "위치 정보 없음"}
          isBookmarked={post.isBookmarked}
          category={post.category} // 이미 변환된 카테고리를 사용
        />
      ))}
    </div>
  );
};

export default MappageInfomationCardList;
