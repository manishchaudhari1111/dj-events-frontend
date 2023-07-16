import Link from "next/link";
import qs from "qs";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config";

import styles from "@/styles/Home.module.css";

export default function HomePage({ events }) {
  return (
    <Layout>
      {events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        <>
          {events?.map((evt) => (
            <EventItem key={evt.id} evt={evt} />
          ))}

          {events.length > 0 && (
            <Link href="/events" className="btn-secondary">
              View All Events
            </Link>
          )}
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: ["image"],
    pagination: {
      pageSize: 2,
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
