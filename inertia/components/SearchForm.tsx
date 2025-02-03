import { Search } from 'lucide-react'
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '#shadcn/sidebar'
import { Label } from '#shadcn/label'

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Recherche
          </Label>
          <SidebarInput id="search" placeholder="Rechercher..." className="pl-8" />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
