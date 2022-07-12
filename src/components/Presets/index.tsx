import React from 'react'
import { Button, Dropdown } from '@douyinfe/semi-ui'
import { PRESETS } from './presets'

export const Presets: React.FC<{ onSelect?: (value: string) => void }> = ({ onSelect }) => {
  return (
    <>
      <Dropdown
        position="bottomRight"
        render={
          <Dropdown.Menu>
            {PRESETS.map((preset, i) => <PresetItem key={i} label={preset.label} value={preset.value} onSelect={onSelect} /> )}
          </Dropdown.Menu>
        }
      >
        <Button theme="borderless">填充预设</Button>
      </Dropdown>
    </>
  )
}

const PresetItem: React.FC<{ label: React.ReactNode; value: string; onSelect?: (value: string) => void }> = ({
  label,
  value,
  onSelect,
}) => {
  const handleSelect = React.useCallback(() => {
    onSelect?.(value)
  }, [value, onSelect])
  return (
    <>
      <Dropdown.Item onClick={handleSelect}>{label}</Dropdown.Item>
    </>
  )
}
