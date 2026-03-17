import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useMovimentacoes() {
  return useQuery({
    queryKey: ["movimentacoes"],
    queryFn: async () => {
      const { data } = await api.get("/movimentacao");
      return Array.isArray(data) ? data : [];
    },
  });
}
