import { createFileRoute } from '@tanstack/react-router'
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react'

export const Route = createFileRoute('/admin/movies')({
  component: AdminMovies,
})

function AdminMovies() {
  const movies = [
    { id: 1, title: 'Inception', year: 2010, genres: 'Sci-Fi, Thriller' },
    { id: 2, title: 'The Matrix', year: 1999, genres: 'Sci-Fi, Action' },
    { id: 3, title: 'Interstellar', year: 2014, genres: 'Sci-Fi, Drama' },
    { id: 4, title: 'The Dark Knight', year: 2008, genres: 'Action, Crime' },
  ]

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-h2 font-bold">Manage Movies</h2>
          <p className="text-foreground-secondary mt-2">Create, edit, and delete movie content.</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Movie
        </button>
      </header>

      <section className="bg-background-elevated border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <input 
              type="text" 
              placeholder="Search movies..." 
              className="input pl-10 h-10 w-full" 
            />
          </div>
          <button className="btn btn-secondary btn-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary">Title</th>
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary">Year</th>
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary">Genres</th>
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-b border-border last:border-0 hover:bg-surface-subtle transition-colors">
                  <td className="p-4 font-medium">{movie.title}</td>
                  <td className="p-4 text-foreground-secondary">{movie.year}</td>
                  <td className="p-4 text-foreground-secondary">{movie.genres}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-surface rounded-md text-foreground-secondary hover:text-foreground transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-error/10 rounded-md text-foreground-secondary hover:text-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
