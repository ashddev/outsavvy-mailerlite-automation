import { eventHandler } from "h3";

export default eventHandler(async () => {
  await syncSubscribers();
  await sendPromoEmails();
});
