import useSWR from "swr";
import { useRouter } from "next/router";
import { Chart } from "./chart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const KittyDetails = () => {
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
    // @ts-ignore

    const productData = data.products.map((product) => (
      <div>
        {product.name} {product.price}{" "}
        {product.users.map(
          (
            // @ts-ignore
            user
          ) => (
            <p>{user.name}</p>
          )
        )}
      </div>
    ));

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
