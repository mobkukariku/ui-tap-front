import Link from "next/link";

interface AccommodationItemProps {
    id: string;
    name: string;
    imageURL: string;
}

export function AccommodationItem({ imageURL, name, id }: AccommodationItemProps) {
    return (
        <Link href={`/manager/accommodations/${id}`}>
            <div
                className={"py-2 px-4 w-70 h-40 rounded-lg shadow-md/20 relative  flex flex-col justify-end bg-cover bg-center"}
                style={{ backgroundImage: `url(${imageURL})` }}
            >
                <div className={"absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent"}></div>
                <h3 className={"relative z-10 font-semibold text-xl text-white mb-1"}>{name}</h3>
            </div>
        </Link>
    );
}