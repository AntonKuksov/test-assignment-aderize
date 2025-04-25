import { Team } from '../App';

export async function fetchTeams(): Promise<Team[]> {
    const res = await fetch('/api/teams');
    const data = await res.json();
    return data.teams;
}