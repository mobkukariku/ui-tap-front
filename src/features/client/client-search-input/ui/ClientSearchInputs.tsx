"use client"
import {ChevronDown, ChevronUp, Moon, SearchIcon, Star, User} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SearchFormData, searchFormSchema } from "@/features/client/client-search-input/model/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {useState} from "react";
import {PriceInput} from "@/features/client/client-search-input/ui/PriceInput";
import {GuestsInput} from "@/features/client/client-search-input/ui/GuestsInput";
import {CitySelect} from "@/features/client/client-search-input/ui/CitySelect";
import {DateInputController} from "@/features/client/client-search-input/ui/DateInputController";
import {OptionalFilters} from "@/features/client/client-search-input/ui/OptionalFilters";
import {DistrictMultiSelect} from "@/features/client/client-search-input/ui/DistrictMultiSelect";
import {usePostSearchRequests} from "@/features/client/client-search-input/model/api/usePostSearchRequests";

export function ClientSearchInputs() {
    const [openOptionals, setOpenOptionals] = useState(false);
    const {mutate} = usePostSearchRequests();

    const form = useForm<SearchFormData>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            unitType: "",
            checkInDate: "",
            checkOutDate: "",
            oneNight: false,
            price: undefined,
            cityId: "",
            countOfPeople: 1,
            fromRating: 0,
            toRating: 5,
            districtIds: [],
            serviceDictionaryIds: [],
            conditionDictionaryIds: []
        }
    })

    const onSubmit: SubmitHandler<SearchFormData> = (data: SearchFormData) => {
        try {
            const requestData = {
                checkInDate: data.checkInDate,
                checkOutDate: data.checkOutDate,
                oneNight: data.oneNight,
                price: data.price || 0,
                countOfPeople: data.countOfPeople,
                fromRating: data.fromRating || 0,
                toRating: data.toRating || 5,
                unitTypes: data.unitType ? [data.unitType] : ["HOTEL_ROOM", "APARTMENT"],
                districtIds: data.districtIds,
                serviceDictionaryIds: data.serviceDictionaryIds,
                conditionDictionaryIds: data.conditionDictionaryIds,
            }

            mutate(requestData);


        } catch (error) {
            console.error("Form submission error:", error)
        }
    }

    const handleReset = () => {
        form.reset()
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white px-6 md:px-20 w-full flex flex-col gap-6 my-20 rounded-xl p-8 shadow-lg"
        >
            <div className="flex flex-row justify-between items-end gap-4">
                <PriceInput form={form}/>
                <DateInputController form={form} />
                <GuestsInput form={form} />
            </div>

            <CitySelect form={form} />
            <DistrictMultiSelect form={form} />


            <div className="flex items-center w-full justify-center cursor-pointer  text-center gap-2 text-gray-700 font-medium text-sm" onClick={() => setOpenOptionals(!openOptionals)}>
                Допольнительные параметры
                {openOptionals ? <ChevronUp /> : <ChevronDown />}
            </div>

            {openOptionals && <OptionalFilters form={form} />}

            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-11 font-semibold"
                >
                    <SearchIcon width={18} height={18} className="mr-2" />
                    Поиск
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11 font-semibold"
                    onClick={handleReset}
                >
                    Очистить
                </Button>
            </div>
        </form>
    )
}