import useSWR from "swr";
import { useRouter } from "next/router";
import { Chart } from "./chart";
import { CreateKitty } from "./createKitty";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const KittyDetails = () => {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    query.id &&
      (query.id[0] === "createKitty" ? null : `/api/kitty/${query.id[0]}`),
    fetcher
  );

  if (query.id) {
    if (query.id == "createKitty") {
      return <CreateKitty />;
    }

    if (isLoading) {
      return <div>loading</div>;
    }

    if (!data) return null;

    const productData = data.products.map(
      (product: { name: string; price: number; users: { name: string }[] }) => (
        <div>
          {product.name} {product.price}{" "}
          {product.users.map((user) => (
            <p>{user.name}</p>
          ))}
        </div>
      )
    );

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

export default KittyDetails;
