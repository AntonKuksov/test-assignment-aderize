import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Team, Member } from "../App";
import { fetchTeams as fetchTeamsAPI } from "../api/teams";

interface TeamState {
    teams: Team[];
    selectedTeam: Team | null;
    filterText: string;
    loading: boolean;
    error: string;
}

const initialState: TeamState = {
    teams: [],
    selectedTeam: null,
    filterText: "",
    loading: false,
    error: "",
};

export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
    const teams = await fetchTeamsAPI();
    return teams;
});

const teamSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        setSelectedTeam(state, action: PayloadAction<Team | null>) {
            state.selectedTeam = action.payload;
            if (action.payload) {
                const index = state.teams.findIndex(t => t.id === action.payload!.id);
                if (index !== -1) {
                    state.teams[index] = action.payload;
                }
            }
        },
        setFilterText(state, action: PayloadAction<string>) {
            state.filterText = action.payload;
        },
        updateTeamName(state, action: PayloadAction<{ teamId: string; name: string }>) {
            const team = state.teams.find(t => t.id === action.payload.teamId);
            if (team) {
                team.name = action.payload.name;
                if (state.selectedTeam?.id === team.id) {
                    state.selectedTeam.name = action.payload.name;
                }
            }
        },
        updateMember(state, action: PayloadAction<{ teamId: string; index: number; member: Member }>) {
            const team = state.teams.find(t => t.id === action.payload.teamId);
            if (team) {
                team.members[action.payload.index] = action.payload.member;
                if (state.selectedTeam?.id === team.id) {
                    state.selectedTeam.members[action.payload.index] = action.payload.member;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload;
                state.loading = false;
            })
            .addCase(fetchTeams.rejected, (state) => {
                state.error = "Failed to load teams. Please try again later.";
                state.loading = false;
            });
    },
});

export const {
    setSelectedTeam,
    setFilterText,
    updateTeamName,
    updateMember
} = teamSlice.actions;
export default teamSlice.reducer;
