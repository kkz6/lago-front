import { ComboBox } from '~/components/form'
import { useInternationalization } from '~/hooks/core/useInternationalization'

import { FiltersFormValues } from '../types'

type FiltersItemOverriddenProps = {
  value: FiltersFormValues['filters'][0]['value']
  setFilterValue: (value: string) => void
}

export const FiltersItemOverridden = ({ value, setFilterValue }: FiltersItemOverriddenProps) => {
  const { translate } = useInternationalization()

  return (
    <ComboBox
      disableClearable
      placeholder={translate('text_66ab42d4ece7e6b7078993b1')}
      data={[
        {
          value: 'true',
          label: translate('text_65251f46339c650084ce0d57'),
        },
        {
          value: 'false',
          label: translate('text_65251f4cd55aeb004e5aa5ef'),
        },
      ]}
      onChange={(partiallyPaid) => setFilterValue(partiallyPaid)}
      value={value}
    />
  )
}
