import { AspectRatio } from "@mantine/core";
import React from "react";

type MapProps = {
  // /!2d-48.025129664536266!3d-23.599404949460894
  lat?: number;
  long?: number;
};

export default function Map({ lat, long }: MapProps) {
  const urlCoord =
    lat && long
      ? `!2d${long}!3d${lat}`
      : "!2d-48.025129664536266!3d-23.599404949460894";
  return (
    // <AspectRatio ratio={6 / 5}>
    <iframe
      src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d768.6082073670067${urlCoord}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-PT!2sbr!4v1716556163375!5m2!1spt-PT!2sbr`}
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    // </AspectRatio>
  );
}
