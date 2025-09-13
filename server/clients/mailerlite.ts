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
  groupId: string,
  test: boolean
) => {
  const eventName = stripEmojisAndWhitespace(event.name);
  return mailerlite<{ data: Record<"id" | (string & {}), string> }>(
    "/campaigns",
    {
      body: JSON.stringify({
        name: `${test ? "TEST" : "SUBSCRIBERS"}:${eventName}`,
        type: "regular",
        emails: [
          {
            subject: `The Sapphic Space UK: ${eventName}`,
            from_name: "The Sapphic Space UK",
            from: "general@thesapphicspace.co.uk",
            content: generateHtml({
              event_title: eventName,
              event_description: stripLinks(event.description),
              date_display: formatEventDate(
                event.dates[0].startlocal,
                event.dates[0].endlocal
              ),
              location_display: `${event.location_name}, ${event.address_1}, ${event.address_town}`,
              hero_url: event.image_url,
              ticket_url: event.url,
            }),
          },
        ],
        groups: [groupId],
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
