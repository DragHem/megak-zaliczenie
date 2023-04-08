import { kittyList } from "../../interfaces/kitty";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  kitty: kittyList;
}

export const KittyCard = ({ kitty }: Props) => {
  const { query } = useRouter();

  return (
    <Link href={kitty.id} scroll={false}>
      <div
        className={`card w-full text-primary-content ${
          query.id === undefined
            ? "bg-yellow-600"
            : query.id[0] === kitty.id
            ? "bg-warning"
            : "bg-yellow-600"
        }`}
      >
        <div className="card-body">
          <h2 className="card-title">{kitty.name}</h2>
          <p>{kitty.description}</p>
        </div>
      </div>
    </Link>
  );
};
