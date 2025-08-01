import { LocalPricingUnitType } from '~/components/plans/types'
import { transformFilterObjectToString } from '~/components/plans/utils'
import { ALL_FILTER_VALUES } from '~/core/constants/form'
import { serializePlanInput } from '~/core/serializers/serializePlanInput'
import {
  AggregationTypeEnum,
  ChargeModelEnum,
  CurrencyEnum,
  PlanInterval,
} from '~/generated/graphql'

const fullProperty = {
  amount: '1',
  fixedAmount: '2',
  freeUnits: 1,
  freeUnitsPerEvents: 0,
  freeUnitsPerTotalAggregation: '1',
  perTransactionMinAmount: '1',
  packageSize: 12,
  rate: '5',
  graduatedRanges: [
    {
      flatAmount: '1',
      fromValue: 0,
      perUnitAmount: '1',
    },
    {
      flatAmount: '1',
      fromValue: 1,
      perUnitAmount: '1',
    },
  ],
  volumeRanges: [
    {
      flatAmount: '1',
      fromValue: 0,
      perUnitAmount: '1',
    },
    {
      flatAmount: '1',
      fromValue: 1,
      perUnitAmount: '1',
    },
  ],
  graduatedPercentageRanges: [
    {
      fromValue: '0',
      toValue: '1',
      rate: '0',
      flatAmount: '0',
    },
    {
      fromValue: '2',
      toValue: null,
      rate: '10',
      flatAmount: '1',
    },
  ],
  customProperties: JSON.stringify({
    ranges: [
      { from: 0, to: 100, thirdPart: '0.13', firstPart: '0.12' },
      { from: 101, to: 2000, thirdPart: '0.10', firstPart: '0.09' },
      { from: 2001, to: 5000, thirdPart: '0.08', firstPart: '0.07' },
      { from: 5001, to: null, thirdPart: '0.06', firstPart: '0.05' },
    ],
  }),
}

