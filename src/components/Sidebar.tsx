export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
            <h2 className="text-xl font-bold mb-4">Team Dashboard</h2>
            <nav>
                <ul>
                    <li className="mb-2">🏠 Dashboard</li>
                    <li className="mb-2">👥 Teams</li>
                </ul>
            </nav>
        </aside>
    );
}