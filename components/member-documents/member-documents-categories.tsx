"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DocumentCategory {
  id: string
  name: string
  icon: string
  count: number
  description: string
}

interface MemberDocumentsCategoriesProps {
  categories: DocumentCategory[]
}

export function MemberDocumentsCategories({ categories }: MemberDocumentsCategoriesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {categories.map((category) => (
        <Card 
          key={category.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{category.icon}</span>
              <Badge variant="secondary">{category.count}</Badge>
            </div>
            <CardTitle className="text-sm font-medium mt-2">
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs">
              {category.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}