"use client"
import { Controller } from "react-hook-form";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { District } from "@/entities/district/model/types";
import { City } from "@/entities/city/model/types";
import { useHandleAccommodationFormFields } from "@/features/manager/accommodations/create-accommodation/model/useHandleAccommodationFormFields";
import {ImageUploader} from "@/widgets/images-uploader/ui/ImageUploader";

export function CreateAccommodationFormFields() {
    const {
        form,
        cities,
        districts,
        imagePreviews,
        handleImagesChange,
        removeImage,
        onSubmit,
        handleCancel,
    } = useHandleAccommodationFormFields();

    return (
        <form className={"my-20 flex break-all flex-col mx-auto gap-5"} onSubmit={form.handleSubmit(onSubmit)}>
            <ImageUploader
                images={imagePreviews}
                onImagesChange={handleImagesChange}
                onImageRemove={removeImage}
                error={form.formState.errors.images?.message as string}
                maxImages={10}
                required
            />

            <fieldset className="flex flex-col gap-2">
                <Label>Имя</Label>
                <Input
                    placeholder="Имя"
                    {...form.register("name")}
                    className={form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message as string}</p>
                )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
                <Label>Адрес</Label>
                <Input
                    placeholder="Адрес"
                    {...form.register("address")}
                    className={form.formState.errors.address ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.address && (
                    <p className="text-sm text-red-500">{form.formState.errors.address.message as string}</p>
                )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
                <Label>Описание</Label>
                <Textarea
                    placeholder="Описание"
                    {...form.register("description")}
                    className={form.formState.errors.description ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message as string}</p>
                )}
            </fieldset>

            <div className={"flex flex-row gap-4 w-full"}>
                <fieldset className="flex flex-col w-full gap-2">
                    <Label>Город</Label>
                    <Controller
                        name="cityId"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger className={`w-full ${form.formState.errors.cityId ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                    <SelectValue placeholder="Выберите город" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {cities?.map((item: City) => (
                                            <SelectItem value={String(item.id)} key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.cityId && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.cityId.message as string}
                        </p>
                    )}
                </fieldset>

                <fieldset className="flex flex-col w-full gap-2">
                    <Label>Округи</Label>
                    <Controller
                        name="districtId"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger className={`w-full ${form.formState.errors.districtId ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                    <SelectValue placeholder="Выберите округ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {districts?.map((item: District) => (
                                            <SelectItem value={String(item.id)} key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.districtId && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.districtId.message as string}
                        </p>
                    )}
                </fieldset>
            </div>

            <fieldset className="flex flex-col gap-2">
                <Label>Рейтинг</Label>
                <Input
                    type={"number"}
                    placeholder="Рейтинг"
                    {...form.register("rating")}
                    className={form.formState.errors.rating ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.rating && (
                    <p className="text-sm text-red-500">{form.formState.errors.rating.message as string}</p>
                )}
            </fieldset>

            <fieldset className="flex flex-row self-center gap-2">
                <Button type={"submit"}>Создать</Button>
                <Button type="button" onClick={handleCancel} variant={"outline"}>Отмена</Button>
            </fieldset>
        </form>
    );
}