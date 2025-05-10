export async function POST() {
  // const body = await req.json();
  // const { success, data } = requestBodySchema.safeParse(body);
  // if (!success) {
  //   console.error('Invalid request body:', data);
  //   return new Response('Invalid request body', { status: 400 });
  // }
  // const { messages, id } = data;
  // try {
  //   return new Response(JSON.stringify(result), { status: 200 });
  // } catch (error) {
  //   console.error('Error:', error);
  //   return new Response('Internal server error', { status: 500 });
  // }

  return new Response('ok', { status: 200 });
}
