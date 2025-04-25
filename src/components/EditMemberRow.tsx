import { Member } from "../App";
import { ChangeEvent, useState, useEffect } from "react";
import { validateEmail } from "../utils/emailValidation";

interface Props {
    member: Member;
    index: number;
    teamId: string;
    onChange: (updated: Member) => void;
    onValid?: (valid: boolean) => void;
}

export default function EditMemberRow({ member, onChange, onValid }: Props) {
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        const valid = validateEmail(member.email);
        setEmailError(valid ? "" : "Invalid email address");
        onValid?.(valid);
    }, [member.email, onValid]);

    const handleFieldChange = (key: keyof Member) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (key === "email")
        setEmailError(validateEmail(value) ? "" : "Invalid email address");
        onChange({ ...member, [key]: value });
    };


    return (
        <tr>
            <td className="border px-4 py-2">
                <input
                    className="w-full border rounded px-1"
                    type="text"
                    value={member.name}
                    onChange={handleFieldChange("name")}
                />
            </td>
            <td className="border px-4 py-2">
                <input
                    className="w-full border rounded px-1"
                    type="text"
                    value={member.role}
                    onChange={handleFieldChange("role")}
                />
            </td>
            <td className="border px-4 py-2">
                <input
                    className={`w-full border rounded px-1 ${emailError ? 'border-red-500' : ''}`}
                    type="email"
                    value={member.email}
                    onChange={handleFieldChange("email")}
                />
                {emailError && (
                    <p className="text-red-600 text-sm mt-1">{emailError}</p>
                )}
            </td>
        </tr>
    );
}
