import {Controller, UseFormReturn} from "react-hook-form";
import {DateInputs} from "@/features/client/client-search-input/ui/DateInputs";
import {SearchFormData} from "@/features/client/client-search-input/model/schema";

interface DateInputControllerProps {
    form: UseFormReturn<SearchFormData>

}

export function DateInputController({form}:DateInputControllerProps) {
    return (
        <div className="flex-1">
            <Controller
                name="checkInDate"
                control={form.control}
                render={({ field }) => (
                    <DateInputs
                        value={{
                            from: form.watch("checkInDate"),
                            to: form.watch("checkOutDate")
                        }}
                        onChange={(dates) => {
                            form.setValue("checkInDate", dates?.from || "")
                            form.setValue("checkOutDate", dates?.to || "")
                        }}
                        error={
                            form.formState.errors.checkInDate?.message ||
                            form.formState.errors.checkOutDate?.message
                        }
                    />
                )}
            />
        </div>
    )
}