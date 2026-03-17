import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useRelatorios() {
  return useQuery({
    queryKey: ["relatorios"],
    queryFn: async () => {
      const { data } = await api.get("/relatorios");
      return data;
    },
    staleTime: 1000 * 60, // cache de 1 minuto
  });
}
