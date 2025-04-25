import { Team } from "../App";

type Props = {
    teams: Team[];
    onTeamClick: (team: Team) => void;
};
export default function TeamList({ teams, onTeamClick }: Props) {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {teams.map(team => (
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
    );
}