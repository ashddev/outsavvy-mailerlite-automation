export default defineEventHandler((event) => {
  if (process.env.NODE_ENV === "production") {
    const auth = getRequestHeader(event, "authorization");
    if (
      !process.env.CRON_SECRET ||
      auth !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      throw createError({
        status: 401,
        statusMessage: "Unauthorized",
      });
    }
  }
});
