import { useState, useMemo } from "react";
import { SearchInput } from "@repo/ui/components/search-input";
import { SingleSelectFilter } from "@repo/ui/components/single-select-filter";
import { MultiSelectFilter } from "@repo/ui/components/multi-select-filter";
import {
  DataTable,
  type ColumnDef,
  type SortState,
} from "@repo/ui/components/data-table";
import { SimplePagination } from "@repo/ui/components/simple-pagination";
import { songs, genres, artists, type Song } from "./data/songs";

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortState, setSortState] = useState<SortState<Song>>({
    column: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Prepare filter options
  const genreOptions = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const artistOptions = artists.map((artist) => ({
    value: artist,
    label: artist,
  }));

  // Filter and sort logic
  const filteredAndSortedSongs = useMemo(() => {
    let result = [...songs];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.genre.toLowerCase().includes(query),
      );
    }

    // Apply artist filter
    if (selectedArtists.length > 0) {
      result = result.filter((song) => selectedArtists.includes(song.artist));
    }

    // Apply genre filter
    if (selectedGenre) {
      result = result.filter((song) => song.genre === selectedGenre);
    }

    // Apply sorting
    if (sortState.column && sortState.direction) {
      result.sort((a, b) => {
        const aValue = a[sortState.column as keyof Song];
        const bValue = b[sortState.column as keyof Song];

        if (aValue < bValue) {
          return sortState.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortState.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [searchQuery, selectedArtists, selectedGenre, sortState]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedSongs.length / ITEMS_PER_PAGE),
  );
  const paginatedSongs = filteredAndSortedSongs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedArtists, selectedGenre]);

  // Table columns
  const columns: ColumnDef<Song>[] = [
    {
      accessorKey: "title",
      header: "Title",
      sortable: true,
    },
    {
      accessorKey: "artist",
      header: "Artist",
      sortable: true,
    },
    {
      accessorKey: "genre",
      header: "Genre",
      sortable: false,
    },
  ];

  // Handle sorting
  const handleSort = (column: keyof Song) => {
    setSortState((prev) => {
      if (prev.column === column) {
        // Toggle direction: asc -> desc -> null -> asc
        if (prev.direction === "asc") {
          return { column, direction: "desc" };
        } else if (prev.direction === "desc") {
          return { column: null, direction: null };
        }
      }
      return { column, direction: "asc" };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-semibold">Songs</h1>

        {/* Filter Bar */}
        <div className="mb-4 flex items-center gap-3">
          <SearchInput
            placeholder="Search by title, artist or genre"
            value={searchQuery}
            onSearch={setSearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72"
          />
          <MultiSelectFilter
            label="Artist"
            options={artistOptions}
            value={selectedArtists}
            onValueChange={setSelectedArtists}
            searchPlaceholder="Search Artists"
          />
          <SingleSelectFilter
            label="Genre"
            options={genreOptions}
            value={selectedGenre}
            onValueChange={setSelectedGenre}
          />
        </div>

        {/* Data Table */}
        <div className="bg-card rounded-lg border shadow-sm">
          <DataTable
            data={paginatedSongs}
            columns={columns}
            sortState={sortState}
            onSort={handleSort}
          />

          {/* Pagination */}
          {filteredAndSortedSongs.length > 0 && (
            <div className="border-t p-4">
              <SimplePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
