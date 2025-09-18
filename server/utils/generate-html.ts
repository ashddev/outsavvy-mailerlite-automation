type EventContent = {
  event_title: string;
  event_description: string;
  date_display: string;
  location_display: string;
  hero_url: string;
  ticket_url: string;
};

export const generateHtml = (eventContent: EventContent, reminder: boolean) => {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <meta name="x-apple-disable-message-reformatting" />
    ${generateStyles()}

    <meta name="robots" content="noindex, nofollow" />
    <title>The Sapphic Space UK: ${eventContent.event_title}</title>
    <meta name="image"
        content="https://storage.mlcdn.com/account_image/1492047/V60r8nTYJRhuTjdYoPE2hJstXx21II3g2NpL7Bl3.jpg"
        property="og:image" />
</head>

<body style="
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f4f7fa;
    ">
    <div style="
        display: none;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #ffffff;
        opacity: 0;
      ">
        The Sapphic Space UK - ${eventContent.event_title}
    </div>

    <div class="document" role="article" aria-roledescription="email" aria-label="The Sapphic Space UK Newsletter"
        lang="en" dir="ltr" style="background-color: #f4f7fa">
        <table role="presentation" width="100%" align="center" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td bgcolor="#F4F7FA" align="center" valign="top" style="padding: 0 8px">
                    <!-- Header utility bar: hybrid wrapper -->
                    <!--[if (gte mso 9)|(IE)]>
                <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="640">
                <tr><td>
            <![endif]-->

                    <table role="presentation" class="container max-640" align="center" cellpadding="0" cellspacing="0"
                        border="0">
                        <tr>
                            <td align="center">
                                <table role="presentation" align="center" width="100%" cellpadding="0" cellspacing="0"
                                    border="0">
                                    <tr>
                                        <td colspan="2" class="sp-20"></td>
                                    </tr>
                                    <tr>
                                        <td align="right" style="
                                color: #111111;
                                font-size: 12px;
                                line-height: 18px;
                                ">
                                            <a href="{$url}" target="_blank" rel="noopener noreferrer" style="
                                                color: #111111;
                                                font-weight: normal;
                                                font-style: normal;
                                                text-decoration: underline;
                                            ">View in browser</a>&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="sp-20"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!--[if (gte mso 9)|(IE)]>
                        </td></tr></table>
                    <![endif]-->

                    <!-- Card wrapper with border -->
                    <!--[if (gte mso 9)|(IE)]>
                        <table role="presentation" width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #EAECED;">
                        <tr><td>
                    <![endif]-->

                    <table role="presentation" class="wrapper" align="center" border="0" cellpadding="0" cellspacing="0"
                        style="
                        width: 100%;
                        max-width: 640px;
                        border: 1px solid #eaeced;
                        border-radius: 8px;
                        border-collapse: separate !important;
                        overflow: hidden;
                        background: #ffffff;
                    ">
                        <tr>
                            <td align="center">
                                <!-- Top logo block -->
                                <!--[if (gte mso 9)|(IE)]>
                                <table role="presentation" width="640" align="center" border="0" cellspacing="0" cellpadding="0">
                                <tr><td>
                                <![endif]-->
                                ${generateLogo()}
                                <!--[if (gte mso 9)|(IE)]>
                                </td></tr></table>
                                <![endif]-->

                                <!-- Title block -->
                                <!--[if (gte mso 9)|(IE)]>
                                <table role="presentation" width="640" align="center" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff;">
                                <tr><td>
                                <![endif]-->
                                ${generateTitle(eventContent, reminder)}
                                <!--[if (gte mso 9)|(IE)]>
                                </td></tr></table>
                                <![endif]-->

                                <!-- Hero + copy + CTA -->
                                <!--[if (gte mso 9)|(IE)]>
                                <table role="presentation" width="640" align="center" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff;">
                                <tr><td>
                                <![endif]-->
                                ${generateHeroAndContent(eventContent)}
                                <!--[if (gte mso 9)|(IE)]>
                                    </td></tr></table>
                                <![endif]-->

                                <!-- Footer block -->
                                <!--[if (gte mso 9)|(IE)]>
                                    <table role="presentation" width="640" align="center" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff;">
                                    <tr><td>
                                <![endif]-->
                                ${generateFooter()}
                                <!--[if (gte mso 9)|(IE)]>
                                </td></tr></table>
                                <![endif]-->
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>`;
};

const generateFooter = () => {
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff">
    <tr>
        <td>
            <table role="presentation" class="container" align="center" border="0" cellspacing="0" cellpadding="0"
                style="
                            width: 100%;
                            max-width: 640px;
                            background: #ffffff;
                          ">
                <tr>
                    <td class="container sp-40"></td>
                </tr>
                <tr>
                    <td class="row px-50">
                        <table role="presentation" align="center" width="100%" cellpadding="0" cellspacing="0"
                            border="0">
                            <tr>
                                <td class="col" align="left" width="250" valign="top"
                                    style="text-align: left !important">
                                    <h5 style="
                                        color: #000000;
                                        font-size: 15px;
                                        line-height: 125%;
                                        font-weight: bold;
                                        font-style: normal;
                                        text-decoration: none;
                                        margin-bottom: 6px;
                                      ">
                                        The Sapphic Space
                                    </h5>

                                    <p style="
                                        color: #515856;
                                        font-size: 14px;
                                        line-height: 150%;
                                        margin-bottom: 6px;
                                      ">
                                        Lytchett House, 13 Freeland Park, Wareham
                                        Road, Poole, Dorset, BH16 6FA, United
                                        Kingdom
                                    </p>

                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td height="16" style="line-height: 16px"></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td align="center" valign="middle" width="18"
                                                            style="padding: 0 5px 0 0">
                                                            <a href="https://www.facebook.com/profile.php?id=61570442771957&amp;sk=about"
                                                                target="_blank" rel="noopener noreferrer"
                                                                style="text-decoration: none">
                                                                <img src="https://assets.mlcdn.com/ml/images/icons/default/rounded_corners/black/facebook.png"
                                                                    width="18" alt="Facebook" />
                                                            </a>
                                                        </td>
                                                        <td align="center" valign="middle" width="18"
                                                            style="padding: 0 5px">
                                                            <a href="https://www.instagram.com/thesapphicspaceuk/"
                                                                target="_blank" rel="noopener noreferrer"
                                                                style="text-decoration: none">
                                                                <img src="https://assets.mlcdn.com/ml/images/icons/default/rounded_corners/black/instagram.png"
                                                                    width="18" alt="Instagram" />
                                                            </a>
                                                        </td>
                                                        <td align="center" valign="middle" width="18"
                                                            style="padding: 0 0 0 5px">
                                                            <a href="https://www.tiktok.com/@thesapphicspaceuk?_t=zn-8xecld79jgk&amp;_r=1"
                                                                target="_blank" rel="noopener noreferrer"
                                                                style="text-decoration: none">
                                                                <img src="https://assets.mlcdn.com/ml/images/icons/default/rounded_corners/black/tiktok.png"
                                                                    width="18" alt="TikTok" />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="col" width="40" height="30" style="line-height: 30px"></td>
                                <td class="col" align="left" width="250" valign="top"
                                    style="text-align: left !important">
                                    <p style="
                                        color: #515856;
                                        font-size: 14px;
                                        line-height: 150%;
                                        margin-bottom: 6px;
                                      ">
                                        You received this email because you joined
                                        our mailing list or opted in when buying a
                                        ticket.
                                    </p>

                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td height="8" style="line-height: 8px"></td>
                                        </tr>
                                        <tr>
                                            <td align="left">
                                                <p style="
                                              color: #515856;
                                              font-size: 14px;
                                              line-height: 150%;
                                              margin-bottom: 0;
                                            ">
                                                    <a href="{$unsubscribe}" target="_blank" rel="noopener noreferrer"
                                                        style="
                                                color: #515856;
                                                font-weight: normal;
                                                font-style: normal;
                                                text-decoration: underline;
                                              ">Unsubscribe</a
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="sp-40"></td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};

const generateHeroAndContent = (eventContent: EventContent) => {
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff">
    <tr>
        <td>
            <table role="presentation" width="100%" align="center" bgcolor="#ffffff" border="0" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td valign="top" align="center">
                        <table role="presentation" class="container" align="center" border="0" cellpadding="0"
                            cellspacing="0" style="
                                  color: #515856;
                                  width: 100%;
                                  max-width: 640px;
                                ">
                            <tr>
                                <td class="container sp-20"></td>
                            </tr>
                            <tr>
                                <td>
                                    <table role="presentation" class="container max-640" border="0" cellspacing="0"
                                        cellpadding="0">
                                        <tr>
                                            <td class="row px-50" align="center" colspan="3">
                                                <img src="${eventContent.hero_url}" loading="lazy" border="0" alt="hero"
                                                    class="img" width="540" style="display: block" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="col-mobile" width="50" height="0" style="line-height: 0"></td>
                                            <td>
                                                <table role="presentation" class="table-between-col-mobile" width="540"
                                                    border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="sp-30"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="m-text" style="
                                                                color: #515856;
                                                                font-size: 17px;
                                                                line-height: 175%
                                                                text-align: center;
                                                            ">
                                                                ${eventContent.event_description}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="sp-30"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center">
                                                            <table role="presentation" class="ml-btn-container"
                                                                cellpadding="0" cellspacing="0" border="0"
                                                                align="center" width="auto">
                                                                <tr>
                                                                    <td align="center" valign="middle">
                                                                        <!-- Primary button starting (VML for Outlook) -->
                                                                        <!--[if mso]>
                                                        <v:roundrect
                                                          xmlns:v="urn:schemas-microsoft-com:vml"
                                                          xmlns:w="urn:schemas-microsoft-com:office:word"
                                                          href="https://www.outsavvy.com/event/29396/the-gaylidh"
                                                          target="_blank"
                                                          style="
                                                            width: 165px;
                                                            v-text-anchor: middle;
                                                          "
                                                          arcsize="12%"
                                                          stroke="f"
                                                        >
                                                          <v:fill
                                                            color="#fd7e14"
                                                            opacity="100%"
                                                          />
                                                          <w:anchorlock />
                                                          <v:textbox
                                                            inset="25px,14px,25px,14px"
                                                            style="
                                                              mso-fit-shape-to-text: true;
                                                            "
                                                          >
                                                            <center>
                                                              <span
                                                                style="
                                                                  color: #ffffff;
                                                                  font-size: 14px;
                                                                  line-height: 14px;
                                                                  mso-line-height-rule: exactly;
                                                                "
                                                              >
                                                                Get your ticket
                                                              </span>
                                                            </center>
                                                          </v:textbox>
                                                        </v:roundrect>
                                                      <![endif]-->
                                                                        <!-- Desktop button start -->
                                                                        <!--[if !mso]><!-- -->
                                                                        <table role="presentation" class="ml-btn"
                                                                            border="0" cellpadding="0" cellspacing="0"
                                                                            style="
                                                          border-collapse: separate;
                                                          width: auto;
                                                        ">
                                                                            <tr>
                                                                                <th align="center" valign="middle"
                                                                                    style="
                                                              background-color: #fd7e14;
                                                              border-radius: 6px;
                                                              mso-padding-top-alt: 14px;
                                                              mso-padding-bottom-alt: 14px;
                                                              mso-padding-left-alt: 25px;
                                                              mso-padding-right-alt: 25px;
                                                              -webkit-font-smoothing: auto;
                                                              word-break: break-all;
                                                            ">
                                                                                    <a href="${eventContent.ticket_url}"
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        aria-label="Get your ticket on Outsavvy"
                                                                                        style="
                                                                display: block;
                                                                padding: 14px
                                                                  25px;

                                                                color: #ffffff;
                                                                font-size: 14px;
                                                                letter-spacing: 0.025em;
                                                                text-decoration: none;
                                                                border-radius: 6px;
                                                                line-height: 16px;
                                                                mso-line-height-rule: at-least;
                                                                word-wrap: break-word;
                                                                word-break: break-word;
                                                                overflow-wrap: break-word;
                                                                min-width: 70px;
                                                              ">
                                                                                        Get your ticket
                                                                                    </a>
                                                                                </th>
                                                                            </tr>
                                                                        </table>
                                                                        <!--<![endif]-->
                                                                        <!-- Desktop button end -->
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td class="col-mobile" width="50" height="0" style="line-height: 0"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="sp-40"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};

const generateTitle = (eventContent: EventContent, reminder: boolean) => {
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff">
    <tr>
        <td>
            <table role="presentation" class="container" align="center" border="0" cellspacing="0" cellpadding="0"
                style="
                            color: #515856;
                            width: 100%;
                            max-width: 640px;
                            background: #ffffff;
                          ">
                <tr>
                    <td class="row px-50">
                        <h3 class="m-date" style="
                                  color: #000000;
                                  font-size: 18px;
                                  line-height: 125%;
                                  font-weight: bold;
                                  font-style: normal;
                                  text-decoration: none;
                                  margin-bottom: 10px;
                                  text-align: center;
                                ">
                            <em>${
                              reminder
                                ? "Last Chance To Buy Tickets!"
                                : eventContent.location_display
                            }</em>
                        </h3>
                        <h1 class="m-title" style="
                                  color: #000000;
                                  font-size: 36px;
                                  line-height: 125%;
                                  font-weight: bold;
                                  font-style: normal;
                                  text-decoration: none;
                                  margin-bottom: 10px;
                                  text-align: center;
                                ">
                            ${eventContent.event_title}
                        </h1>
                        <p style="
                                  color: #515856;
                                  font-size: 16px;
                                  line-height: 165%;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                  text-align: center;
                                ">
                            <strong>${eventContent.date_display}</strong>
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};

const generateLogo = () => {
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff">
    <tr>
        <td>
            <table role="presentation" class="container max-640" align="center" border="0" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td class="container sp-40"></td>
                </tr>
                <tr>
                    <td>
                        <table role="presentation" align="center" width="100%" border="0" cellspacing="0"
                            cellpadding="0">
                            <tr>
                                <td class="row mobile-center px-50" align="center">
                                    <img src="https://storage.mlcdn.com/account_image/1492047/V60r8nTYJRhuTjdYoPE2hJstXx21II3g2NpL7Bl3.jpg"
                                        border="0" alt="The Sapphic Space UK logo" width="120" style="
                                        max-width: 120px;
                                        display: inline-block;
                                      " />
                                </td>
                            </tr>
                            <tr>
                                <td class="sp-25"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};

const generateStyles = () => {
  return `<style type="text/css">
    html,
    body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    .document {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
    }

    img {
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
    }

    table {
        border-collapse: collapse;
    }

    table,
    td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
    }

    body,
    table,
    td,
    a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p {
        margin: 0;
        word-break: break-word;
    }

    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    div[style*="margin: 16px 0;"] {
        margin: 0 !important;
    }

    /* Spacing utilities (email-safe) */
    .px-50 {
        padding-left: 50px !important;
        padding-right: 50px !important;
    }

    .sp-20 {
        height: 20px;
        line-height: 20px;
        font-size: 0;
    }

    .sp-25 {
        height: 25px;
        line-height: 25px;
        font-size: 0;
    }

    .sp-30 {
        height: 30px;
        line-height: 30px;
        font-size: 0;
    }

    .sp-40 {
        height: 40px;
        line-height: 40px;
        font-size: 0;
    }

    /* Containers */
    .max-640 {
        width: 100% !important;
        max-width: 640px !important;
    }

    /* MOBILE */
    @media all and (max-width: 639px) {
        .wrapper {
            width: 100% !important;
        }

        .container {
            width: 100% !important;
            min-width: 100% !important;
            padding: 0 !important;
        }

        .row {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }

        .col-mobile {
            width: 20px !important;
        }

        .table-between-col-mobile {
            width: 100% !important;
        }

        .col {
            display: block !important;
            width: 100% !important;
        }

        .mobile-center {
            text-align: center !important;
            float: none !important;
        }

        .img {
            width: 100% !important;
            height: auto !important;
        }

        .ml-btn,
        .ml-btn-container {
            width: 100% !important;
            max-width: 100% !important;
        }

        .m-text,
        .m-text p {
            font-size: 20px !important;
            line-height: 180% !important;
        }

        .m-date {
            font-size: 18px !important;
            line-height: 175% !important;
        }

        .m-title {
            font-size: 30px !important;
            line-height: 125% !important;
        }
    }

    @media screen {
        body {
            font-family: "Inter", Arial, Helvetica, sans-serif;
        }
    }
</style>`;
};
