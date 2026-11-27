import Button from "@/shared/ui/Button"

import "./PanelButton.scss"

interface PanelButtonProps {
  label: string
  direction?: "forward" | "back"
  onClick: () => void
}

const PanelButton = ({
  label,
  direction = "forward",
  onClick,
}: PanelButtonProps) => {
  const iconName = direction === "forward" ? "chevron-right" : "chevron-left"
  const iconPosition = direction === "forward" ? "after" : "before"

  return (
    <Button
      className="panel-button"
      label={label}
      iconName={iconName}
      iconPosition={iconPosition}
      variant="transparent"
      onClick={onClick}
    />
  )
}

export default PanelButton
