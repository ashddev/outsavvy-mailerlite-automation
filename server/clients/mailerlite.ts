import z from "zod";

const mailerlite = $fetch.create({
  baseURL: "https://connect.mailerlite.com/api",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.MAILERLITE_API_KEY!}`,
  },
  onRequestError: (error) => console.error(error),
});

type BatchRequest = {
  method: string;
  path: string;
  body: {
    email: string;
    fields: { name: string; last_name: string };
    groups: Array<string>;
  };
};
export const batchRequest = (requests: Array<BatchRequest>) =>
  mailerlite("/batch", {
    body: JSON.stringify({ requests }),
  });

export const createCampaign = (
  event: OutSavvyEvent,
  opts: { groupId: string; test: boolean; reminder: boolean }
) => {
  const eventName = stripEmojisAndWhitespace(event.name);
  return mailerlite<{ data: Record<"id" | (string & {}), string> }>(
    "/campaigns",
    {
      body: JSON.stringify({
        name: `${opts.test ? "TEST" : "SUBSCRIBERS"}
        :${eventName.replaceAll(" ", "")}
        ${opts.reminder ? ":REMINDER" : ""}
        :${event.id}`,
        type: "regular",
        emails: [
          {
            subject: `${opts.test ? "TEST-" : ""}${
              opts.reminder
                ? "Last Chance To Buy Tickets"
                : "The Sapphic Space UK"
            }: ${eventName}`,
            from_name: "The Sapphic Space UK",
            from: "general@thesapphicspace.co.uk",
            content: generateHtml(
              {
                event_title: eventName,
                event_description: stripLinks(event.description),
                date_display: formatEventDate(
                  event.dates[0].startlocal,
                  event.dates[0].endlocal
                ),
                location_display: `${event.location_name}, ${event.address_1}, ${event.address_town}`,
                hero_url: event.image_url,
                ticket_url: event.url,
              },
              opts.reminder
            ),
          },
        ],
        groups: [opts.groupId],
      }),
    }
  );
};

type Instant = { delivery: "instant" };
type Schedule = {
  delivery: "scheduled";
  schedule: {
    date: string;
    hours: string;
    minutes: string;
  };
};
type ScheduleOpts = Instant | Schedule;
export const scheduleCampaign = (campaignId: string, opts: ScheduleOpts) =>
  mailerlite(`/campaigns/${campaignId}/schedule`, {
    body: JSON.stringify(opts),
  });

const campaignSchema = z.object({
  data: z
    .object({
      id: z.string(),
      name: z.string(),
      finished_at: z.coerce.date(),
    })
    .array(),
});
export const getSentCampaigns = () =>
  mailerlite("/campaigns", {
    method: "GET",
    query: {
      filter: {
        status: "sent",
      },
      limit: 100,
    },
  })
    .then((response) => campaignSchema.parse(response))
    .then((response) => response.data);

const campaignClicksSchema = z
  .object({
    data: z
      .object({
        subscriber: z.object({ email: z.email() }),
      })
      .array(),
  })
  .transform((data) => data.data.map((click) => click.subscriber.email));
export const getEmailsOfSubscribersWhoClicked = (campaignId: string) =>
  mailerlite(`/campaigns/${campaignId}/reports/subscriber-activity`, {
    method: "GET",
    query: {
      "filter[type]": "clicked",
      include: "subscriber",
    },
  }).then((response) => campaignClicksSchema.parse(response));
