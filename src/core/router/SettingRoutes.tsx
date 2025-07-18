import AnrokIntegrationDetails from '~/pages/settings/AnrokIntegrationDetails'
import AnrokIntegrations from '~/pages/settings/AnrokIntegrations'
import AvalaraIntegrationDetails from '~/pages/settings/AvalaraIntegrationDetails'
import AvalaraIntegrations from '~/pages/settings/AvalaraIntegrations'
import BillingEntity from '~/pages/settings/BillingEntity/BillingEntity'
import BillingEntityCreateEdit from '~/pages/settings/BillingEntity/sections/BillingEntityCreateEdit'
import BillingEntityEmailScenarios from '~/pages/settings/BillingEntity/sections/BillingEntityEmailScenarios'
import BillingEntityEmailScenariosConfig from '~/pages/settings/BillingEntity/sections/BillingEntityEmailScenariosConfig'
import BillingEntityInvoiceSettings from '~/pages/settings/BillingEntity/sections/BillingEntityInvoiceSettings'
import BillingEntityDunningCampaigns from '~/pages/settings/BillingEntity/sections/dunning-campaigns/BillingEntityDunningCampaigns'
import BillingEntityGeneral from '~/pages/settings/BillingEntity/sections/general/BillingEntityGeneral'
import BillingEntityInvoiceCustomSections from '~/pages/settings/BillingEntity/sections/invoice-custom-sections/BillingEntityInvoiceCustomSections'
import BillingEntityTaxesSettings from '~/pages/settings/BillingEntity/sections/taxes/BillingEntityTaxesSettings'
import InvoiceSections from '~/pages/settings/Invoices/InvoiceSections'
import SettingsHomePage from '~/pages/settings/SettingsHomePage'

import { CustomRouteObject } from './types'
import { lazyLoad } from './utils'

// ----------- Layouts -----------
const Settings = lazyLoad(() => import('~/layouts/SettingsNavLayout'))

// ----------- Pages -----------
const CreateInvoiceCustomSection = lazyLoad(
  () => import('~/pages/settings/Invoices/CreateCustomSection'),
)

const TaxesSettings = lazyLoad(() => import('~/pages/settings/TaxesSettings'))
const Members = lazyLoad(() => import('~/pages/settings/Members'))
const Integrations = lazyLoad(() => import('~/pages/settings/Integrations'))
const Authentication = lazyLoad(() => import('~/pages/settings/Authentication/Authentication'))
const OktaAuthenticationDetails = lazyLoad(
  () => import('~/pages/settings/Authentication/OktaAuthenticationDetails'),
)
const AdyenIntegrations = lazyLoad(() => import('~/pages/settings/AdyenIntegrations'))
const NetsuiteIntegrations = lazyLoad(() => import('~/pages/settings/NetsuiteIntegrations'))
const AdyenIntegrationDetails = lazyLoad(() => import('~/pages/settings/AdyenIntegrationDetails'))
const HubspotIntegrations = lazyLoad(() => import('~/pages/settings/HubspotIntegrations'))
const HubspotIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/HubspotIntegrationDetails'),
)
const NetsuiteIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/NetsuiteIntegrationDetails'),
)
const SalesforceIntegrations = lazyLoad(() => import('~/pages/settings/SalesforceIntegrations'))
const SalesforceIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/SalesforceIntegrationDetails'),
)
const StripeIntegrations = lazyLoad(() => import('~/pages/settings/StripeIntegrations'))
const StripeIntegrationDetails = lazyLoad(() => import('~/pages/settings/StripeIntegrationDetails'))
const CashfreeIntegrations = lazyLoad(() => import('~/pages/settings/CashfreeIntegrations'))
const CashfreeIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/CashfreeIntegrationDetails'),
)
const MoneyhashIntegrations = lazyLoad(() => import('~/pages/settings/MoneyhashIntegrations'))
const MoneyhashIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/MoneyhashIntegrationDetails'),
)
const FlutterwaveIntegrations = lazyLoad(() => import('~/pages/settings/FlutterwaveIntegrations'))
const FlutterwaveIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/FlutterwaveIntegrationDetails'),
)
const GocardlessIntegrationOauthCallback = lazyLoad(
  () => import('~/pages/settings/GocardlessIntegrationOauthCallback'),
)
const GocardlessIntegrations = lazyLoad(() => import('~/pages/settings/GocardlessIntegrations'))
const GocardlessIntegrationDetails = lazyLoad(
  () => import('~/pages/settings/GocardlessIntegrationDetails'),
)
const TaxManagementIntegration = lazyLoad(
  () => import('~/pages/settings/LagoTaxManagementIntegration'),
)
const XeroIntegrations = lazyLoad(() => import('~/pages/settings/XeroIntegrations'))
const XeroIntegrationDetails = lazyLoad(() => import('~/pages/settings/XeroIntegrationDetails'))
const DunningsSettings = lazyLoad(() => import('~/pages/settings/Dunnings/Dunnings'))
const CreateDunning = lazyLoad(() => import('~/pages/settings/Dunnings/CreateDunning'))
const CreatePricingUnit = lazyLoad(() => import('~/pages/settings/Invoices/CreatePricingUnit'))

