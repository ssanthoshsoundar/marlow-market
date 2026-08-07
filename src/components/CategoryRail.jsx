export default function CategoryRail({ categories, active, onSelect }) {
  return (
    <nav className="bg-white border-b border-[#E4E1D8] overflow-x-auto">
      <ul className="flex gap-1 px-4 sm:px-6 py-2 min-w-max">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-150 animate-wiggle ${
                active === cat
                  ? "bg-[#14213D] text-white -rotate-1 shadow-sm"
                  : "text-[#1A1A18] hover:bg-[#F0EEE6]"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
