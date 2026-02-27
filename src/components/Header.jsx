export default function Header({ dark, setDark }) {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
                💰 Settler
            </h1>

            <button
                onClick={() => setDark(!dark)}
                className="px-4 py-2 rounded-xl font-medium shadow-md transition-all duration-300 
        bg-slate-800 text-white hover:scale-105
        dark:bg-white dark:text-slate-900"
            >
                {dark ? "☀" : "🌙"}
            </button>
        </div>
    );
}