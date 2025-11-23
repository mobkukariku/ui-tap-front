"use client"
import {ChevronDown, ChevronUp, Moon, SearchIcon, Star, User} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SearchFormData, searchFormSchema } from "@/features/client/send-request/client-search-input/model/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {useState} from "react";
import {PriceInput} from "@/features/client/send-request/client-search-input/ui/PriceInput";
import {GuestsInput} from "@/features/client/send-request/client-search-input/ui/GuestsInput";
import {CitySelect} from "@/features/client/send-request/client-search-input/ui/CitySelect";
import {DateInputController} from "@/features/client/send-request/client-search-input/ui/DateInputController";
import {OptionalFilters} from "@/features/client/send-request/client-search-input/ui/OptionalFilters";
import {DistrictMultiSelect} from "@/features/client/send-request/client-search-input/ui/DistrictMultiSelect";
import {usePostSearchRequests} from "@/features/client/send-request/client-search-input/model/api/usePostSearchRequests";
import {useSearchForm} from "@/features/client/send-request/client-search-input/model/useSearchForm";

export function ClientSearchInputs() {
    const [openOptionals, setOpenOptionals] = useState(false);

    const {form, onSubmit, handleReset} = useSearchForm();

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white px-4 sm:px-6 md:px-20 w-full flex flex-col gap-4 sm:gap-6 my-8 sm:my-12 md:my-20 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg"
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <PriceInput form={form}/>
                <DateInputController form={form} />
                <GuestsInput form={form} />
            </div>

            <CitySelect form={form} />
            <DistrictMultiSelect form={form} />


            <div className="flex items-center w-full justify-center cursor-pointer text-center gap-2 text-gray-700 font-medium text-sm py-2" onClick={() => setOpenOptionals(!openOptionals)}>
                Допольнительные параметры
                {openOptionals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>

            {openOptionals && <OptionalFilters form={form} />}

            <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                <Button
                    type="submit"
                    className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white h-11 font-semibold"
                >
                    <SearchIcon width={18} height={18} className="mr-2" />
                    Поиск
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:flex-1 h-11 font-semibold"
                    onClick={handleReset}
                >
                    Очистить
                </Button>
            </div>
        </form>
    )
}