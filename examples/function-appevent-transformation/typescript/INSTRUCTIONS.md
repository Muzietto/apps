## Building your Function

Use this command below to install the template.

```
npx create-contentful-app@latest --function appevent-transformation
```

### Creating an app

You can create an app using CLI using `npm run create-app-definition`. This will prompt you to enter details for your new app and organization details. You can also create an app definition by [visiting the apps section](https://app.contentful.com/deeplink?link=app-definition-list) under your organization settings in the Contentful web UI and clicking on the "Create App" button on the top right.

### Using environment variables

You will need to set the following environment variables as listed below:

- `CONTENTFUL_ACCESS_TOKEN`: User management token used for authentication/authorization
- `CONTENTFUL_ORG_ID`: Organization id where the app lives under
- `CONTENTFUL_APP_DEF_ID`: App definition id for identifying the app

### Uploading the code to Contentful

It as simple using the CLI command `npm run upload-ci`. This will perform two actions: upload the code, linking it to the app, and then finally activating the code ready for usage in both

## Utilizing app event transformation functions

When you create an app that utilizes [app events](https://www.contentful.com/developers/docs/extensibility/app-framework/app-events/), you can define the entities and topics for these events. App event transformation function allows you to transform the payload of these events before they are sent to your app. This example demonstrates how to use the app event transformation function to transform the payload of the `entry.publish` event, by geocoding a latitude and longitude field to a human-readable address.