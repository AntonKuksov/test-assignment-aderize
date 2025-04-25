import { useAppDispatch } from "../store/hooks";
import { updateTeamName } from "../store/teamSlice";

interface Props {
    teamId: string;
    name: string;
}

export default function EditTeamName({ teamId, name }: Props) {
    const dispatch = useAppDispatch();

    return (
        <input
            className="border rounded p-1 text-lg font-bold mb-4 w-full"
            type="text"
            defaultValue={name}
            onBlur={(e) => dispatch(updateTeamName({ teamId, name: e.target.value }))}
        />
    );
}