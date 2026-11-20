import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { missionsApi, getErrorMessage } from "@/services/api";
import { useUserLocation } from "@/hooks/useUserLocation";

export const missionKeys = {
  all: ["missions"],
  list: (filters) => ["missions", "list", filters],
  detail: (id) => ["missions", "detail", id],
};

export function useMissions(filters) {
  const { lat, lng } = useUserLocation();
  const query = { ...filters, lat, lng };
  return useQuery({
    queryKey: missionKeys.list(query),
    queryFn: () => missionsApi.list(query),
    placeholderData: (previous) => previous, // keep old results while filters change
  });
}

export function useMission(id) {
  const { lat, lng } = useUserLocation();
  return useQuery({
    queryKey: missionKeys.detail(id),
    queryFn: () => missionsApi.get(id, { lat, lng }),
    enabled: Boolean(id),
  });
}

function useMembershipMutation(action, { successMessage }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => missionsApi[action](id),
    onSuccess: (mission) => {
      queryClient.invalidateQueries({ queryKey: missionKeys.all });
      toast.success(successMessage(mission));
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useJoinMission() {
  return useMembershipMutation("join", {
    successMessage: (m) => `You're in! See you at ${m.location.name.split(",")[0]}.`,
  });
}

export function useLeaveMission() {
  return useMembershipMutation("leave", {
    successMessage: () => "You've left the mission. The host has been notified.",
  });
}
