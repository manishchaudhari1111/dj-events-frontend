import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config";

export default function EventsListingPage({ events }) {
  return (
    <Layout title="Events List Page">
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: ["image"],
    pagination: {
      pageSize: 10,
      page: 1,
    },
  });
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();
  return {
    props: {
      events: events?.data || [],
    },
  };
}
