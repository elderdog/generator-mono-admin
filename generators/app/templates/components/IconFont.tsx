import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import type { IconBaseProps } from '@ant-design/icons/lib/components/Icon'

interface IconFontProps extends IconBaseProps {
  type: string;
}

const IconFont: React.FC<IconFontProps> = createFromIconfontCN()

export default IconFont
