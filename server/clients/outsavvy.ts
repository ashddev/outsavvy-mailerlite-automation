import z from "zod";

const PAGE_SIZE = 1000;
const outsavvy = $fetch.create({
  baseURL: "https://api.outsavvy.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Partner ${process.env.OUTSAVVY_ACCESS_TOKEN ?? ""}`,
  },
  query: {
    page_size: PAGE_SIZE,
  },
  onRequestError: (error) => console.error(error),
});

const outSavvyDateSchema = z.object({
  id: z.number().int(),
  timezone: z.string(),
  startlocal: z.iso.datetime(),
  endlocal: z.iso.datetime(),
  event_date_description: z.string(),
});

const outSavvyEventSchema = z.object({
  id: z.number().int(),
  organiser_id: z.number().int(),
  name: z.string(),
  description: z.string(),
  url: z.url(),
  dates: outSavvyDateSchema.array(),
  image_url: z.url(),
  location_name: z.string(),
  address_1: z.string(),
  address_town: z.string(),
  price: z.string(),
});

const paginatedOutsavvyEventResponseSchema = z.object({
  paging: z.object({
    total_items: z.number().int().positive(),
    page_number: z.number().int().positive(),
    page_size: z.number().int().positive(),
    total_pages: z.number().int().positive(),
  }),
  events: outSavvyEventSchema.array(),
});

const outSavvyCustomerSchema = z.object({
  id: z.number().int(),
  organiser_id: z.number().int(),
  customer_first_name: z.string(),
  customer_last_name: z.string(),
  customer_email: z.email(),
  can_email: z.boolean(),
  date_created: z.iso.datetime(),
});

const paginatedOutsavvyCustomerResponseSchema = z.object({
  total_items: z.number().int().positive(),
  page_number: z.number().int().positive(),
  page_size: z.number().int().positive(),
  list: outSavvyCustomerSchema.array(),
  total_pages: z.number().int().positive(),
  has_previous_page: z.boolean(),
  has_next_page: z.boolean(),
  next_page_number: z.number().int().positive(),
  previous_page_number: z.number().int().positive(),
});

type OutSavvyCustomer = z.infer<typeof outSavvyCustomerSchema>;
export type OutSavvyEvent = z.infer<typeof outSavvyEventSchema>;

export const getAllCustomers = async (): Promise<OutSavvyCustomer[]> => {
  const outSavvyCustomerResponse = await outsavvy("/customers", {}).then(
    (response) => paginatedOutsavvyCustomerResponseSchema.parse(response)
  );
  return outSavvyCustomerResponse ? outSavvyCustomerResponse.list : [];
};

export const getLiveEvents = async (): Promise<OutSavvyEvent[]> => {
  const outsavvyEventsApiResponse = await outsavvy("/events/search").then(
    (response) => paginatedOutsavvyEventResponseSchema.parse(response)
  );
  return outsavvyEventsApiResponse ? outsavvyEventsApiResponse.events : [];
};

const priceSchema = z.object({
  currency: z.string().length(3),
  value: z.number(),
});
const orderSchema = z.object({
  list: z.array(z.object({ email: z.email(), price: priceSchema })),
});
export const getOrders = (eventId: string) =>
  outsavvy(`/events/${eventId}/orders`)
    .then((response) => orderSchema.parse(response))
    .then((response) => response.list);
