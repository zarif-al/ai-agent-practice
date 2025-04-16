"use server";

import { supabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function deleteDepartment(id: string) {
	const supabase = await supabaseServerClient();
	const { error } = await supabase.from("departments").delete().eq("id", id);

	if (error) {
		return error.details;
	}

	revalidatePath("/departments");

	return true;
}
