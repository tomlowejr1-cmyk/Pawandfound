import { createServerFn } from "@tanstack/react-start";

interface SubscribeResponse {
  success: boolean;
  message: string;
}

/**
 * Server function to subscribe an email to the Mailchimp audience.
 * Uses environment variables for the API key and list ID.
 */
const subscribeToNewsletter = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Please enter a valid email address.");
    }
    return { email: data.email.toLowerCase().trim() };
  })
  .handler(async ({ data }): Promise<SubscribeResponse> => {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (!apiKey || !listId) {
      console.error("Mailchimp: Missing API key or list ID in environment variables");
      return {
        success: false,
        message: "Newsletter is temporarily unavailable. Please try again later.",
      };
    }

    // Extract datacenter from the API key suffix (e.g., "us12" from "key-us12")
    const dc = apiKey.split("-").pop();
    if (!dc) {
      console.error("Mailchimp: Invalid API key format (no datacenter suffix)");
      return {
        success: false,
        message: "Newsletter is temporarily unavailable. Please try again later.",
      };
    }

    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: data.email,
          status: "subscribed",
        }),
      });

      const result = await response.json();

      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          message: "You're subscribed! Welcome to the Paw & Found pack. 🐾",
        };
      }

      // Handle specific error cases
      if (result.title === "Member Exists") {
        return {
          success: false,
          message: "This email is already subscribed to our newsletter!",
        };
      }

      console.error("Mailchimp API error:", result);
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    } catch (error) {
      console.error("Mailchimp request failed:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  });

export { subscribeToNewsletter };