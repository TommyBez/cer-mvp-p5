import { DocumentsUploadButton } from "./documents-upload-button"

export function DocumentsPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestione Documenti</h1>
        <p className="text-muted-foreground">
          Gestisci i documenti della comunità energetica
        </p>
      </div>
      <DocumentsUploadButton />
    </div>
  )
}