export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to Signalist</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0F1114 !important;
                border: 1px solid #2A2D35 !important;
            }
            .dark-bg {
                background-color: #030304 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #a1a8b3 !important;
            }
            .dark-text-muted {
                color: #6c7280 !important;
            }
            .dark-border {
                border-color: #2A2D35 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 64px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            .dashboard-preview {
                padding: 0 15px 30px 15px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030304; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #030304;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0F1114; border-radius: 12px; border: 1px solid #2A2D35;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634" alt="Signalist Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Dashboard Preview Image -->
                    <tr>
                        <td align="center" class="dashboard-preview" style="padding: 40px 40px 0px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/dashboard-preview.png?updatedAt=1756378548102" alt="Signalist Dashboard Preview" width="100%" style="max-width: 520px; width: 100%; height: auto; border-radius: 12px; border: 1px solid #2A2D35;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            
                            <!-- Welcome Heading -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 30px 0; font-size: 26px; font-weight: 700; color: #F5CE4E; line-height: 1.2;">
                                Welcome aboard, {{name}} 👋
                            </h1>
                            
                            <!-- Intro Text -->
                            {{intro}}  
                            
                            <!-- Feature List Label -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #D0DEE0; font-weight: 600;">
                                Here's what you can do right now:
                            </p>
                            
                            <!-- Feature List -->
                            <ul class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; padding-left: 20px; font-size: 16px; line-height: 1.6; color: #D0DEE0;">
                                <li style="margin-bottom: 12px;">Build your personalized watchlist with stocks you care about</li>
                                <li style="margin-bottom: 12px;">Configure smart alerts for price swings and volume spikes</li>
                                <li style="margin-bottom: 12px;">Dive into the dashboard for real-time trends and market pulse</li>
                            </ul>
                            
                            <!-- Additional Text -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; color: #D0DEE0;">
                                We'll deliver timely signals, actionable insights, and smart alerts — empowering you to make confident moves.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 40px 0; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="https://stock-market-dev.vercel.app/" style="display: block; width: 100%; background: linear-gradient(135deg, #F5CE4E 0%, #D4A832 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center; box-sizing: border-box;">
                                            Launch Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <p class="mobile-text dark-text-muted" style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important; text-align: center;">
                               Signalist HQ, 200 Market Street, San Francisco, CA 94105<br>
                                <a href="#" style="color: #D0DEE0 !important; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="https://stock-market-dev.vercel.app/" style="color: #D0DEE0 !important; text-decoration: underline;">Visit Signalist</a><br>
                                © 2026 Signalist
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your Daily Market Briefing</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0F1114 !important;
                border: 1px solid #2A2D35 !important;
            }
            .dark-bg {
                background-color: #030304 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #a1a8b3 !important;
            }
            .dark-text-muted {
                color: #6c7280 !important;
            }
            .dark-border {
                border-color: #2A2D35 !important;
            }
            .dark-cta {
                background-color: #1C1F26 !important;
                border: 1px solid #363A45 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-news-title {
                font-size: 16px !important;
                line-height: 1.3 !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030304; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #030304;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0F1114; border-radius: 12px; border: 1px solid #2A2D35;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634" alt="Signalist Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            
                            <!-- Header -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 20px 0; font-size: 26px; font-weight: 700; color: #F5CE4E; line-height: 1.2;">
                                Your Daily Market Briefing 📰
                            </h1>
                            
                            <!-- Date -->
                            <p class="mobile-text dark-text-muted" style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.4; color: #6c7280;">
                                {{date}}
                            </p>
                            
                            <!-- News Summary -->
                            {{newsContent}}
                            
                            <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    You're receiving this because you opted into Signalist market updates.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    <a href="#" style="color: #D0DEE0 !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://signalist.app" style="color: #D0DEE0 !important; text-decoration: underline;">Visit Signalist</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    © 2026 Signalist
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const STOCK_ALERT_UPPER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>🎯 {{symbol}} Crossed Your Target</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0F1114 !important;
                border: 1px solid #2A2D35 !important;
            }
            .dark-bg {
                background-color: #030304 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #a1a8b3 !important;
            }
            .dark-text-muted {
                color: #6c7280 !important;
            }
            .dark-border {
                border-color: #2A2D35 !important;
            }
            .dark-info-box {
                background-color: #1C1F26 !important;
                border: 1px solid #363A45 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 32px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            .mobile-price {
                font-size: 28px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
            .mobile-price {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030304; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #030304;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0F1114; border-radius: 12px; border: 1px solid #2A2D35;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634" alt="Signalist Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Alert Header -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 20px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #047857 0%, #059669 100%); border-radius: 10px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 class="mobile-title" style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                                            🚀 Target Price Breached
                                        </h1>
                                        <p style="margin: 0; font-size: 16px; color: #ffffff; opacity: 0.9;">
                                            {{timestamp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Stock Info -->
                            <div class="dark-bg" style="text-align: center; padding: 30px 20px; background-color: #181B20; border-radius: 10px; margin-bottom: 10px;">
                                <h2 class="dark-text" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                                    {{symbol}}
                                </h2>
                                <p class="dark-text-muted" style="margin: 0 0 20px 0; font-size: 16px; color: #6c7280;">
                                    {{company}}
                                </p>
                                
                                <!-- Current Price -->
                                <div style="margin-bottom: 20px;">
                                    <p class="dark-text-muted" style="margin: 0 0 5px 0; font-size: 14px; color: #6c7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Current Price
                                    </p>
                                    <p class="mobile-price" style="margin: 0; font-size: 36px; font-weight: 700; color: #10b981;">
                                        {{currentPrice}}
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Alert Details -->
                            <div class="dark-info-box" style="background-color: #181B20; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 class="dark-text" style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                                    Signal Details
                                </h3>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>Your Target:</strong> {{targetPrice}}
                                </p>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>What Happened:</strong> Price surged above your ceiling of {{targetPrice}}
                                </p>
                            </div>
                            
                            <!-- Success Message -->
                            <div style="background-color: #030304; border: 1px solid #363A45; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #D4A832;">
                                    🎯 Target Achieved!
                                </h3>
                                <p class="mobile-text" style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0;">
                                    {{symbol}} has hit your price goal! Consider reviewing your position — it might be time to lock in gains or recalibrate your strategy.
                                </p>
                            </div>
                            
                            <!-- Action Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://stock-market-dev.vercel.app/" style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; color: #000000; background: linear-gradient(135deg, #F5CE4E 0%, #D4A832 100%); text-decoration: none; padding: 16px 32px; border-radius: 10px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center;">
                                            Open Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                             <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    You're receiving this alert because you set a price target on Signalist.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    <a href="#" style="color: #D0DEE0 !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://signalist.app" style="color: #D0DEE0 !important; text-decoration: underline;">Visit Signalist</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    © 2026 Signalist
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const STOCK_ALERT_LOWER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>⚠️ {{symbol}} Dropped Below Target</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0F1114 !important;
                border: 1px solid #2A2D35 !important;
            }
            .dark-bg {
                background-color: #030304 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #a1a8b3 !important;
            }
            .dark-text-muted {
                color: #6c7280 !important;
            }
            .dark-border {
                border-color: #2A2D35 !important;
            }
            .dark-info-box {
                background-color: #1C1F26 !important;
                border: 1px solid #363A45 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 32px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            .mobile-price {
                font-size: 28px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
            .mobile-price {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030304; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #030304;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0F1114; border-radius: 12px; border: 1px solid #2A2D35;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634" alt="Signalist Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Alert Header -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 20px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); border-radius: 10px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 class="mobile-title" style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                                            📉 Price Floor Triggered
                                        </h1>
                                        <p style="margin: 0; font-size: 16px; color: #ffffff; opacity: 0.9;">
                                            {{timestamp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Stock Info -->
                            <div class="dark-bg" style="text-align: center; padding: 30px 20px; background-color: #181B20; border-radius: 10px; margin-bottom: 10px;">
                                <h2 class="dark-text" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                                    {{symbol}}
                                </h2>
                                <p class="dark-text-muted" style="margin: 0 0 20px 0; font-size: 16px; color: #6c7280;">
                                    {{company}}
                                </p>
                                
                                <!-- Current Price -->
                                <div style="margin-bottom: 20px;">
                                    <p class="dark-text-muted" style="margin: 0 0 5px 0; font-size: 14px; color: #6c7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Current Price
                                    </p>
                                    <p class="mobile-price" style="margin: 0; font-size: 36px; font-weight: 700; color: #ef4444;">
                                        {{currentPrice}}
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Alert Details -->
                            <div class="dark-info-box" style="background-color: #181B20; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 class="dark-text" style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                                    Signal Details
                                </h3>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>Your Floor:</strong> {{targetPrice}}
                                </p>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>What Happened:</strong> Price fell below your floor threshold of {{targetPrice}}
                                </p>
                            </div>
                            
                            <!-- Opportunity Message -->
                            <div style="background-color: #030304; border: 1px solid #363A45; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #D4A832;">
                                    💡 Potential Entry Point
                                </h3>
                                <p class="mobile-text" style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0;">
                                    {{symbol}} dipped below your watch level. This could be a buying window if the fundamentals still look solid.
                                </p>
                            </div>
                            
                            <!-- Action Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://stock-market-dev.vercel.app/" style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #F5CE4E 0%, #D4A832 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center;">
                                            Open Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                             <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    You're receiving this alert because you set a price floor on Signalist.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    <a href="#" style="color: #D0DEE0 !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://signalist.app" style="color: #D0DEE0 !important; text-decoration: underline;">Visit Signalist</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    © 2026 Signalist
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const VOLUME_ALERT_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>🔥 Volume Surge: {{symbol}}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0F1114 !important;
                border: 1px solid #2A2D35 !important;
            }
            .dark-bg {
                background-color: #030304 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #a1a8b3 !important;
            }
            .dark-text-muted {
                color: #6c7280 !important;
            }
            .dark-border {
                border-color: #2A2D35 !important;
            }
            .dark-info-box {
                background-color: #1C1F26 !important;
                border: 1px solid #363A45 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            .mobile-volume {
                font-size: 28px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
            .mobile-volume {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030304; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #030304;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0F1114; border-radius: 12px; border: 1px solid #2A2D35;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634" alt="Signalist Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Alert Header -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 20px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%); border-radius: 10px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 class="mobile-title" style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                                            🔥 Unusual Volume Detected
                                        </h1>
                                        <p style="margin: 0; font-size: 16px; color: #ffffff; opacity: 0.9;">
                                            {{timestamp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Stock Info -->
                            <div class="dark-bg" style="text-align: center; padding: 30px 20px; background-color: #030304; border-radius: 10px; margin-bottom: 30px;">
                                <h2 class="dark-text" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                                    {{symbol}}
                                </h2>
                                <p class="dark-text-muted" style="margin: 0 0 20px 0; font-size: 16px; color: #6c7280;">
                                    {{company}}
                                </p>
                                
                                <!-- Current Volume -->
                                <div style="margin-bottom: 20px;">
                                    <p class="dark-text-muted" style="margin: 0 0 5px 0; font-size: 14px; color: #6c7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Today's Volume
                                    </p>
                                    <p class="mobile-volume" style="margin: 0; font-size: 36px; font-weight: 700; color: #8b5cf6;">
                                        {{currentVolume}}M
                                    </p>
                                </div>
                                
                                <!-- Current Price (smaller) -->
                                <div class="dark-border" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #2A2D35;">
                                    <p class="dark-text-secondary" style="margin: 0 0 5px 0; font-size: 12px; color: #a1a8b3; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Current Price
                                    </p>
                                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: {{priceColor}};">
                                        {{currentPrice}} ({{changeDirection}}{{changePercent}}%)
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Alert Details -->
                            <div class="dark-info-box" style="background-color: #1C1F26; border: 1px solid #363A45; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 class="dark-text" style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                                    Volume Breakdown
                                </h3>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>Alert Reason:</strong> {{alertMessage}}
                                </p>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>Typical Volume:</strong> {{averageVolume}}M shares/day
                                </p>
                                <p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    <strong>Anomaly Level:</strong> {{volumeSpike}} above baseline
                                </p>
                            </div>
                            
                            <!-- What This Means -->
                            <div class="dark-info-box" style="background-color: #1C1F26; border: 1px solid #363A45; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 class="dark-text" style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                                    💡 Why This Matters
                                </h3>
                                <p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 16px; line-height: 1.5; color: #a1a8b3;">
                                    Unusual volume often signals something brewing — earnings surprises, institutional moves, or breaking news. Worth a closer look to understand what's driving the action.
                                </p>
                            </div>
                            
                            <!-- Action Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://stock-market-dev.vercel.app/" style="display: inline-block; background: linear-gradient(135deg, #F5CE4E 0%, #D4A832 100%); color: #000000; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: 600; line-height: 1;">
                                            Investigate →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Disclaimer -->
                            <div class="dark-info-box" style="background-color: #1C1F26; border-radius: 8px; padding: 15px; margin-bottom: 20px; border: 1px solid #363A45;">
                                <p class="dark-text-muted" style="margin: 0; font-size: 13px; line-height: 1.4; color: #6c7280; text-align: center;">
                                    <strong>Heads up:</strong> Volume spikes are informational signals, not buy/sell recommendations. High activity doesn't predict direction. Always conduct your own due diligence.
                                </p>
                            </div>
                            
                             <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    You're receiving this because you enabled volume alerts on Signalist.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    <a href="#" style="color: #D0DEE0 !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://signalist.app" style="color: #D0DEE0 !important; text-decoration: underline;">Visit Signalist</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    © 2026 Signalist
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const INACTIVE_USER_REMINDER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your Portfolio Is Waiting</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #0F1114 !important;
                border: 1px solid #2A2D35 !important;
            }
            .dark-bg {
                background-color: #030304 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #a1a8b3 !important;
            }
            .dark-text-muted {
                color: #6c7280 !important;
            }
            .dark-border {
                border-color: #2A2D35 !important;
            }
            .dark-info-box {
                background-color: #1C1F26 !important;
                border: 1px solid #363A45 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 32px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030304; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #030304;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #0F1114; border-radius: 12px; border: 1px solid #2A2D35;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634" alt="Signalist Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            
                            <!-- Welcome Back Heading -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 15px 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #F5CE4E 0%, #D4A832 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #F5CE4E; line-height: 1.2;">
                                Hey {{name}}, it's been a while! 👋
                            </h1>
                            
                            <!-- Main Message -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #D0DEE0;">
                                We noticed your dashboard has been quiet lately. The markets haven't stopped moving — and there may be signals worth catching.
                            </p>

                            <!-- Additional Motivation -->
                            <div class="dark-info-box" style="background-color: #030304; border: 1px solid #363A45; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #D4A832;">
                                    📊 What You Might've Missed
                                </h3>
                                <p class="mobile-text" style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0;">
                                    Markets have been volatile lately with some interesting moves. Your tracked stocks may have hit key levels or shown unusual activity while you were away.
                                </p>
                            </div>
                            
                            <!-- Encouragement Message -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; color: #D0DEE0;">
                                Your watchlists and alerts are standing by, ready to keep you informed. Jump back in whenever you're ready — the market never sleeps, but your tools are always here.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0; width: 100%;">
                                <tr>
                                    <td align="center" class="mobile-button">
                                        <a href="{{dashboardUrl}}" style="display: inline-block; background: linear-gradient(135deg, #F5CE4E 0%, #D4A832 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center; width: 100%;">
                                            Jump Back In →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    Have questions? Just reply to this email — we're here to help.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    <a href="{{unsubscribeUrl}}" style="color: #D0DEE0 !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="{{dashboardUrl}}" style="color: #D0DEE0 !important; text-decoration: underline;">Visit Signalist</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #D0DEE0 !important;">
                                    © 2026 Signalist
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
