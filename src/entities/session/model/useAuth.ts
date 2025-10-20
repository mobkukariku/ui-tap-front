import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useCallback} from "react";
import {sessionService} from "@/entities/session/model/sessionService";

export const sessionKeys = {
    session: () => ["session"] as const,
};


export const useAuth = () => {
    const queryClient = useQueryClient();

    const getAuthState = useCallback(() => {
        const token = sessionService.getToken();

        if(!token) {
            return {
                isAuthenticated: false,
                user: null,
            }
        };

        if(sessionService.isTokenExpired(token)) {
            sessionService.removeTokens();
            return {
                isAuthenticated: false,
                user: null,
            }
        }

        const user = sessionService.getUserFromToken(token);
        return {
            isAuthenticated: !!user,
            user,
        }
    }, [])

    const { data, refetch } = useQuery({
        queryKey: sessionKeys.session(),
        queryFn: getAuthState,
        staleTime: Infinity,
    });

    const login = useCallback((accessToken: string, refreshToken: string) => {
        sessionService.setTokens(accessToken, refreshToken);
        return refetch();
    }, [refetch]);

    const logout = useCallback(() => {
        sessionService.removeTokens();
        queryClient.invalidateQueries({ queryKey: sessionKeys.session() });
        return refetch();
    }, [queryClient, refetch]);

    const hasRole = useCallback((role: string | string[]) => {
        return sessionService.hasRole(role);
    }, []);

    return {
        isAuthenticated: data?.isAuthenticated ?? false,
        user: data?.user ?? null,
        login,
        logout,
        hasRole,
        refetch,
    };
}