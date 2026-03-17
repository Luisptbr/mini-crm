import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

/**
 * Hook para buscar a lista de usuários do sistema.
 * Utiliza React Query para cache, revalidação e controle de estado.
 */
export function useUsuarios() {
  return useQuery({
    queryKey: ["usuarios"], // chave única para cache
    queryFn: async () => {
      try {
        const { data } = await api.get("/usuarios");
        return data;
      } catch (error) {
        // Lança erro para ser tratado pelo React Query
        throw new Error(
          error.response?.data?.message || "Erro ao carregar usuários",
        );
      }
    },
    staleTime: 1000 * 60, // cache válido por 1 minuto
    retry: 2, // tenta novamente até 2 vezes em caso de falha
    refetchOnWindowFocus: false, // não refaz a requisição ao focar a janela
  });
}
