import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useClientes() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const { data } = await api.get("/clientes");
      return data;
    },
    staleTime: 1000 * 60,
  });
}
