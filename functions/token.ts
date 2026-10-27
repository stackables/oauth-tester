import { jwtSign } from "@/lib/datagen";

function base64ToObject(value: string) {
  return JSON.parse(atob(value));
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  const form = await request.formData();
  const data = base64ToObject(form.get("code") as string);

  return Response.json({
    id_token: await jwtSign(data),
  });
};
