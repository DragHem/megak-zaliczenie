import { kittyList } from "../../interfaces/kitty";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  kitty: kittyList;
  isEnded:boolean;
}

export const KittyCard = ({ kitty,isEnded }: Props) => {
  const { query } = useRouter();

  return (
    <Link href={kitty.id} scroll={false}>
      <div
        className={`card mt-3 w-full text-primary-content ${
          query.id === undefined
            ? "bg-yellow-600"
            : !isEnded?query.id[0] === kitty.id
            ? "bg-warning"
            : "bg-yellow-600":query.id[0] === kitty.id
                  ? "bg-yellow-200"
                  : "bg-yellow-300"
        }`}
      >
        <div className="card-body">
          <h2 className="card-title">{kitty.name}</h2>
          <p><b>Kwota całkowita : </b> {kitty.totalValue} zł</p>
        </div>
      </div>
    </Link>
  );
};
