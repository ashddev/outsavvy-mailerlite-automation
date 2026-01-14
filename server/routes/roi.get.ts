import { eventHandler } from "h3";

export default eventHandler(async (event) => {
  const { monthDate } = getQuery(event);
  const [month, year] = parseDateOrThrow(monthDate?.toString());
  const campaigns = await getSentCampaigns();
  const incomeProducingCampaigns = campaigns.filter(
    ({ name, finished_at }) =>
      !name.includes("TEST") &&
      finished_at.getFullYear() === year &&
      finished_at.getMonth() === month - 1
  );
  let totalOrders = 0;
  let totalMailingListOrders = 0;
  let totalRevenue = 0;
  let totalMailingListRevenue = 0;
  for (const campaign of incomeProducingCampaigns) {
    const emails = await getEmailsOfSubscribersWhoClicked(campaign.id);
    const campaignId = campaign.name.split(":").slice(-1)[0];
    if (!/^\d+$/.test(campaignId)) continue;

    const orders = await getOrders(campaignId);
    const mailingListOrders = orders.filter((order) =>
      emails.includes(order.email)
    );

    const revenue = orders.reduce((acc, cur) => acc + cur.price.value, 0);
    const mailingListRevenue = mailingListOrders.reduce(
      (acc, cur) => acc + cur.price.value,
      0
    );

    totalOrders += orders.length;
    totalMailingListOrders += mailingListOrders.length;
    totalRevenue += revenue;
    totalMailingListRevenue += mailingListRevenue;
  }
  return {
    totalOrders,
    totalMailingListOrders,
    totalRevenue: totalRevenue.toFixed(2),
    totalMailingListRevenue: totalMailingListRevenue.toFixed(2),
    mailingListContribution: `${Math.round(
      (totalMailingListRevenue / totalRevenue) * 100
    )}%`,
  };
});

function parseDateOrThrow(monthDate?: string) {
  if (!monthDate || !/\d{2}\/\d{4}/.test(monthDate)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Reqest",
      message: "Invalid month, please use MM/YYYY",
      data: { field: monthDate },
    });
  }
  return monthDate.split("/").map((num) => parseInt(num));
}
