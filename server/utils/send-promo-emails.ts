export const sendPromoEmails = async () => {
  const events = await fetchLiveEvents();
  const today = new Date();

  sendEmails(events, { test: true, today });
  sendEmails(events, { test: false, today });
};

const sendEmails = async (
  events: Array<OutSavvyEvent>,
  opts: { test: boolean; today: Date }
) => {
  const DAYS_BEFORE_EVENT = 7;
  const groupId = opts.test
    ? process.env.MAILERLITE_TEST_GROUP_ID ?? ""
    : process.env.MAILERLITE_GROUP_ID ?? "";

  const eventsToSend = upcomingEventIfExists(events, {
    today: opts.today,
    daysBeforeEvent: DAYS_BEFORE_EVENT,
  });
  if (eventsToSend.length === 0) return;

  const createdCampaigns = await Promise.all(
    eventsToSend.map((ev) => createCampaign(ev, groupId, opts.test))
  );

  const campaignIds = createdCampaigns.map((d) => d.data.id);

  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  const [hours, minutes] = ["18", "00"];

  const scheduleOpts = opts.test
    ? ({ delivery: "instant" } as const)
    : ({
        delivery: "scheduled",
        schedule: {
          date: tomorrow.toISOString().slice(0, 10),
          hours,
          minutes,
        },
      } as const);

  await Promise.all(
    campaignIds.map((id) => scheduleCampaign(id, scheduleOpts))
  );
};

const upcomingEventIfExists = (
  events: Array<OutSavvyEvent>,
  opts: { today: Date; daysBeforeEvent: number }
) => {
  const target = new Date(
    Date.UTC(
      opts.today.getUTCFullYear(),
      opts.today.getUTCMonth(),
      opts.today.getUTCDate() + opts.daysBeforeEvent
    )
  );
  const targetYmd = target.toISOString().slice(0, 10);

  return events.filter((e) => {
    const start = new Date(e.dates[0].startlocal);
    return start.toISOString().slice(0, 10) === targetYmd;
  });
};
