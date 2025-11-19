import {LabelTextInfo} from "@/shared/ui/label-text-info";
import {CalendarIcon, DollarSignIcon, Star, Users} from "lucide-react";
import {TagList} from "@/shared/ui/TagList";
import {SearchRequest} from "@/entities/search-request/model/types";

interface RequestInfoProps {
    request: SearchRequest
}

export function RequestInfo({request}:RequestInfoProps) {

    return (
        <article className="bg-white border rounded-xl shadow-md p-10">
            <header className="flex justify-between flex-wrap gap-6">
                <LabelTextInfo
                    icon={<CalendarIcon width={20} height={20} className="text-green-500" />}
                    label="Дата заезда"
                    value={request.checkInDate}
                />

                <LabelTextInfo
                    icon={<CalendarIcon width={20} height={20} className="text-green-500" />}
                    label="Дата выезда"
                    value={request.checkOutDate}
                />

                <LabelTextInfo
                    icon={<Users width={20} height={20} className="text-green-500" />}
                    label="Гости"
                    value={request.countOfPeople}
                />

                <LabelTextInfo
                    icon={<DollarSignIcon width={20} height={20} className="text-green-500" />}
                    label="Бюджет"
                    value={`${request.price} Тг`}
                />

                <LabelTextInfo
                    icon={<Star width={20} height={20} className="text-yellow-500" />}
                    label="Рейтинг объекта"
                    value={`от ${request.fromRating} до ${request.toRating}`}
                />
            </header>

            <hr className="my-6" />

            <footer className="flex flex-col gap-5">
                <TagList
                    title="Типы размещения:"
                    items={request.unitTypes}
                    color="green"
                />

                <TagList
                    title="Необходимые услуги:"
                    items={request.services.map((service) => service.value)}
                    color="blue"
                />

                <TagList
                    title="Необходимые условия:"
                    items={request.conditions.map((condition) => condition.value)}
                    color="purple"
                />
            </footer>
        </article>
    )
}