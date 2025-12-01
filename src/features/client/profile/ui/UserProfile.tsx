"use client";
import {useMe} from "@/entities/user/model/api/useMe";
import {User as UserIcon, Mail, Phone, UserCircle, CheckCircle2} from "lucide-react";
import {Spinner} from "@/shared/ui/spinner";
import {formatErrorForToast} from "@/shared/lib/error/formatError";
import {toast} from "sonner";
import {useEffect} from "react";
import {Avatar, AvatarFallback} from "@/shared/ui/avatar";

function ProfileCard({icon: Icon, label, value}: {icon: React.ElementType; label: string; value: string}) {
    return (
        <div className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 break-words">{value}</p>
            </div>
        </div>
    );
}

function getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function UserProfile() {
    const {data, isLoading, error} = useMe();

    useEffect(() => {
        if (error) {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Не удалось загрузить данные профиля",
            });
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spinner className={"w-10 h-10"} />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="px-4 sm:px-6 py-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm sm:text-base text-red-600">
                        Не удалось загрузить данные профиля
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Мой профиль
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                    Управляйте своей учетной записью и личной информацией
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 overflow-hidden mb-6 sm:mb-8">
                {/* Avatar Section */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 sm:px-8 py-8 sm:py-10 text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-lg">
                            <AvatarFallback className="bg-white text-green-600 text-3xl sm:text-4xl font-bold">
                                {getInitials(data.firstName, data.lastName)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                        {data.firstName} {data.lastName}
                    </h2>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span className="text-sm text-white font-medium">Аккаунт подтвержден</span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-6 sm:p-8 space-y-4 sm:space-y-5">
                    <ProfileCard
                        icon={UserCircle}
                        label="Имя пользователя"
                        value={data.username}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <ProfileCard
                            icon={UserIcon}
                            label="Имя"
                            value={data.firstName}
                        />
                        <ProfileCard
                            icon={UserIcon}
                            label="Фамилия"
                            value={data.lastName}
                        />
                    </div>
                    <ProfileCard
                        icon={Mail}
                        label="Email"
                        value={data.email}
                    />
                    <ProfileCard
                        icon={Phone}
                        label="Номер телефона"
                        value={data.phoneNumber}
                    />
                </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-200">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 border border-green-600 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                            Информация об аккаунте
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                            Ваш профиль создан и настроен. Вы можете использовать все функции платформы для поиска и бронирования жилья.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

