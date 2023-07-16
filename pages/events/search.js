import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config";
import qs from "qs";
import { useRouter } from "next/router";

export default function EventsListingPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results Page">
      <h1>Search results for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      name: {
        $contains: term,
      },
    },
    populate: ["image"],
    pagination: {
      pageSize: 10,
      page: 1,
    },
  });
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();
  console.log("searchTerm", events);
  return {
    props: {
      events: events?.data || [],
    },
  };
}
