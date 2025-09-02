import z from "zod";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

const batchRequestSchema = z.object({
  method: z.string(),
  path: z.string(),
  body: {
    email: z.email(),
    fields: {
      name: z.string(),
      last_name: z.string(),
    },
    groups: z.string().array(),
  },
});

export const batchRequest = (requests: z.infer<typeof batchRequestSchema>[]) =>
  fetch("https://connect.mailerlite.com/api/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MAILERLITE_API_KEY!}`,
    },
    body: JSON.stringify({ requests: requests }),
  }).catch((error) => console.error(error));

// export const createCampaign = (event, groupId) => {
//   fetch("https://connect.mailerlite.com/api/batch", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${MAILERLITE_API_KEY!}`,
//     },
//   });
// };
