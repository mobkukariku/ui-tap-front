
import Link from "next/link";

interface AccommodationItemProps {
    id: string;
    name: string;
    imageURL: string;
    href?: string;
}

export function AccommodationItem({ imageURL, name, id, href }: AccommodationItemProps) {
    const linkHref = href || `/manager/accommodations/${id}`;

    return (
        <Link href={linkHref} className="w-full sm:w-[280px] md:w-[280px]">
            <div
                className={"py-2 px-4 w-full h-32 sm:h-36 md:h-40 rounded-lg shadow-md/20 relative flex flex-col justify-end bg-cover bg-center hover:shadow-lg transition-shadow"}
                style={{ backgroundImage: `url(${imageURL})` }}
            >
                <div className={"absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent"}></div>
                <h3 className={"relative z-10 font-semibold text-base sm:text-lg md:text-xl text-white mb-1 line-clamp-2"}>{name}</h3>
            </div>
        </Link>
    );
}