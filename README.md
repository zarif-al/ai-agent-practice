# AI HR APPLICATION

## Updating Types

1. Install `supabase` cli
2. Run the following command `supabase gen types typescript --project-id your_project_id > src/lib/supabase/types.ts`. Make sure to replace `your_project_id`.
3. Or you can generate it from the [dashboard](https://supabase.com/dashboard/project/_/api?page=tables-intro) and paste it in `src/lib/supabase/types.ts`

## Generate Table JSON

```sql
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
```