import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function usePedidos() {
  return useQuery({
    queryKey: ["pedidos"],
    queryFn: async () => {
      const { data } = await api.get("/pedidos");
      return data;
    },
    staleTime: 1000 * 60,
  });
}
