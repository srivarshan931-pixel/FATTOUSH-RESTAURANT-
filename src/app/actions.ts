"use server";

export async function submitBooking(bookingData: {
  customerName: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  type: string;
}) {
  try {
    const webhookUrl = "https://srivarshan.app.n8n.cloud/webhook-test/gemini";

    // Attempt 1: Fetch the configured URL (usually the test webhook URL)
    let response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    // Attempt 2: If the test URL returns 404, automatically try the permanent production webhook URL
    if (response.status === 404 && webhookUrl.includes("/webhook-test/")) {
      const productionUrl = webhookUrl.replace("/webhook-test/", "/webhook/");
      console.warn("Test webhook returned 404. Attempting production webhook URL:", productionUrl);
      
      try {
        const prodResponse = await fetch(productionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (prodResponse.ok) {
          return { success: true };
        }
      } catch (prodErr) {
        console.error("Production fallback webhook failed:", prodErr);
      }
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: `Failed to submit reservation (Status: ${response.status}). In n8n, please make sure either: 1) Your workflow is toggled to "Active" (in the top-right corner of n8n), or 2) You clicked "Listen for test event" inside the Webhook node.` 
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Action Booking error:", err);
    const message = err instanceof Error ? err.message : "Failed to connect to the reservation service.";
    return { 
      success: false, 
      error: message 
    };
  }
}

export async function submitReservation(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const reservationType = formData.get("reservationType") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const guestsCount = formData.get("guestsCount") as string;
    const keepSecure = formData.get("keepSecure") === "true" || formData.get("keepSecure") === "on";

    const bookingData = {
      fullName,
      phone,
      reservationType,
      date,
      time,
      guestsCount: parseInt(guestsCount, 10) || 2,
      keepSecure,
    };

    const webhookUrl = "https://srivarshan.app.n8n.cloud/webhook/gemini";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      return { 
        success: false, 
        error: `Failed to submit reservation (Status: ${response.status}).` 
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Action submitReservation error:", err);
    const message = err instanceof Error ? err.message : "Failed to connect to the reservation service.";
    return { 
      success: false, 
      error: message 
    };
  }
}

