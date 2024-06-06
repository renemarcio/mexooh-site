import { Paper, Text } from "@mantine/core";
import React from "react";

type MapProps = {
  // /!2d-48.025129664536266!3d-23.599404949460894
  lat?: number;
  long?: number;
};

export default function Map({ lat, long }: MapProps) {
  const urlCoord = `${lat},${long}`;
  return (
    <>
      {lat && long ? (
        <iframe
          // src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d768.6082073670067${urlCoord}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-PT!2sbr!4v1716556163375!5m2!1spt-PT!2sbr&t=k`}
          src={`http://maps.google.com/maps?q=${urlCoord}&z=18&t=k&output=embed`}
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <Paper h={"100%"} withBorder>
          <Text
            ta={"center"}
            pos={"relative"}
            top={"50%"}
            c={"dimmed"}
            size="1.7rem"
          >
            Selecione ao lado.
          </Text>
        </Paper>
      )}
    </>
  );
}
