import {
  getGames,
  getGenres,
  getPlataforms,
  getPlatforms,
} from "@/services/games";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
  const [gamesData, setGamesData] = useState(null);
  const [genresData, setGenresData] = useState(null);
  const [platformsData, setPlatformsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  const fetchGames = async (queryParams = {}) => {
    setIsLoading(true);
    try {
      const data = await getGames({
        ...(selectedGenres.length > 0 && { genres: selectedGenres.join(",") }),
        ...(selectedPlatforms.length > 0 && {
          platforms: selectedPlatforms.join(","),
        }),
        ...(searchQuery && { search: searchQuery }),
      });
      setGamesData(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenresData(data);
    } catch (error) {
      console.error("Error fetching genres", error);
      throw error;
    }
  };

  const fetchPlatforms = async () => {
    try {
      const data = await getPlataforms();
      setPlatformsData(data);
    } catch (error) {
      console.error("Error fetching platforms", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  useEffect(() => {
    fetchGames();
  }, [selectedGenres, selectedPlatforms, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreSelection = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handlePlatformSelection = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((id) => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGames();
  };

  if (!gamesData) {
    return (
      <div className="container mx-auto p-4">
        {isLoading && <p>Loading...</p>}
        {!isLoading && <p>No games found.</p>}
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center mt-16 pl-32 pr-32 mb-16">
      <h1 className="text-3xl font-bold text-center mb-8">Games</h1>

      <div className="flex flex-col fler gap-4 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search games..."
              className="w-[80%] text-white bg-blue-950 px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
              ref={searchInputRef}
            />
            <button
              type="submit"
              className="px-2 py-2 bg-white text-blue-950 rounded-lg ml-2  hover:border-blue-500"
            >
              <IoIosSearch />
            </button>
          </div>
        </form>

        <div className="flex gap-2 mt-10">
          <div className="border border-white rounded-lg p-4">
            <label
              htmlFor="genres"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {genresData &&
                genresData.results.map((genre) => (
                  <button
                    key={genre.id}
                    className={`px-3 py-2 rounded-full bg-blue-950 text-white hover:border-blue-500 ${
                      selectedGenres.includes(genre.id) ? "border-white" : ""
                    }`}
                    onClick={() => handleGenreSelection(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="border border-white rounded-lg p-4">
            <label
              htmlFor="platforms"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platformsData &&
                platformsData.results.map((platform) => (
                  <button
                    key={platform.id}
                    className={`px-3 py-2 rounded-full bg-blue-950 text-white hover:border-blue-500 ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-white"
                        : ""
                    }`}
                    onClick={() => handlePlatformSelection(platform.id)}
                  >
                    {platform.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gamesData.results.map((game) => (
          <div
            key={game.id}
            className="group relative flex flex-col h-full rounded-lg shadow-md transform transition duration-300 hover:scale-105"
          >
            {game.background_image && (
              <Image
                src={game.background_image}
                alt={game.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="flex flex-col justify-between p-4 bg-gray-900 flex-grow transition duration-300">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {game.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  {game.released && new Date(game.released).getFullYear()}
                </p>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
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
                {game.parent_platforms && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {game.parent_platforms.map((platform) => (
                      <span
                        key={platform.platform.id}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md"
                      >
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
