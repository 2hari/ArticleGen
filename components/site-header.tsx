"use client"

import { apiKeyAtom } from "@/atoms/form-atoms"
import { useAtom } from "jotai"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [apiKeyValue, setApiKeyValue] = useAtom(apiKeyAtom)
  function deleteKey() {
    localStorage.removeItem("openaiToken")
    setApiKeyValue("")
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            {apiKeyValue !== "" && (
              <Button
                onClick={deleteKey}
                className="border-red-500 hover:bg-red-100"
                variant={"outline"}
              >
                <Icons.trash className="text-red-300 mr-2" size={18} />
                Clear API key from browser storage
              </Button>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
