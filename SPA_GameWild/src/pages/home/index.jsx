import { getGames } from "@/services/games";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [gamesData, setGamesData] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGames();
      setGamesData(data);
    };

    fetchGames();
  }, []);

  if (!gamesData) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamesData.results.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {game.background_image && (
              <Image
                src={game.background_image}
                alt={game.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:opacity-75"
              />
            )}
            <div className="p-4 bg-gray-900 opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-xl font-bold text-white mb-2">{game.name}</h2>
              <p className="text-gray-400 text-sm">
                {game.released && new Date(game.released).getFullYear()}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.genres &&
                  game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md"
                    >
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {game.metacritic && `Metacritic: ${game.metacritic}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
