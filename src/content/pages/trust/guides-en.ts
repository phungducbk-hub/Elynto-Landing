import type { PagesDictionary } from "../types";

export const guidesEn: Pick<PagesDictionary, "getting-started" | "writing-tasks" | "about" | "contact"> = {
  "getting-started": {
    "navLabel": "Getting started",
    "eyebrow": "Getting started",
    "title": "Your first clear task, step by step.",
    "description": "A practical path from opening a workspace to following up with your team.",
    "sections": [
      {
        "heading": "Open the right workspace",
        "body": [
          "Sign in to Elynto or create an account through Start free trial. Check which workspace you are in before adding work or inviting people."
        ]
      },
      {
        "heading": "Bring the right people in",
        "body": [
          "If you manage the workspace, invite the colleagues who need access. Check that the intended owner is a member and use the name shown in Elynto."
        ]
      },
      {
        "heading": "Create a task for yourself",
        "body": [
          "On Today, describe the work and deadline: “Send the client quotation by Friday.” Review the result card rather than assuming AI interpreted every detail correctly."
        ]
      },
      {
        "heading": "Assign and check the result",
        "body": [
          "Try “Assign Alex to prepare the report, due Friday.” Check the owner, date and priority on the card. Follow work you assigned to teammates in Delegated; find your own assigned work in My Work."
        ],
        "links": [
          {
            "page": "delegated-work"
          },
          {
            "page": "today"
          }
        ]
      },
      {
        "heading": "Start a project when work needs a plan",
        "body": [
          "Enter a goal such as “Plan a website launch in three weeks.” Review the proposed phases and tasks before creating the project, then assign the owners."
        ],
        "links": [
          {
            "page": "ai-planning"
          }
        ]
      },
      {
        "heading": "Choose a useful view",
        "body": [
          "Use the list for owners and statuses, Calendar for dates, and Gantt for the sequence of work. Check overdue work and items waiting for review as part of your daily routine."
        ],
        "links": [
          {
            "page": "project-views"
          }
        ]
      },
      {
        "heading": "Keep the discussion with the work",
        "body": [
          "Choose the relevant direct, group or project conversation. Give a meeting a clear purpose and create the agreed next steps with owners and deadlines."
        ],
        "links": [
          {
            "page": "collaboration"
          }
        ]
      },
      {
        "heading": "Ask for help when you need it",
        "body": [
          "If the result is not what you expected, describe what you tried and the result you saw. Include the page or feature involved, but leave out passwords, secret keys and other people’s private content."
        ],
        "links": [
          {
            "page": "contact"
          },
          {
            "page": "writing-tasks"
          }
        ]
      }
    ]
  },
  "writing-tasks": {
    "navLabel": "Writing clear requests",
    "eyebrow": "Practical guide",
    "title": "A clear request. A better starting point.",
    "description": "Give Elynto a useful task, an identifiable owner and a clear deadline, then review the result.",
    "sections": [
      {
        "heading": "Say what needs doing",
        "body": [
          "Begin with an action and an outcome: prepare the quotation, review the draft, confirm the launch date. Split unrelated requests so each can have its own owner and deadline."
        ]
      },
      {
        "heading": "Name the owner and deadline",
        "body": [
          "Use the teammate’s name as it appears in the workspace. If names may be confused, add context and check the selected person. Use a specific date when precision matters, especially across time zones."
        ]
      },
      {
        "heading": "Start with a short example",
        "body": [
          "For yourself: “Send the quotation to the client by 20 November.” For a teammate: “Assign Alex to review the website proposal by Friday.” For a project: “Plan a website launch in three weeks.”"
        ]
      },
      {
        "heading": "Check before you move on",
        "body": [
          "Review the title, owner, due date and priority on the work card. For a project, edit the draft before creating it. If an interpretation is wrong, correct the result or clarify the request; AI output is not a guarantee of accuracy."
        ],
        "links": [
          {
            "page": "natural-language-tasks"
          },
          {
            "page": "ai-planning"
          },
          {
            "page": "security"
          }
        ]
      }
    ]
  },
  "about": {
    "navLabel": "About Elynto",
    "eyebrow": "About Elynto",
    "title": "Less coordination. More clarity.",
    "description": "Elynto brings work, planning and team conversations into one place, starting with the way people naturally describe what needs doing.",
    "sections": [
      {
        "heading": "The interface between you and your work",
        "body": [
          "The aim is straightforward: help a person or team turn an intention into a clear next step, with an owner, a deadline and progress that can be followed."
        ]
      },
      {
        "heading": "Built for real working days",
        "body": [
          "Elynto is for freelancers managing several clients, small teams coordinating delivery and business owners following many moving parts. The product connects creating work, planning projects and discussing the next step."
        ]
      },
      {
        "heading": "AI that helps you stay in control",
        "body": [
          "Natural-language requests help you get started quickly. A visible result lets you check what was understood. Project drafts can be reviewed before creation, and responsibility stays with the people doing and approving the work."
        ],
        "links": [
          {
            "page": "natural-language-tasks"
          },
          {
            "page": "ai-planning"
          }
        ]
      },
      {
        "heading": "An open line to Elynto",
        "body": [
          "Send product questions, feedback, partnership ideas or requests about your data to support@elynto.io. The help center offers practical guidance for getting started and working with your team."
        ],
        "links": [
          {
            "page": "help-center"
          },
          {
            "page": "contact"
          },
          {
            "page": "security"
          }
        ]
      }
    ]
  },
  "contact": {
    "navLabel": "Contact",
    "eyebrow": "Contact Elynto",
    "title": "Let’s get you to the right next step.",
    "description": "Product questions, feedback, billing concerns or requests about your data: contact Elynto by email.",
    "sections": [
      {
        "heading": "Product help and feedback",
        "body": [
          "Describe the page or feature, what you were trying to do and what happened. A redacted screenshot can help; remove private messages and other people’s details before sending."
        ],
        "emailSubject": "Product support"
      },
      {
        "heading": "Billing and cancellation",
        "body": [
          "Include the account email, transaction reference and the issue you want reviewed. Do not send a full card number, payment credentials or a password."
        ],
        "links": [
          {
            "page": "cancellation"
          }
        ],
        "emailSubject": "Billing request"
      },
      {
        "heading": "Privacy and security",
        "body": [
          "Use the subject “Privacy request” for access, correction or deletion requests, or “Security report” for a security concern. Elynto may need to verify that you are authorized to make the request."
        ],
        "links": [
          {
            "page": "privacy"
          },
          {
            "page": "security"
          }
        ],
        "emailSubject": "Privacy or security request"
      }
    ]
  }
};
