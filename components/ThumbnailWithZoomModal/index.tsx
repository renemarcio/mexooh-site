import { Image } from "@mantine/core";
import { modals } from "@mantine/modals";

interface Props {
  src?: string;
  fallbackDarkSrc?: string;
  fallbackLightSrc?: string;
  h?: string;
}

export default function ThumbnailWithZoomModal({
  src,
  fallbackDarkSrc,
  fallbackLightSrc,
  h = "300px",
}: Props) {
  function openZoomModal() {
    modals.open({
      size: "auto",
      zIndex: 99999,
      transitionProps: { transition: "scale" },
      children: (
        <>
          <Image
            src={src}
            fallbackSrc={fallbackDarkSrc}
            lightHidden
            m={"auto"}
            w={"auto"}
            h={"90vh"}
          />
          <Image
            src={src}
            fallbackSrc={fallbackLightSrc}
            darkHidden
            m={"auto"}
            w={"auto"}
            h={"90vh"}
          />
        </>
      ),
    });
  }
  return (
    <>
      <Image
        src={src}
        fallbackSrc={fallbackDarkSrc}
        lightHidden
        onClick={openZoomModal}
        h={h}
        style={{ cursor: "zoom-in" }}
      />
      <Image
        src={src}
        fallbackSrc={fallbackLightSrc}
        darkHidden
        onClick={openZoomModal}
        h={h}
        style={{ cursor: "zoom-in" }}
      />
    </>
  );
}
