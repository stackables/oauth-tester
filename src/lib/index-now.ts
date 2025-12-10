#!/usr/bin/env node

async function main() {
    const domain = "oauth.sdk42.com";
    const key = "645597f027ba41cfad35c2059b40f324";

    // Submit URLs to IndexNow
    const indexNowPayload = {
        host: domain,
        key: key,
        keyLocation: `https://${domain}/${key}.txt`,
        urlList: [
            'https://oauth.sdk42.com/',
            'https://oauth.sdk42.com/llms.txt'
        ],
    };

    console.log(`\nSubmitting URLs to IndexNow...`);

    const response = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(indexNowPayload),
    });

    if (response.ok) {
        // IndexNow returns 200 for success, 202 for accepted (URL received but not yet indexed)
        console.log(
            console.log(`✓ Successfully submitted URLs to IndexNow (status: ${response.status})`)
        );
    } else {
        const errorText = await response.text();
        throw new Error(`Failed to submit to IndexNow: ${response.status} ${response.statusText}\n${errorText}`);
    }
}

void main()
