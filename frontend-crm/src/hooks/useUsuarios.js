import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useUsuarios() {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const { data } = await api.get("/usuarios");
      return data;
    },
    staleTime: 1000 * 60,
  });
}
