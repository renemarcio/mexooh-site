export type SlideData = {
  src: string;
  alt: string;
  txtRgb?: string;
  button: {
    txtRgb?: string;
    text: string;
    link: string;
    onClick?: () => void;
  };
};
