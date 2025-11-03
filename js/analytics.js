async function getDeviceId(telemetryBase) {
    const raw = [
        telemetryBase.user_agent,
        telemetryBase.platform,
        telemetryBase.language,
        telemetryBase.vendor,
        telemetryBase.screen_width,
        telemetryBase.screen_height,
        telemetryBase.color_depth,
        telemetryBase.pixel_ratio,
        telemetryBase.hardware_concurrency,
        telemetryBase.device_memory,
        telemetryBase.timezone_offset
    ].join('|');

    const encoder = new TextEncoder();
    const data = encoder.encode(raw);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex.slice(0, 32);
}

async function collectWebTelemetry() {
    const battery = navigator.getBattery ? await navigator.getBattery() : null;
    const storage = navigator.storage && navigator.storage.estimate ? await navigator.storage.estimate() : null;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const telemetry = {
        type: "web",

        user_agent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        vendor: navigator.vendor,

        screen_width: window.screen.width,
        screen_height: window.screen.height,
        color_depth: window.screen.colorDepth,
        pixel_ratio: window.devicePixelRatio,

        timezone_offset: new Date().getTimezoneOffset(),

        performance_memory: performance.memory ? {
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize
        } : null,

        battery_level: battery ? battery.level : null,
        charging: battery ? battery.charging : null,

        storage_estimate: storage ? {
            quota: storage.quota,
            usage: storage.usage
        } : null,

        connection: connection ? {
            downlink: connection.downlink,
            rtt: connection.rtt,
            effectiveType: connection.effectiveType
        } : null,

        hardware_concurrency: navigator.hardwareConcurrency,
        device_memory: navigator.deviceMemory,
        touch_support: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        cookie_enabled: navigator.cookieEnabled
    };

    telemetry.device_id = await getDeviceId(telemetry);
    return telemetry;
}

async function sendTelemetry() {
    const data = await collectWebTelemetry();

    try {
        await fetch('https://analytics.dumb-msg.xyz/api/collect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log("telemetry sent successfully!");
    } catch (err) {
        console.error("telemetry send failed:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    sendTelemetry();
});
