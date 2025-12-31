import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border-subtle)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-1">
              Moving Pictures
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Discover the best TV shows from around the world
            </p>
          </div>

          {/* TMDB Attribution */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                width={120}
                height={20}
                className="h-5 w-auto"
              />
            </a>
            <p className="text-xs text-[var(--text-muted)] text-center max-w-xs">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <a
              href="https://github.com/lyubo-velikoff/moving-pictures"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
          <p>
            Made with passion for great TV shows. Data provided by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-secondary)] hover:underline"
            >
              TMDB
            </a>{" "}
            and{" "}
            <a
              href="https://mydramalist.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-secondary)] hover:underline"
            >
              MyDramaList
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
