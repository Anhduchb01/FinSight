const mongoose = require("mongoose");
const Post = mongoose.model("Post");



async function getPostSendMailNewsLetter(){
    let postData = await Post.find({
      status:'0' ,
        "languageCrawl": "en"
    },(err, docs) => {
        if (!err) {
            return docs;
        } else {
            return false;
        }
    }).sort({ timeCrawlPage: -1 }).limit(4);
    return postData;
}

function setTextContainerSendMail(){
    array = getPostSendMailNewsLetter();
    var containerText = '';
    for (let i = 0; i < array.length; i++) {
        containerText += `<div class="pc-sm-mw-100pc" style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
            <tbody>
                <tr>
                
                </tr>
                <tr>
                <td height="25" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                <td valign="top" align="center">
                    <img src="${array[i].urlimage}" width="172" height="290" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; display: block; color: #151515; max-width: 100%; height: auto; Margin: 0 auto;">
                </td>
                </tr>
                <tr>
                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; line-height: 34px; letter-spacing: -0.4px; color: #151515;" valign="top" align="center">
                    ${array[i].title}
                </td>
                </tr>
                <tr>
                <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; letter-spacing: -0.2px; color: #9B9B9B;" valign="top" align="center">
                    ${array[i].description}
                </td>
                </tr>
                <tr>
                <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
    
                <tr>
                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                <td valign="top" align="center" style="padding: 5px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate;">
                    <tbody>
                        <tr>
                        <td valign="top" align="center" style="border-radius: 14px; border: 1px solid #CDCED2; padding: 6px 9px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                                <tr>
                                <td valign="middle">
                                    <a class="pc-fb-font" href="http://example.com" style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; display: block; font-size: 14px; font-weight: 500; color: #4B4B4B; line-height: 14px; white-space: nowrap;"><span>Read more</span></a>
                                </td>
                                <td valign="middle" style="padding-left: 3px;">
                                    <img src="images/arrow-right-gray.png" alt="" style="display: block; border: 0; text-decoration: none; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic" height="9" width="6">
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
        </div>`  
    }
    return containerText;
}



