type PromoEmail = {
  daysBeforeEvent: number;
  reminder: boolean;
};

export const sendPromoEmails = async () => {
  const events = await fetchLiveEvents();
  const today = new Date();

  const promos: Array<PromoEmail> = [
    { daysBeforeEvent: 7, reminder: false },
    { daysBeforeEvent: 2, reminder: true },
  ];

  await Promise.all([
    promos.map((promo) =>
      createEmailPromo(events, {
        today,
        daysBeforeEvent: promo.daysBeforeEvent,
        reminder: promo.reminder,
      })
    ),
  ]);
};

const createEmailPromo = async (
  events: Array<OutSavvyEvent>,
  opts: { today: Date; daysBeforeEvent: number; reminder: boolean }
) => {
  await sendEmails(events, {
    test: true,
    today: opts.today,
    daysBeforeEvent: opts.daysBeforeEvent,
    reminder: opts.reminder,
  });
  await sendEmails(events, {
    test: false,
    today: opts.today,
    daysBeforeEvent: opts.daysBeforeEvent,
    reminder: opts.reminder,
  });
};

const sendEmails = async (
  events: Array<OutSavvyEvent>,
  opts: {
    today: Date;
    daysBeforeEvent: number;
    test: boolean;
    reminder: boolean;
  }
) => {
  const groupId = opts.test
    ? process.env.MAILERLITE_TEST_GROUP_ID ?? ""
    : process.env.MAILERLITE_GROUP_ID ?? "";

  const eventsToSend = upcomingEventIfExists(events, {
    today: opts.today,
    daysBeforeEvent: opts.daysBeforeEvent,
  });
  if (eventsToSend.length === 0) return;

  const createdCampaigns = await Promise.all(
    eventsToSend.map((event) =>
      createCampaign(event, {
        groupId,
        test: opts.test,
        reminder: opts.reminder,
      })
    )
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
