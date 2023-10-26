import {useRouter, useSearchParams} from "next/navigation";

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
  };

  return <div>Pagination</div>;
};

export default Pagination;