describe('serializePlanInput()', () => {
  describe('a plan without charges', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with graduated charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Graduated,
            minAmountCents: 100.03,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: fullProperty,
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            minAmountCents: 10003,
            chargeModel: 'graduated',
            appliedPricingUnit: undefined,
            filters: [],
            properties: {
              amount: '1',
              fixedAmount: '2',
              freeUnits: undefined,
              freeUnitsPerEvents: 0,
              freeUnitsPerTotalAggregation: '1',
              graduatedRanges: [
                {
                  flatAmount: '1',
                  fromValue: 0,
                  perUnitAmount: '1',
                },
                {
                  flatAmount: '1',
                  fromValue: 1,
                  perUnitAmount: '1',
                },
              ],
              graduatedPercentageRanges: undefined,
              pricingGroupKeys: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with graduated percentage charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.GraduatedPercentage,
            minAmountCents: 100.03,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: fullProperty,
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            minAmountCents: 10003,
            chargeModel: 'graduated_percentage',
            appliedPricingUnit: undefined,
            filters: [],
            properties: {
              amount: '1',
              fixedAmount: '2',
              freeUnits: undefined,
              freeUnitsPerEvents: 0,
              freeUnitsPerTotalAggregation: '1',
              graduatedPercentageRanges: [
                {
                  fromValue: '0',
                  toValue: '1',
                  rate: '0',
                  flatAmount: '0',
                },
                {
                  fromValue: '2',
                  toValue: null,
                  rate: '10',
                  flatAmount: '1',
                },
              ],
              graduatedRanges: undefined,
              pricingGroupKeys: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with package charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Package,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: fullProperty,
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'package',
            appliedPricingUnit: undefined,
            filters: [],
            minAmountCents: undefined,
            properties: {
              amount: '1',
              fixedAmount: '2',
              freeUnits: 1,
              freeUnitsPerEvents: 0,
              freeUnitsPerTotalAggregation: '1',
              graduatedRanges: undefined,
              graduatedPercentageRanges: undefined,
              pricingGroupKeys: undefined,
              packageSize: 12,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with percentage charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Percentage,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: fullProperty,
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'percentage',
            appliedPricingUnit: undefined,
            minAmountCents: undefined,
            filters: [],
            properties: {
              amount: undefined,
              fixedAmount: '2',
              freeUnits: undefined,
              freeUnitsPerEvents: undefined,
              freeUnitsPerTotalAggregation: '1',
              graduatedRanges: undefined,
              pricingGroupKeys: undefined,
              graduatedPercentageRanges: undefined,
              packageSize: undefined,
              perTransactionMinAmount: '1',
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with standard charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Standard,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: fullProperty,
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'standard',
            appliedPricingUnit: undefined,
            minAmountCents: undefined,
            filters: [],
            properties: {
              amount: '1',
              fixedAmount: '2',
              freeUnits: undefined,
              freeUnitsPerEvents: 0,
              freeUnitsPerTotalAggregation: '1',
              graduatedRanges: undefined,
              pricingGroupKeys: undefined,
              graduatedPercentageRanges: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })

    it('formats correctly the pricingGroupKeys', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Standard,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: { pricingGroupKeys: ['one', 'two'] },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'standard',
            appliedPricingUnit: undefined,
            minAmountCents: undefined,
            filters: [],
            properties: {
              amount: undefined,
              freeUnits: undefined,
              graduatedRanges: undefined,
              pricingGroupKeys: ['one', 'two'],
              graduatedPercentageRanges: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })

    it('formates correctly the filters', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Standard,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
              filters: [
                {
                  id: '11234',
                  key: 'key1',
                  values: ['value1'],
                },
                {
                  id: '21234',
                  key: 'key2',
                  values: ['value2'],
                },
              ],
            },
            properties: {},
            filters: [
              {
                properties: {},
                values: [
                  transformFilterObjectToString('parent_key'),
                  transformFilterObjectToString('key1', 'value1'),
                ],
              },
              {
                properties: {},
                values: [
                  transformFilterObjectToString('parent_key'),
                  transformFilterObjectToString('key2', 'value2'),
                ],
              },
            ],
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'standard',
            minAmountCents: undefined,
            appliedPricingUnit: undefined,
            properties: {
              amount: undefined,
              freeUnits: undefined,
              graduatedRanges: undefined,
              pricingGroupKeys: undefined,
              graduatedPercentageRanges: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              volumeRanges: undefined,
              customProperties: undefined,
            },
            filters: [
              {
                invoiceDisplayName: null,
                properties: {
                  amount: undefined,
                  freeUnits: undefined,
                  graduatedPercentageRanges: undefined,
                  graduatedRanges: undefined,
                  pricingGroupKeys: undefined,
                  packageSize: undefined,
                  perTransactionMaxAmount: undefined,
                  perTransactionMinAmount: undefined,
                  volumeRanges: undefined,
                  customProperties: undefined,
                },
                values: {
                  key1: ['value1'],
                  parent_key: [ALL_FILTER_VALUES],
                },
              },
              {
                invoiceDisplayName: null,
                properties: {
                  amount: undefined,
                  freeUnits: undefined,
                  graduatedPercentageRanges: undefined,
                  graduatedRanges: undefined,
                  pricingGroupKeys: undefined,
                  packageSize: undefined,
                  perTransactionMaxAmount: undefined,
                  perTransactionMinAmount: undefined,
                  volumeRanges: undefined,
                  customProperties: undefined,
                },
                values: {
                  key2: ['value2'],
                  parent_key: [ALL_FILTER_VALUES],
                },
              },
            ],
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with volume charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Volume,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            properties: fullProperty,
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'volume',
            appliedPricingUnit: undefined,
            minAmountCents: undefined,
            filters: [],
            properties: {
              amount: '1',
              fixedAmount: '2',
              freeUnits: undefined,
              freeUnitsPerEvents: 0,
              freeUnitsPerTotalAggregation: '1',
              graduatedRanges: undefined,
              graduatedPercentageRanges: undefined,
              pricingGroupKeys: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: [
                {
                  flatAmount: '1',
                  fromValue: 0,
                  perUnitAmount: '1',
                },
                {
                  flatAmount: '1',
                  fromValue: 1,
                  perUnitAmount: '1',
                },
              ],
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with custom charge', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Custom,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CustomAgg,
            },
            properties: fullProperty,
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'custom',
            appliedPricingUnit: undefined,
            minAmountCents: undefined,
            filters: [],
            properties: {
              amount: '1',
              fixedAmount: '2',
              freeUnits: undefined,
              freeUnitsPerEvents: 0,
              freeUnitsPerTotalAggregation: '1',
              graduatedRanges: undefined,
              graduatedPercentageRanges: undefined,
              pricingGroupKeys: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              rate: '5',
              volumeRanges: undefined,
              customProperties:
                '{"ranges":[{"from":0,"to":100,"thirdPart":"0.13","firstPart":"0.12"},{"from":101,"to":2000,"thirdPart":"0.10","firstPart":"0.09"},{"from":2001,"to":5000,"thirdPart":"0.08","firstPart":"0.07"},{"from":5001,"to":null,"thirdPart":"0.06","firstPart":"0.05"}]}',
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })

  describe('a plan with usage thresholds', () => {
    it('returns plan correctly serialized', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [
          {
            amountCents: '1',
            thresholdDisplayName: 'Threshold 1',
            recurring: false,
          },
          {
            amountCents: '2',
            recurring: false,
          },
        ],
        recurringUsageThreshold: {
          amountCents: '2',
          recurring: true,
        },
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [
          {
            amountCents: 100,
            thresholdDisplayName: 'Threshold 1',
            recurring: false,
          },
          {
            amountCents: 200,
            recurring: false,
            thresholdDisplayName: null,
          },
          {
            amountCents: 200,
            recurring: true,
            thresholdDisplayName: null,
          },
        ],
      })
    })
  })

  describe('a plan with appliedPricingUnit', () => {
    it('returns plan correctly serialized when the appliedPricingUnit is not the default currency', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Standard,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            appliedPricingUnit: {
              code: 'CR',
              conversionRate: '1.2',
              type: LocalPricingUnitType.Custom,
              shortName: 'CR',
            },
            properties: {},
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'standard',
            minAmountCents: undefined,
            filters: [],
            properties: {
              amount: undefined,
              freeUnits: undefined,
              graduatedRanges: undefined,
              pricingGroupKeys: undefined,
              graduatedPercentageRanges: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
            appliedPricingUnit: {
              code: 'CR',
              conversionRate: 1.2,
            },
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })

    it('returns plan correctly serialized when the appliedPricingUnit is the default currency', () => {
      const plan = serializePlanInput({
        amountCents: '1',
        amountCurrency: CurrencyEnum.Eur,
        billChargesMonthly: true,
        charges: [
          {
            chargeModel: ChargeModelEnum.Standard,
            billableMetric: {
              id: '1234',
              name: 'simpleBM',
              code: 'simple-bm',
              recurring: false,
              aggregationType: AggregationTypeEnum.CountAgg,
            },
            appliedPricingUnit: {
              code: CurrencyEnum.Eur,
              shortName: CurrencyEnum.Eur,
              conversionRate: '1',
              type: LocalPricingUnitType.Fiat,
            },
            properties: {},
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: PlanInterval.Monthly,
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        nonRecurringUsageThresholds: [],
        recurringUsageThreshold: undefined,
      })

      expect(plan).toStrictEqual({
        amountCents: 100,
        amountCurrency: 'EUR',
        billChargesMonthly: true,
        charges: [
          {
            billableMetricId: '1234',
            chargeModel: 'standard',
            minAmountCents: undefined,
            appliedPricingUnit: undefined,
            filters: [],
            properties: {
              amount: undefined,
              freeUnits: undefined,
              graduatedRanges: undefined,
              pricingGroupKeys: undefined,
              graduatedPercentageRanges: undefined,
              packageSize: undefined,
              perTransactionMinAmount: undefined,
              perTransactionMaxAmount: undefined,
              volumeRanges: undefined,
              customProperties: undefined,
            },
            taxCodes: [],
          },
        ],
        code: 'my-plan',
        interval: 'monthly',
        minimumCommitment: {},
        name: 'My plan',
        payInAdvance: true,
        trialPeriod: 1,
        taxCodes: [],
        usageThresholds: [],
      })
    })
  })
})
