import { createClient } from "@/lib/supabase/server"
import { cache } from "react"

export const getUser = cache(async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
})