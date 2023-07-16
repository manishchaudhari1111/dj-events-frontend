import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";

import styles from "@/styles/Event.module.css";

export default function EventDetailPage({ event: evt }) {
  return (
    <Layout title="Event Details Page">
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <div className={styles.controls}></div>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events" className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const query = qs.stringify({
    populate: ["image"],
  });
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.data.map((evnt) => ({ params: { slug: evnt.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: `${slug}`,
      },
    },
    populate: ["image"],
  });
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const event = await res.json();
  console.log("event===", event);
  return {
    props: {
      event: event?.data[0],
    },
  };
}
