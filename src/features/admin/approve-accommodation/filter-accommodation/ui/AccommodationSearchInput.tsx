import {Input} from "@/shared/ui/input";
import {Search} from "lucide-react";

export function AccommodationSearchInput() {

    return (
        <form role="search" className="flex-1 max-w-md">
            <fieldset
                className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <Input
                    id="accommondation-search"
                    placeholder="Найти Accommondation..."
                    className="pl-9"
                />
            </fieldset>
        </form>
    )
}