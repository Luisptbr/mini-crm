import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useEstoque() {
  return useQuery({
    queryKey: ["estoque"],
    queryFn: async () => {
      const { data } = await api.get("/estoque");
      return data;
    },
    staleTime: 1000 * 60,
  });
}
