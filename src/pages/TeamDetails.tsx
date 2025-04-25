import { Team } from "../App";
import EditMemberRow from "../components/EditMemberRow";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { updateTeamName, updateMember } from "../store/teamSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { isEqual } from "lodash";

import { ToastContainer } from "react-toastify";

type Props = {
    team: Team;
    onBack: () => void;
};

export default function TeamDetails({ team, onBack }: Props) {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const [editedName, setEditedName] = useState(team.name);
    const [editedMembers, setEditedMembers] = useState(team.members);
    const [isSaving, setIsSaving] = useState(false);
    const [emailValidMap, setEmailValidMap] = useState<boolean[]>(() => team.members.map(() => true));

    const isChanged =
        editedName !== team.name ||
        !isEqual(editedMembers, team.members);

    const isFormValid = emailValidMap.every(Boolean);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const handleBack = () => {
        if (!isChanged || confirm("You have unsaved changes. Leave anyway?")) {
            onBack();
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const updatedTeam = { ...team, name: editedName, members: editedMembers };
        await fetch(`/api/teams/${team.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTeam),
        });
        dispatch(updateTeamName({ teamId: team.id, name: editedName }));
        editedMembers.forEach((member, i) => {
            if (!isEqual(member, team.members[i])) {
                dispatch(updateMember({ teamId: team.id, index: i, member }));
            }
        });
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Changes saved successfully.");
        }, 500);
    };


    return (
        <div>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop />

            <button onClick={handleBack} className="mb-4 bg-gray-700 text-white">← Back to Teams</button>
            <input
                ref={nameInputRef}
                className="border rounded p-1 text-lg font-bold mb-4 w-full"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
            />
            <table className="w-full table-auto border mb-4">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Email</th>
                </tr>
                </thead>
                <tbody>
                {editedMembers.map((member, i) => (
                    <EditMemberRow
                        key={i}
                        member={member}
                        index={i}
                        teamId={team.id}
                        onChange={(updated) => {
                            const newMembers = [...editedMembers];
                            newMembers[i] = updated;
                            setEditedMembers(newMembers);
                        }}
                        onValid={(valid) => {
                            setEmailValidMap((prev) => {
                                const copy = [...prev];
                                copy[i] = valid;
                                return copy;
                            });
                        }}
                    />
                ))}
                </tbody>
            </table>
            <button
                onClick={handleSave}
                className={`text-white px-4 py-2 rounded ${isChanged && isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isChanged || !isFormValid || isSaving}
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}
