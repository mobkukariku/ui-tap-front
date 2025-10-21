import {PlusIcon, Search} from "lucide-react";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";

export function ManagerAccommodationFilterPanel() {
    return (
        <section className={"mt-5 mb-10 flex justify-between"}>
            <form role="search" className="flex-1 max-w-md">
                <fieldset
                    className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <Input
                        id="accommondation-search"
                        placeholder="Искать объект"
                        className="pl-9"
                    />
                </fieldset>
            </form>
            <Button>
                <PlusIcon  />
                Добавить жилье
            </Button>
        </section>
    )
}

