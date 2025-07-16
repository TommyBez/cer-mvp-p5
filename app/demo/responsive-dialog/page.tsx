"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/responsive-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ResponsiveDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Responsive Dialog Demo</h1>
          <p className="text-muted-foreground mt-2">
            On desktop, this shows as a centered dialog. On mobile, it automatically
            transforms into a bottom sheet.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Open Dialog/Bottom Sheet</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setOpen(false)}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-2">Try it out!</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• On desktop (width ≥ 768px): Shows as a centered modal dialog</li>
              <li>• On mobile (width &lt; 768px): Shows as a bottom sheet sliding up from the bottom</li>
              <li>• Resize your browser window to see the responsive behavior</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}