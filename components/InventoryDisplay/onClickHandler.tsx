import { Inventory } from "@/types/websiteTypes";
import { modals } from "@mantine/modals";
import MUPIForm from "../_Forms/MUPIForm";
import PanelRentForm from "../_Forms/PanelRentForm";
import RentBillboardModal from "../_Forms/RentBillboardModal";
import LEDPanelForm from "../_Forms/LEDPanelForm";

export default async function onClickHandler(
  inventory: Inventory,
  typeOfInventory: string
) {
  const response = await fetch(`/api/${typeOfInventory}?id=${inventory.id}`);
  const data = await response.json();
  const fullInventory = data.data[0];
  switch (typeOfInventory) {
    case "panels":
      modals.open({
        centered: true,
        size: "lg",
        withCloseButton: false,
        yOffset: "10vh",
        children: (
          <PanelRentForm
            key={fullInventory.id}
            thumbnailUrl={
              fullInventory.thumbnailUrl ? fullInventory.thumbnailUrl : ""
            }
            panel={fullInventory}
            closeFn={() => modals.closeAll()}
          />
        ),
      });
      break;
    case "mupi":
      modals.open({
        centered: true,
        size: "lg",
        withCloseButton: false,
        yOffset: "10vh",
        children: (
          <MUPIForm
            key={fullInventory.id}
            mupi={fullInventory}
            closeFn={() => modals.closeAll()}
          />
        ),
      });
      break;
    case "billboards":
      modals.open({
        centered: true,
        size: "lg",
        withCloseButton: false,
        yOffset: "10vh",
        children: (
          <RentBillboardModal
            key={fullInventory.id}
            billboard={fullInventory}
            closeFn={() => modals.closeAll()}
          />
        ),
      });
      break;
    case "LEDpanels":
      modals.open({
        centered: true,
        size: "lg",
        withCloseButton: false,
        yOffset: "10vh",
        children: (
          <LEDPanelForm
            key={fullInventory.id}
            panel={fullInventory}
            closeFn={() => modals.closeAll()}
          />
        ),
      });
      break;
    default:
      break;
  }
}
