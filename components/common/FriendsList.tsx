import React from "react";
import { Product } from "../../interfaces/product/product";

interface Props {
  state: State;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  product: { name: string; price: number; userIDs: []; id?: string };
}

interface State {
  data: {
    userId: string;
    name: string;
    description: string;
    totalValue: number;
    product: Product[];
    users: { id: string; name: string; nickname: string }[];
  };
}

export const FriendsList = ({ state, setProduct, product }: Props) => {
  const handleClick = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const copy = product.userIDs;
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
            checked={product.userIDs.indexOf(user.id) !== -1}
            onClick={(e) => handleClick(user.id, e)}
            type={"checkbox"}
          />
          {user.name}
        </p>
      ))}
    </div>
  );
};
