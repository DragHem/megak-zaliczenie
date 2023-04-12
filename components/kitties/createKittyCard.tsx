import Link from "next/link";

export const CreateKittyCard = () => {
  return (
        <Link href={"createKitty"} scroll={false}>
          <div className={`card mt-3 w-auto text-primary-content bg-amber-200`}>
            <div className={"card-body"}>
              <h1 className={"card-title justify-center"}>Dodaj zrzutkę</h1>
            </div>
          </div>
        </Link>

  );
};
