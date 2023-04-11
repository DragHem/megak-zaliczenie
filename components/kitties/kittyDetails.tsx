import useSWR from "swr";
import { useRouter } from "next/router";
import { Chart } from "./chart";
import { product } from "../../interfaces/kitty";
import { CreateKitty } from "./createKitty";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const KittyDetails = () => {
  const { query } = useRouter();

  if (query.id) {
    if (query.id == "createKitty") {
      return <CreateKitty />;
    }
    const { data, error, isLoading } = useSWR(
      `/api/kitty/${query.id![0]}`,
      fetcher
    );

    if (isLoading) {
      return <div>loading</div>;
    }
    if (!data) return null;

    const productData = data.products.map((product: product) => (
      <div>
        {product.name} {product.price}{" "}
        {product.users.map((user) => (
          <p>{user.name}</p>
        ))}
      </div>
    ));
    console.log(data);
    return (
      <div>
        <Chart data={data.data} />
        {productData}
        <p>jakieś dane się pomyśli</p>
      </div>
    );
  }

  return <h2>Wybierz zrzutkę do przeglądania</h2>;
};
