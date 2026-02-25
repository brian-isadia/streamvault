import { createFileRoute } from '@tanstack/react-router'
import { Film, Tv, Activity } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-h2 font-bold">Admin Dashboard</h2>
        <p className="text-foreground-secondary mt-2">Welcome back! Here's what's happening on StreamVault.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Film} 
          label="Total Movies" 
          value="1,248" 
          description="+12 this month" 
        />
        <StatCard 
          icon={Tv} 
          label="Total TV Shows" 
          value="456" 
          description="+5 this month" 
        />
        <StatCard 
          icon={Activity} 
          label="Recent Activity" 
          value="89" 
          description="Content updates" 
        />
      </div>

      <section className="bg-background-elevated border border-border rounded-lg p-6">
        <h3 className="text-h4 font-semibold mb-4">Quick Links</h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary btn-sm">Add New Movie</button>
          <button className="btn btn-secondary btn-sm">Add New TV Show</button>
          <button className="btn btn-ghost btn-sm">View Site Analytics</button>
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, description }: { icon: any, label: string, value: string, description: string }) {
  return (
    <div className="bg-background-elevated border border-border rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-surface rounded-full">
          <Icon className="w-6 h-6 text-brand" />
        </div>
        <div>
          <p className="text-caption text-foreground-secondary uppercase tracking-widest">{label}</p>
          <h4 className="text-h3 font-bold">{value}</h4>
        </div>
      </div>
      <p className="text-body-sm text-foreground-muted mt-4">{description}</p>
    </div>
  )
}
