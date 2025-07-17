import { MembersAddButton } from "./members-add-button"

export function MembersPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestione Membri</h1>
        <p className="text-muted-foreground">
          Gestisci i membri della comunità energetica
        </p>
      </div>
      <MembersAddButton />
    </div>
  )
}