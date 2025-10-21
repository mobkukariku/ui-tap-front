import {PlusIcon, Search} from "lucide-react";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";

export function AccommodationsUnitFilter() {
    return (
        <section className={"flex  justify-between mt-10 mb-5"}>
            <form role="search" className="flex-1 max-w-md">
                <fieldset
                    className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <Input
                        id="condition-search"
                        placeholder="Найти условие..."
                        className="pl-9"
                    />
                </fieldset>
            </form>
            <Button>
                <PlusIcon  />
                Добавить номер
            </Button>
        </section>
    )
}