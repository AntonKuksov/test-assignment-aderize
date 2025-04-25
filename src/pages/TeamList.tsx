import { Team } from "../App";
import { useState } from "react";

type Props = {
    teams: Team[];
    onTeamClick: (team: Team) => void;
};

const ITEMS_PER_PAGE = 6;

export default function TeamList({ teams, onTeamClick }: Props) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const visibleTeams = teams.slice(start, start + ITEMS_PER_PAGE);

    return (
        <div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {visibleTeams.map(team => (
                    <div
                        key={team.id}
                        className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
                        onClick={() => onTeamClick(team)}
                    >
                        <h2 className="text-lg font-bold">{team.name}</h2>
                        <p>{team.members.length} members</p>
                        <p className="text-sm text-gray-500">Created: {new Date(team.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
