import { createFileRoute } from '@tanstack/react-router'
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react'

export const Route = createFileRoute('/admin/tv')({
  component: AdminTv,
})

function AdminTv() {
  const shows = [
    { id: 1, title: 'Stranger Things', seasons: 4, episodes: 34 },
    { id: 2, title: 'The Witcher', seasons: 3, episodes: 24 },
    { id: 3, title: 'The Crown', seasons: 6, episodes: 60 },
    { id: 4, title: 'Black Mirror', seasons: 6, episodes: 27 },
  ]

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-h2 font-bold">Manage TV Shows</h2>
          <p className="text-foreground-secondary mt-2">Create, edit, and delete TV show content.</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add TV Show
        </button>
      </header>

      <section className="bg-background-elevated border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <input 
              type="text" 
              placeholder="Search TV shows..." 
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
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary">Seasons</th>
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary">Episodes</th>
                <th className="p-4 text-body-sm font-semibold text-foreground-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show.id} className="border-b border-border last:border-0 hover:bg-surface-subtle transition-colors">
                  <td className="p-4 font-medium">{show.title}</td>
                  <td className="p-4 text-foreground-secondary">{show.seasons}</td>
                  <td className="p-4 text-foreground-secondary">{show.episodes}</td>
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