// ----------- Routes -----------
export const SETTINGS_ROUTE = '/settings'
export const INVOICE_SETTINGS_ROUTE = `${SETTINGS_ROUTE}/invoice-sections`
export const TAXES_SETTINGS_ROUTE = `${SETTINGS_ROUTE}/taxes`
export const ORGANIZATION_INFORMATIONS_ROUTE = `${SETTINGS_ROUTE}/organization-informations`
export const ROOT_INTEGRATIONS_ROUTE = `${SETTINGS_ROUTE}/integrations`
export const INTEGRATIONS_ROUTE = `${ROOT_INTEGRATIONS_ROUTE}/:integrationGroup`
export const FULL_INTEGRATIONS_ROUTE = `${ROOT_INTEGRATIONS_ROUTE}/:integrationGroup/:tab`
export const FULL_INTEGRATIONS_ROUTE_ID = `${ROOT_INTEGRATIONS_ROUTE}/:integrationGroup/:tab/:id`
export const AUTHENTICATION_ROUTE = `${SETTINGS_ROUTE}/authentication`
export const OKTA_AUTHENTICATION_ROUTE = `${AUTHENTICATION_ROUTE}/okta/:integrationId`
export const ANROK_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/anrok`
export const ANROK_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/anrok/:integrationId/:tab`
export const AVALARA_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/avalara`
export const AVALARA_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/avalara/:integrationId/:tab`
export const ADYEN_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/adyen`
export const ADYEN_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/adyen/:integrationId`
export const HUBSPOT_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/hubspot`
export const HUBSPOT_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/hubspot/:integrationId`
export const NETSUITE_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/netsuite`
export const NETSUITE_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/netsuite/:integrationId/:tab`
export const SALESFORCE_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/salesforce`
export const SALESFORCE_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/salesforce/:integrationId`
export const STRIPE_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/stripe`
export const STRIPE_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/stripe/:integrationId`
export const CASHFREE_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/cashfree`
export const CASHFREE_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/cashfree/:integrationId`
export const MONEYHASH_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/moneyhash`
export const MONEYHASH_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/moneyhash/:integrationId`
export const FLUTTERWAVE_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/flutterwave`
export const FLUTTERWAVE_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/flutterwave/:integrationId`
export const GOCARDLESS_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/gocardless`
export const GOCARDLESS_INTEGRATION_OAUTH_CALLBACK_ROUTE = `${ROOT_INTEGRATIONS_ROUTE}/gocardless/callback`
export const GOCARDLESS_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/gocardless/:integrationId`
export const TAX_MANAGEMENT_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/lago-tax-management`
export const MEMBERS_ROUTE = `${SETTINGS_ROUTE}/members`
export const EMAILS_SETTINGS_ROUTE = `${SETTINGS_ROUTE}/emails`
export const XERO_INTEGRATION_ROUTE = `${INTEGRATIONS_ROUTE}/xero`
export const XERO_INTEGRATION_DETAILS_ROUTE = `${INTEGRATIONS_ROUTE}/xero/:integrationId/:tab`
export const DUNNINGS_SETTINGS_ROUTE = `${SETTINGS_ROUTE}/dunnings`

const BILLING_ENTITY_BASE = `${SETTINGS_ROUTE}/billing-entity`
const BILLING_ENTITY_BASE_WITH_CODE = `${BILLING_ENTITY_BASE}/:billingEntityCode`

export const BILLING_ENTITY_ROUTE = BILLING_ENTITY_BASE_WITH_CODE
export const BILLING_ENTITY_GENERAL_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/general`
export const BILLING_ENTITY_EMAIL_SCENARIOS_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/email-scenarios`
export const BILLING_ENTITY_EMAIL_SCENARIOS_CONFIG_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/email-scenarios/:type`
export const BILLING_ENTITY_DUNNING_CAMPAIGNS_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/dunning-campaigns`
export const BILLING_ENTITY_INVOICE_SETTINGS_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/invoice-settings`
export const BILLING_ENTITY_INVOICE_CUSTOM_SECTIONS_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/invoice-custom-sections`
export const BILLING_ENTITY_TAXES_SETTINGS_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/taxes`

