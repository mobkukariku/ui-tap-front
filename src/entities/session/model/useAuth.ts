"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { sessionService } from "@/entities/session/model/sessionService";

export const sessionKeys = {
    session: () => ["session"] as const,
};

export const useAuth = () => {
    const queryClient = useQueryClient();

    const getAuthState = useCallback(() => {
        const token = sessionService.getToken();

        if (!token || sessionService.isTokenExpired(token)) {
            sessionService.removeTokens();
            return { isAuthenticated: false, user: null };
        }

        const user = sessionService.getUserFromToken(token);
        return { isAuthenticated: !!user, user };
    }, []);

    const { data, refetch } = useQuery({
        queryKey: sessionKeys.session(),
        queryFn: getAuthState,
        staleTime: Infinity,
    });

    const login = useCallback(
        async (accessToken: string) => {
            sessionService.setTokens(accessToken);
            await refetch();
        },
        [refetch]
    );

    const logout = useCallback(async () => {
        sessionService.removeTokens();
        await queryClient.invalidateQueries({ queryKey: sessionKeys.session() });
        await refetch();
    }, [queryClient, refetch]);

    return {
        isAuthenticated: data?.isAuthenticated ?? false,

        user: data?.user ?? null,
        login,
        logout,
        refetch,
    };
};
