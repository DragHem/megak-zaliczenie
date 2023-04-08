import useSWR from "swr";
import { useRouter } from "next/router";
import { Chart } from "./chart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const KittyDetails = () => {
  const { query } = useRouter();
  console.log(query);
  if (query.id) {
    const { data, error, isLoading } = useSWR(
      `/api/kitty/${query.id![0]}`,
      fetcher
    );
    console.log(data);
    console.log(query);
    if (isLoading) {
      return <div>loading</div>;
    }
    if (!data) return null;

    const dane = data.products.map((product) => (
      <div>
        {product.name} {product.price}{" "}
        {product.users.map((user) => (
          <p>{user.name}</p>
        ))}
      </div>
    ));
    return (
      <div>
        <Chart data={data.data} />
        {dane}
        <p>jakieś dane się pomyśli</p>
      </div>
    );
  }
};
