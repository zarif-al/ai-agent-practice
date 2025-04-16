import { createBrowserClient } from "@supabase/ssr";

export async function supabaseBrowserClient() {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		throw new Error(
			"Supabase URL and Anon Key must be provided in the environment variables."
		);
	}

	return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
