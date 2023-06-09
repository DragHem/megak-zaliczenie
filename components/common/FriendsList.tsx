import React from "react";
import { Product } from "../../interfaces/product/product";

interface Props {
  state: State;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  product: { name: string; price: number; userIDs: string[]; id?: string | undefined };
}

interface State {
  data: {
    userId: string;
    name: string;
    description: string;
    totalValue: number;
    product: Product[];
    users: { id: string|undefined; name: string; nickname: string }[];
  };
}

export const FriendsList = ({ state, setProduct, product }: Props) => {
  const handleClick = (id: string, e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const copy: string[] = product.userIDs;
      copy.push(id);
      setProduct({ ...product, userIDs: copy });
    } else {
      const copy = product.userIDs.filter((x) => x !== id);

      setProduct({ ...product, userIDs: copy });
    }
  };

  return (
    <div
      className={
        "absolute border-warning border-2 p-2 overflow-y-scroll scrollbar-hide h-52 w-44 rounded top-96 left-1/3"
      }
    >
      {state.data.users.map((user) => (
        <p>
          <input
            className={"checkbox checkbox-warning"}
            checked={product.userIDs.indexOf(user.id as string) !== -1}
            onChange={(e) => handleClick(user.id as string, e)}
            type={"checkbox"}
          />
          {user.name}
        </p>
      ))}
    </div>
  );
};