var header = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" data-kantu="1">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 300;
        src: local(''),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
      }
      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 400;
        src: local(''),
        url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
        url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
      }
      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 500;
        src: local(''),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
      }
      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        src: local(''),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
      }
      @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 800;
        src: local(''),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
        url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
      }
    }
  </style>
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody,
    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }

    div[style*="margin: 14px 0"],
    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }

    table,
    td {
      mso-table-lspace: 0;
      mso-table-rspace: 0;
    }

    table,
    tr,
    td {
      border-collapse: collapse;
    }

    body,
    td,
    th,
    p,
    div,
    li,
    a,
    span {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      mso-line-height-rule: exactly;
    }

    img {
      border: 0;
      outline: none;
      line-height: 100%;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }

    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-font-smoothing: antialiased;
    }

    .pc-gmail-fix {
      display: none;
      display: none !important;
    }

    @media screen and (min-width: 621px) {
      .pc-email-container {
        width: 620px !important;
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:620px) {
      .pc-sm-p-20 {
        padding: 20px !important
      }
      .pc-sm-p-21-10-14 {
        padding: 21px 10px 14px !important
      }
      .pc-sm-h-20 {
        height: 20px !important
      }
      .pc-sm-mw-100pc {
        max-width: 100% !important
      }
      .pc-sm-p-25-10-15 {
        padding: 25px 10px 15px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-10 {
        padding: 10px !important
      }
      .pc-xs-p-5-0 {
        padding: 5px 0 !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-w-100pc {
        width: 100% !important
      }
      .pc-xs-p-10-0-0 {
        padding: 10px 0 0 !important
      }
      .pc-xs-p-15-0-5 {
        padding: 15px 0 5px !important
      }
    }
  </style>
  <!--[if mso]>
    <style type="text/css">
        .pc-fb-font {
            font-family: Helvetica, Arial, sans-serif !important;
        }
    </style>
    <![endif]-->
  <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
</head>
<body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
    �?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;�?&nbsp;
  </div>
  <table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
    <tbody>
      <tr>
        <td class="pc-email-body-inner" align="center" valign="top">
          <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" src="" color="#f4f4f4"/>
            </v:background>
            <![endif]-->
          <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
          <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
            <tbody>
              <tr>
                <td align="left" valign="top" style="padding: 0 10px;">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top">
                          <!-- BEGIN MODULE: Menu 1 -->
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-20 pc-xs-p-10" bgcolor="#1B1B1B" valign="top" style="padding: 25px 30px; background-color: #1B1B1B">
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td align="center" valign="top" style="padding: 10px;">
                                          <a href="http://example.com" style="text-decoration: none;"><img src="images/logo-white.png" width="130" height="22" alt="" style="height: auto; max-width: 100%; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff; font-size: 14px;"></a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center" valign="top">
                                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                            <tbody>
                                              <tr>
                                                <td valign="middle" style="padding: 10px;">
                                                  <a href="http://example.com" style="text-decoration: none;"><img src="images/facebook-white.png" width="15" height="15" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                                </td>
                                                <td valign="middle" style="padding: 10px;">
                                                  <a href="http://example.com" style="text-decoration: none;"><img src="images/twitter-white.png" width="16" height="14" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                                </td>
                                                <td valign="middle" style="padding: 10px;">
                                                  <a href="http://example.com" style="text-decoration: none;"><img src="images/instagram-white.png" width="16" height="15" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- END MODULE: Menu 1 -->
                          <!-- BEGIN MODULE: Content 2 -->
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-25-10-15 pc-xs-p-15-0-5" valign="top" bgcolor="#ffffff" style="padding: 30px 20px 20px; background-color: #ffffff">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="font-size: 0;" valign="top">`

var footer = `</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- END MODULE: Content 2 -->
<!-- BEGIN MODULE: Footer 1 -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
<tbody>
<tr>
<td class="pc-sm-p-21-10-14 pc-xs-p-5-0" style="padding: 21px 20px 14px 20px; background-color: #1B1B1B" valign="top" bgcolor="#1B1B1B" role="presentation">
<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
<tbody>
<tr>
  <td style="font-size: 0;" valign="top">
    <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="280" valign="top"><![endif]-->
    <div class="pc-sm-mw-100pc" style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
        <tbody>
          <tr>
            <td style="padding: 20px;" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                <tbody>
                  <tr>
                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;" valign="top">
                      Follow Us.
                    </td>
                  </tr>
                  <tr>
                    <td height="11" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;" valign="top">
                      We are always looking for new exciting projects and collaborations. Feel free to contact us.
                    </td>
                  </tr>
                  <tr>
                    <td class="pc-sm-h-20" height="56" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td style="font-family: Arial, sans-serif; font-size: 19px;" valign="top">
                      <a href="http://example.com" style="text-decoration: none;"><img src="images/facebook-dark-gray.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                      <span>&nbsp;&nbsp;</span>
                      <a href="http://example.com" style="text-decoration: none;"><img src="images/twitter-dark-gray.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                      <span>&nbsp;&nbsp;</span>
                      <a href="http://example.com" style="text-decoration: none;"><img src="images/instagram-dark-gray.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                      <span>&nbsp;&nbsp;</span>
                      <a href="http://example.com" style="text-decoration: none;"><img src="images/pinterest-dark-gray.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if (gte mso 9)|(IE)]></td><td width="280" valign="top"><![endif]-->
    <div class="pc-sm-mw-100pc" style="display: inline-block; width: 100%; max-width: 280px; vertical-align: top;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
        <tbody>
          <tr>
            <td style="padding: 20px;" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                <tbody>
                  <tr>
                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px; color: #ffffff;" valign="top">
                      Contact us.
                    </td>
                  </tr>
                  <tr>
                    <td height="11" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: -0.2px; color: #D8D8D8;" valign="top">
                      Ki<span>ng street, 2</span>901 Marm<span>ara road, Newyork, WA 981</span>22-1090
                    </td>
                  </tr>
                  <tr>
                    <td class="pc-sm-h-20" height="45" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 500; line-height: 24px; letter-spacing: -0.2px;" valign="top">
                      <a href="tel:749-977-3440" style="text-decoration: none; color: #ffffff;">749-977-3440</a>
                    </td>
                  </tr>
                  <tr>
                    <td height="9" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; line-height: 24px;" valign="top">
                      <a href="mailto:bo.grady@nathen.biz" style="text-decoration: none; color: #1595E7;">bo.grady@nathen.biz</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
  </td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- END MODULE: Footer 1 -->
</td>
</tr>
</tbody>
</table>
<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
<tbody>
<tr>
<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
<!-- Fix for Gmail on iOS -->
<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
</body>
</html>`

module.exports = {
    container:setTextContainerSendMail,
    header:header,
    footer:footer,
}