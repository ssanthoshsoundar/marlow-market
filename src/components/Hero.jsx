export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#14213D]">
      {/* floating decorative shapes, kept to the existing palette */}
      <div className="absolute top-6 right-10 w-16 h-16 rounded-full bg-[#FF6B35]/20 animate-float hidden sm:block" />
      <div
        className="absolute bottom-4 right-32 w-10 h-10 rounded-full bg-[#FAFAF7]/10 animate-float hidden sm:block"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-10 left-1/3 w-6 h-6 rotate-45 bg-[#FF6B35]/30 animate-float hidden sm:block"
        style={{ animationDelay: "1.8s" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-10 sm:py-14 text-white">
        <p className="text-xs tracking-widest uppercase text-[#FF6B35] font-medium mb-2">
          New stuff, weekly
        </p>
        <h1 className="font-[Fraunces] text-3xl sm:text-4xl leading-tight max-w-lg">
          Good finds, fair prices,
          <br />
          <span className="relative inline-block">
            zero nonsense.
            <svg
              className="absolute left-0 -bottom-2 w-full"
              height="10"
              viewBox="0 0 220 10"
              preserveAspectRatio="none"
            >
              <path
                d="M2 7 Q 30 2, 55 6 T 110 6 T 165 6 T 218 5"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="3"
                strokeLinecap="round"
                className="squiggle-path"
              />
            </svg>
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-md">
          Browse a handful of things worth owning. Curated, not endless.
        </p>
      </div>
    </section>
  );
}
