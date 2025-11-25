# GitHub Secrets Setup Guide

To complete the CI/CD setup for automated deployment to Google Cloud Run, you need to add 4 secrets to your GitHub repository.

## How to Add Secrets

1. Go to: https://github.com/bartshim75/growthcamp-home-html/settings/secrets/actions
2. Click **New repository secret** button for each secret below

## Required Secrets

Add the following 4 secrets:

### 1. GCP_PROJECT_ID
- **Name**: `GCP_PROJECT_ID`
- **Secret**: `r3-poob`

### 2. GCP_REGION
- **Name**: `GCP_REGION`
- **Secret**: `us-central1`

### 3. ARTIFACT_REGISTRY
- **Name**: `ARTIFACT_REGISTRY`
- **Secret**: `growthcamp-home-html`

### 4. GCP_SA_KEY
- **Name**: `GCP_SA_KEY`
- **Secret**: Paste the complete GCP service account JSON key (the one you provided earlier)

> [!IMPORTANT]
> For `GCP_SA_KEY`, make sure to paste the **entire JSON object** including the curly braces `{ }`.

## Verify Setup

After adding all 4 secrets:

1. **Check Actions tab**: https://github.com/bartshim75/growthcamp-home-html/actions
2. **Trigger deployment**: Push any change to the `main` branch
3. **Monitor workflow**: The GitHub Actions workflow should automatically build and deploy to Cloud Run
4. **Get service URL**: After successful deployment, find the service URL in the workflow logs

## Next Steps

Once secrets are configured and deployment succeeds:
- Your website will be live on Cloud Run
- Every push to `main` branch will automatically trigger a new deployment
- The service URL will be: `https://growthcamp-home-html-[hash]-uc.a.run.app`

## Troubleshooting

If deployment fails:
- Verify all 4 secrets are added correctly (no typos in names)
- Check that the Artifact Registry `growthcamp-home-html` exists in your GCP project
- Ensure the service account has necessary permissions
