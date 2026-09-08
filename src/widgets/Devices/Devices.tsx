import DeviceCard from "@/shared/ui/DeviceCard"
import Grid from "@/shared/ui/Grid"
import Section from "@/widgets/Section"

import { deviceItems } from "./config/deviceItems"

const Devices = () => {
  return (
    <Section
      title="Смотри аниме на любом устройстве"
      id="devices"
      titleId="devices-title"
      description="SoulMe работает на любом устройстве - от смартфона до телевизора. Смотрите любимые фильмы и сериалы дома или в дороге, не привязываясь к одному экрану."
    >
      <Grid columns={4}>
        {deviceItems.map((deviceItem, index) => (
          <DeviceCard {...deviceItem} key={index} />
        ))}
      </Grid>
    </Section>
  )
}

export default Devices