/**
 * Creation routes
 */
export const BILLING_ENTITY_CREATE_ROUTE = `${BILLING_ENTITY_BASE}/create`
export const BILLING_ENTITY_UPDATE_ROUTE = `${BILLING_ENTITY_BASE_WITH_CODE}/edit`
export const CREATE_DUNNING_ROUTE = `${SETTINGS_ROUTE}/dunnings/create`
export const UPDATE_DUNNING_ROUTE = `${SETTINGS_ROUTE}/dunnings/:campaignId/edit`
export const CREATE_INVOICE_CUSTOM_SECTION = `${INVOICE_SETTINGS_ROUTE}/custom-section/create`
export const EDIT_INVOICE_CUSTOM_SECTION = `${INVOICE_SETTINGS_ROUTE}/custom-section/:sectionId/edit`
export const CREATE_PRICING_UNIT = `${INVOICE_SETTINGS_ROUTE}/pricing-unit/create`
export const EDIT_PRICING_UNIT = `${INVOICE_SETTINGS_ROUTE}/pricing-unit/:pricingUnitId/edit`

export const settingRoutes: CustomRouteObject[] = [
  {
    private: true,
    element: <Settings />,
    children: [
      {
        path: SETTINGS_ROUTE,
        private: true,
        element: <SettingsHomePage />,
      },
      {
        path: [INVOICE_SETTINGS_ROUTE],
        private: true,
        element: <InvoiceSections />,
        permissions: ['organizationInvoicesView'],
      },
      {
        path: [TAXES_SETTINGS_ROUTE],
        private: true,
        element: <TaxesSettings />,
        permissions: ['organizationTaxesView'],
      },
      {
        path: INTEGRATIONS_ROUTE,
        private: true,
        element: <Integrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: AUTHENTICATION_ROUTE,
        private: true,
        element: <Authentication />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: OKTA_AUTHENTICATION_ROUTE,
        private: true,
        element: <OktaAuthenticationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: MEMBERS_ROUTE,
        private: true,
        element: <Members />,
        permissions: ['organizationMembersView'],
      },
      {
        path: ANROK_INTEGRATION_ROUTE,
        private: true,
        element: <AnrokIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: ANROK_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <AnrokIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: ADYEN_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <AdyenIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: ADYEN_INTEGRATION_ROUTE,
        private: true,
        element: <AdyenIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: AVALARA_INTEGRATION_ROUTE,
        private: true,
        element: <AvalaraIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: AVALARA_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <AvalaraIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },

      {
        path: HUBSPOT_INTEGRATION_ROUTE,
        private: true,
        element: <HubspotIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: HUBSPOT_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <HubspotIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: NETSUITE_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <NetsuiteIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: NETSUITE_INTEGRATION_ROUTE,
        private: true,
        element: <NetsuiteIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: SALESFORCE_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <SalesforceIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: SALESFORCE_INTEGRATION_ROUTE,
        private: true,
        element: <SalesforceIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: STRIPE_INTEGRATION_ROUTE,
        private: true,
        element: <StripeIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: STRIPE_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <StripeIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: GOCARDLESS_INTEGRATION_OAUTH_CALLBACK_ROUTE,
        private: true,
        element: <GocardlessIntegrationOauthCallback />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: CASHFREE_INTEGRATION_ROUTE,
        private: true,
        element: <CashfreeIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: CASHFREE_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <CashfreeIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: MONEYHASH_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <MoneyhashIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: MONEYHASH_INTEGRATION_ROUTE,
        private: true,
        element: <MoneyhashIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: FLUTTERWAVE_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <FlutterwaveIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: FLUTTERWAVE_INTEGRATION_ROUTE,
        private: true,
        element: <FlutterwaveIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: GOCARDLESS_INTEGRATION_ROUTE,
        private: true,
        element: <GocardlessIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: GOCARDLESS_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <GocardlessIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: TAX_MANAGEMENT_INTEGRATION_ROUTE,
        private: true,
        element: <TaxManagementIntegration />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: XERO_INTEGRATION_DETAILS_ROUTE,
        private: true,
        element: <XeroIntegrationDetails />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: XERO_INTEGRATION_ROUTE,
        private: true,
        element: <XeroIntegrations />,
        permissions: ['organizationIntegrationsView'],
      },
      {
        path: DUNNINGS_SETTINGS_ROUTE,
        private: true,
        element: <DunningsSettings />,
        permissions: ['dunningCampaignsView'],
      },
      {
        path: BILLING_ENTITY_ROUTE,
        private: true,
        element: <BillingEntity />,
        permissions: ['billingEntitiesView'],
      },
      {
        path: BILLING_ENTITY_GENERAL_ROUTE,
        private: true,
        element: <BillingEntityGeneral />,
        permissions: ['billingEntitiesView'],
      },
      {
        path: BILLING_ENTITY_EMAIL_SCENARIOS_ROUTE,
        private: true,
        element: <BillingEntityEmailScenarios />,
        permissions: ['billingEntitiesEmailsView'],
      },
      {
        path: BILLING_ENTITY_EMAIL_SCENARIOS_CONFIG_ROUTE,
        private: true,
        element: <BillingEntityEmailScenariosConfig />,
        permissions: ['billingEntitiesEmailsView'],
      },
      {
        path: BILLING_ENTITY_DUNNING_CAMPAIGNS_ROUTE,
        private: true,
        element: <BillingEntityDunningCampaigns />,
        permissions: ['billingEntitiesView'],
      },
      {
        path: BILLING_ENTITY_INVOICE_SETTINGS_ROUTE,
        private: true,
        element: <BillingEntityInvoiceSettings />,
        permissions: ['billingEntitiesInvoicesView'],
      },
      {
        path: BILLING_ENTITY_INVOICE_CUSTOM_SECTIONS_ROUTE,
        private: true,
        element: <BillingEntityInvoiceCustomSections />,
        permissions: ['billingEntitiesInvoicesView'],
      },
      {
        path: BILLING_ENTITY_TAXES_SETTINGS_ROUTE,
        private: true,
        element: <BillingEntityTaxesSettings />,
        permissions: ['billingEntitiesTaxesView'],
      },
    ],
  },
  {
    path: [CREATE_DUNNING_ROUTE, UPDATE_DUNNING_ROUTE],
    private: true,
    element: <CreateDunning />,
    permissions: ['dunningCampaignsCreate', 'dunningCampaignsView', 'dunningCampaignsUpdate'],
  },
  {
    path: [CREATE_INVOICE_CUSTOM_SECTION, EDIT_INVOICE_CUSTOM_SECTION],
    private: true,
    element: <CreateInvoiceCustomSection />,
    permissions: ['invoiceCustomSectionsCreate', 'invoiceCustomSectionsUpdate'],
  },
  {
    path: [BILLING_ENTITY_CREATE_ROUTE, BILLING_ENTITY_UPDATE_ROUTE],
    private: true,
    element: <BillingEntityCreateEdit />,
    permissions: ['billingEntitiesCreate', 'billingEntitiesUpdate'],
  },
  {
    path: [CREATE_PRICING_UNIT, EDIT_PRICING_UNIT],
    private: true,
    element: <CreatePricingUnit />,
    permissions: ['pricingUnitsCreate', 'pricingUnitsUpdate'],
  },
]
