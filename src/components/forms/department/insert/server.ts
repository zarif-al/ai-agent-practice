"use server";

import { supabaseServerClient } from "@/lib/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function insertDepartment(departmentName: string) {
	const supabase = await supabaseServerClient();
	const { error } = await supabase.from("departments").insert({
		name: departmentName,
	});

	if (!error) {
		revalidatePath("/departments");

		return true;
	} else {
		console.error("Error inserting department:", error);

		return error.details;
	}
}
