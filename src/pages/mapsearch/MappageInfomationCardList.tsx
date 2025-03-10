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
          imageUrl={post.postUrl || "/default-image.png"}
          date={`${post.startDate} ~ ${post.endDate}`}
          location={post.location || "위치 정보 없음"}
          isBookmarked={post.isBookmarked}
          category={post.category}
        />
      ))}
    </div>
  );
};

export default MappageInfomationCardList;
