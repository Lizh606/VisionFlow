
export const marketplace = {
  "nav": {
    "buyer": "Buyer",
    "seller": "Seller"
  },
  "home": {
    "title": "Marketplace",
    "description": "Discover models, workflows, and plugins.",
    "heroTitle": "Find resources for your project.",
    "heroDesc": "Search, preview, and add assets to your workspace library.",
    "featuredTitle": "Featured Resources",
    "viewAll": "View All",
    "browseAll": "Browse All"
  },
  "type": {
    "workflow": "Workflow",
    "model": "Model",
    "plugin": "Plugin"
  },
  "library": {
    "title": "My Library",
    "description": "Your purchased and subscribed assets.",
    "browseStore": "Browse Store",
    "searchPlaceholder": "Search assets, plans...",
    "filter": {
      "all": "All statuses",
      "active": "Active",
      "syncing": "Syncing",
      "expired": "Expired"
    },
    "meta": {
      "itemsShown": "{{count}} item shown",
      "itemsShown_plural": "{{count}} items shown"
    },
    "empty": {
      "noMatch": "No assets match current filters.",
      "goStore": "Go to Store"
    }
  },
  "seller": {
    "dashboard": "Seller Center",
    "dashboardDesc": "Seller center: monitor status, review progress, and storefront analytics.",
    "myListings": "My Listings",
    "createListing": "New Listing",
    "emptyDesc": "Start by publishing your first resource.",
    "status": {
      "draft": "DRAFT",
      "pending_review": "PENDING REVIEW",
      "published": "PUBLISHED",
      "suspended": "SUSPENDED",
      "archived": "ARCHIVED"
    },
    "actions": {
      "submissionInfo": "Submission",
      "liveStore": "Live Storefront",
      "submit": "Submit"
    },
    "notices": {
      "reviewing": "Awaiting technical review (~48h)",
      "live": "Visible on Marketplace",
      "violation": "Violated terms",
      "archived": "Retired from market"
    },
    "preview": {
      "bannerDraft": "Preview Mode — This listing is not yet public.",
      "bannerPublished": "Preview Mode — This is how buyers see your resource.",
      "bannerSuspended": "Preview Mode — This listing is currently suspended and hidden from market.",
      "ctaDisabled": "Action Disabled in Preview"
    },
    "wizard": {
      "newTitle": "Create New Listing",
      "editTitle": "Edit Listing Details",
      "draftSaved": "Draft saved successfully",
      "submitTitle": "Preview & Submit",
      "submitDesc": "Your resource details are ready. Please preview the storefront to ensure all metadata and documents are correct before sending for approval.",
      "previewSection": "Storefront Preview",
      "previewHint": "Buyer Perspective",
      "openPreview": "Preview Marketplace Listing",
      "viewAsBuyer": "See exactly how buyers will interact with your resource.",
      "launchPreview": "Preview",
      "launchSubmit": "Submit",
      "workflowTitle": "Approval Workflow",
      "workflowDesc": "After submission, status will change to PENDING_REVIEW. Our team typically completes technical verification within 2 working days.",
      "submitted": "Submission Successful",
      "loadFailed": "Load Failed",
      "missingMetadata": "Required: Short Description",
      "submitBtn": "Confirm & Submit",
      "backBtn": "Back",
      "nextBtn": "Next Step",
      "steps": {
        "general": "General",
        "source": "Source",
        "artifacts": "Artifacts",
        "pricing": "Pricing",
        "submit": "Submit"
      },
      "general": {
        "basicTitle": "Basic Information",
        "basicSubtitle": "Storefront Identity",
        "nameLabel": "Resource Title",
        "namePlaceholder": "e.g. Advanced PPE Detection",
        "nameRequired": "Title is required",
        "descLabel": "Short Description",
        "descPlaceholder": "Briefly explain what this resource does...",
        "descRequired": "Description is required",
        "classTitle": "Classification",
        "classSubtitle": "Matching and Discovery",
        "tagsLabel": "Category / Tags",
        "taskLabel": "Primary Task Type",
        "devicesLabel": "Supported Devices",
        "devicesPlaceholder": "Type hardware (e.g. Jetson Orin)"
      },
      "source": {
        "title": "Linked Vision Logic",
        "subtitle": "Studio Asset Binding",
        "description": "Select the workspace workflow and specific version that provides the logic for this marketplace resource. Consumers will receive a read-only copy of this asset.",
        "workflowLabel": "Source Workflow",
        "workflowRequired": "Please select a workflow",
        "versionLabel": "Asset Version",
        "syncTitle": "Logic Synchronization",
        "syncDesc": "The marketplace binary will be updated automatically when a release is pushed to this version."
      },
      "artifacts": {
        "docsTitle": "Technical Documentation",
        "docsSubtitle": "Buyer Guidance",
        "uploadDocs": "Upload PDF/MD Docs",
        "examplesTitle": "Visual Examples",
        "examplesSubtitle": "Storefront Preview"
      },
      "pricing": {
        "title": "Licensing & Revenue",
        "subtitle": "Select the pricing model that best fits your resource capabilities. Consumers will be billed automatically by VisionFlow.",
        "plans": {
          "free": {
            "name": "Community Free",
            "desc": "Standard open-source usage for non-commercial projects and personal learning."
          },
          "pro": {
            "name": "Professional License",
            "desc": "Up to 3 concurrent streams, commercial usage authorized for small teams."
          },
          "ent": {
            "name": "Enterprise Monthly",
            "desc": "Unlimited scalability, dedicated support, and custom edge deployment options."
          }
        },
        "supportTitle": "Need a custom license model or bespoke pricing for enterprise clients?",
        "supportLink": "Open a Support Ticket",
        "feeNote": "Marketplace fees (15%) are deducted automatically from all paid transactions.",
        "sellerTerms": "Seller Terms Apply"
      }
    }
  },
  "detail": {
    "overview": "Overview",
    "examples": "Examples",
    "docs": "Documentation",
    "pricing": "Pricing",
    "author": "Developer",
    "category": "Category",
    "published": "Published",
    "cta": {
      "openStudio": "Open in Studio",
      "deploy": "Deploy to Self-hosted",
      "buyNow": "Buy Now",
      "getFree": "Get for Free",
      "cloudTest": "Cloud Test"
    },
    "sections": {
      "details": "Resource Details"
    },
    "supportedDevices": "Supported Devices"
  },
  "purchase": {
    "status": {
      "active": "ACTIVE",
      "expired": "EXPIRED",
      "syncing": "SYNCING",
      "ready": "READY",
      "pending": "PENDING",
      "failed": "FAILED"
    },
    "label": {
      "expires": "Expires: {{date}}",
      "lifetime": "Lifetime Access",
      "quota": "Quota: {{count}} Streams",
      "open": "Open",
      "deploy": "Deploy",
      "viewDetails": "View details",
      "fullAccess": "Full Access License"
    }
  },
  "entitlement": {
    "drawer": {
      "title": "Entitlement Details",
      "purchasedAt": "Purchased {{date}}",
      "support": "Contact Support for Assistance"
    },
    "sections": {
      "access": "Access & Quota",
      "capabilities": "Capabilities",
      "metadata": "Entitlement Metadata"
    },
    "labels": {
      "expiry": "Expiration Date",
      "quota": "Stream Quota",
      "status": "Entitlement Status",
      "activeStreams": "{{count}} Active Streams",
      "unlimited": "Unlimited",
      "id": "Entitlement ID",
      "listingId": "Listing ID",
      "billing": "Billing Cycle",
      "oneTime": "One-time"
    },
    "capabilities": {
      "commercial": {
        "title": "Commercial Use",
        "enabled": "Authorized for professional inference and production environments.",
        "disabled": "Trial or sandbox execution only."
      },
      "cloud": {
        "title": "Cloud Sandboxing",
        "enabled": "Real-time logic testing on VisionFlow Cloud infrastructure.",
        "disabled": "Cloud testing not included in this plan."
      },
      "edge": {
        "title": "Edge Deployment",
        "enabled": "Authorized for deployment on self-hosted devices.",
        "disabled": "Cloud-only execution policy applied."
      }
    }
  },
  "filters": {
    "title": "Filters",
    "reset": "Reset",
    "tags": "Tags",
    "taskType": "Task Type",
    "devices": "Devices",
    "priceRange": "Price Range",
    "showResults": "Show Results"
  },
  "installs": "installs"
};
