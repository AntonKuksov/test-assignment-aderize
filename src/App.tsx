import { useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TeamList from "./pages/TeamList";
import TeamDetails from "./pages/TeamDetails";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchTeams, setFilterText, setSelectedTeam } from "./store/teamSlice";
import debounce from "lodash.debounce";

export interface Member {
    id: number;
    name: string;
    role: string;
    email: string;
}

export interface Team {
    id: string;
    name: string;
    createdAt: string;
    members: Member[];
}

export default function App() {
    const dispatch = useAppDispatch();
    const { teams, selectedTeam, filterText, loading, error } = useAppSelector((state) => state.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleDeselect = () => {
        dispatch(setSelectedTeam(null));
    };

    const debouncedFilter = useMemo(
        () => debounce((value: string) => dispatch(setFilterText(value)), 300),
        [dispatch]
    );

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse h-24 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-red-600 font-medium">{error}</div>
                    ) : selectedTeam ? (
                        <TeamDetails team={selectedTeam} onBack={handleDeselect} />
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Search teams..."
                                className="mb-4 p-2 border rounded w-full max-w-md"
                                defaultValue={filterText}
                                onChange={(e) => debouncedFilter(e.target.value)}
                            />
                            <TeamList teams={filteredTeams} onTeamClick={(team) => dispatch(setSelectedTeam(team))} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}